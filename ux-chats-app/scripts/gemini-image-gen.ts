import { execSync } from "child_process";
import { resolve } from "path";
import { writeFileSync, mkdirSync, existsSync } from "fs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ImageSize = "1K" | "2K" | "4K";
type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9" | "21:9";

interface GenerateOptions {
  prompt: string;
  aspectRatio?: AspectRatio;
  size?: ImageSize;
  outputDir?: string;
  projectId?: string;
  location?: string;
}

interface VertexPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string; // base64
  };
}

interface VertexCandidate {
  content?: {
    role: string;
    parts?: VertexPart[];
  };
  finishReason?: string;
  safetyRatings?: unknown[];
}

interface VertexGenerateContentResponse {
  candidates?: VertexCandidate[];
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PROJECT_ID = process.env.ANTHROPIC_VERTEX_PROJECT_ID ?? "the-ux-chats";
const MODEL = "gemini-3.1-flash-image-preview";

// Using the preview model because the GA model (gemini-3.1-flash-image) has a
// known server-side bug where imageConfig.imageSize is ignored — it always
// returns ~1K regardless of what you ask for.
//   https://github.com/googleapis/js-genai/issues/1682

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getAccessToken(): string {
  try {
    const token = execSync(
      "gcloud auth print-access-token",
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
    ).trim();
    if (!token) throw new Error("empty token");
    return token;
  } catch {
    throw new Error(
      "Could not get gcloud access token. Make sure you are logged in:\n" +
        "  gcloud auth login hello@theuxchats.co\n" +
        "  gcloud auth application-default login",
    );
  }
}

function extensionFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  };
  return map[mime] ?? "png";
}

// ---------------------------------------------------------------------------
// Core function — also exported for programmatic use
// ---------------------------------------------------------------------------

export async function generateImage(options: GenerateOptions): Promise<string> {
  const {
    prompt,
    aspectRatio = "1:1",
    size = "1K",
    outputDir = resolve(process.cwd(), "outputs"),
    projectId = PROJECT_ID,
    location = "global",
  } = options;

  const accessToken = getAccessToken();

  const endpoint =
    `https://aiplatform.googleapis.com/v1/projects/${projectId}` +
    `/locations/${location}/publishers/google/models/${MODEL}` +
    `:generateContent`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio,
        imageSize: size,
      },
    },
  };

  console.log(`\n  Generating image with Vertex AI...`);
  console.log(`    Model:         ${MODEL}`);
  console.log(`    Project:       ${projectId}`);
  console.log(`    Location:      ${location}`);
  console.log(`    Prompt:        "${prompt}"`);
  console.log(`    Aspect ratio:   ${aspectRatio}`);
  console.log(`    Size:           ${size}\n`);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 429) {
      throw new Error(
        `Rate limited (HTTP 429). Wait and retry.\n${errorText}`,
      );
    }
    if (response.status === 400) {
      throw new Error(
        `Bad request (HTTP 400). Check your prompt and parameters.\n${errorText}`,
      );
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        `Authentication failed (HTTP ${response.status}). Make sure you are logged in:\n` +
          `  gcloud auth login hello@theuxchats.co\n` +
          `  gcloud auth application-default login\n${errorText}`,
      );
    }
    throw new Error(
      `API request failed (HTTP ${response.status}): ${errorText}`,
    );
  }

  const data = (await response.json()) as VertexGenerateContentResponse;

  if (data.error) {
    throw new Error(
      `Vertex AI error [${data.error.status}]: ${data.error.message}`,
    );
  }

  // Extract the image from the response
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error(
      "No content in response. The model may have declined the prompt " +
        `(finish reason: ${data.candidates?.[0]?.finishReason ?? "unknown"}).`,
    );
  }

  const imagePart = parts.find((p) => p.inlineData);
  if (!imagePart?.inlineData) {
    const textPart = parts.find((p) => p.text);
    throw new Error(
      "No image data in response. The model returned text instead:\n" +
        `  "${textPart?.text?.slice(0, 200) ?? "(empty)"}"`,
    );
  }

  const { mimeType, data: base64 } = imagePart.inlineData;
  const buffer = Buffer.from(base64, "base64");
  const ext = extensionFromMime(mimeType);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const safePrompt = prompt
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .toLowerCase();
  const filename = `${safePrompt}-${timestamp}.${ext}`;
  const filePath = resolve(outputDir, filename);

  writeFileSync(filePath, buffer);
  console.log(`  Saved: ${filePath}\n`);

  return filePath;
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
  Usage: npx tsx scripts/gemini-image-gen.ts --prompt "<prompt>" [options]

  Authenticates via gcloud ADC (no API key needed).
  Billed to the UX Chats GCP project (Vertex AI $300 trial).

  Options:
    --prompt, -p       Text description of the image to generate (required)
    --aspect-ratio, -a Output aspect ratio (default: "1:1")
                       One of: 1:1, 3:4, 4:3, 9:16, 16:9, 21:9
    --size, -s         Output resolution (default: "1K")
                       One of: 1K, 2K, 4K
    --project-id       GCP project ID (default: "${PROJECT_ID}")
    --location         Vertex AI location (default: "global")
    --output-dir, -o   Directory to save the image (default: ./outputs/)
    --help, -h         Show this help

  Examples:
    npx tsx scripts/gemini-image-gen.ts -p "A cat wearing a spacesuit"
    npx tsx scripts/gemini-image-gen.ts -p "A serene landscape" -a "16:9" -s "2K"
`);
    process.exit(0);
  }

  const getArg = (flags: string[]): string | undefined => {
    for (const flag of flags) {
      const idx = args.indexOf(flag);
      if (idx !== -1 && idx + 1 < args.length) {
        return args[idx + 1];
      }
    }
    return undefined;
  };

  const prompt = getArg(["--prompt", "-p"]);
  if (!prompt) {
    console.error("Error: --prompt (or -p) is required. Use --help for usage.");
    process.exit(1);
  }

  const aspectRatio = (getArg(["--aspect-ratio", "-a"]) ?? "1:1") as AspectRatio;
  const size = (getArg(["--size", "-s"]) ?? "1K") as ImageSize;
  const projectId = getArg(["--project-id"]);
  const location = getArg(["--location"]);
  const outputDir = getArg(["--output-dir", "-o"]);

  const validRatios: AspectRatio[] = ["1:1", "3:4", "4:3", "9:16", "16:9", "21:9"];
  const validSizes: ImageSize[] = ["1K", "2K", "4K"];

  if (!validRatios.includes(aspectRatio)) {
    console.error(`Error: Invalid aspect ratio "${aspectRatio}". Must be one of: ${validRatios.join(", ")}`);
    process.exit(1);
  }
  if (!validSizes.includes(size)) {
    console.error(`Error: Invalid size "${size}". Must be one of: ${validSizes.join(", ")}`);
    process.exit(1);
  }

  try {
    await generateImage({
      prompt,
      aspectRatio,
      size,
      ...(projectId ? { projectId } : {}),
      ...(location ? { location } : {}),
      ...(outputDir ? { outputDir } : {}),
    });
  } catch (err) {
    console.error(`\n  Error: ${(err as Error).message}\n`);
    process.exit(1);
  }
}

main();
