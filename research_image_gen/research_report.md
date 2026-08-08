# Research Report: Using OpenAI API to Create PNG/JPEG Images with Claude Code

**Date:** 2026-08-06

---

## TL;DR

The easiest approach: a **curl one-liner** that Claude Code runs via Bash. Uses your existing `OPENAI_API_KEY` from `.env.local`, costs as little as **$0.005/image** with GPT Image 1 Mini Low, and saves directly to a file.

```bash
export $(grep OPENAI_API_KEY .env.local | xargs) && \
curl -s https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{"model":"gpt-image-1-mini","prompt":"YOUR PROMPT","size":"1024x1024","quality":"low"}' \
  | jq -r '.data[0].b64_json' | base64 -D > output.png
```

For an even smoother experience, install the `guinacio/claude-image-gen` Claude Code plugin (`/plugin install guinacio/claude-image-gen`), which gives you a dedicated image generation tool inside Claude Code without dealing with API calls directly.

---

## 1. The API Landscape (Current as of August 2026)

**Big news:** DALL-E 2 and DALL-E 3 were **retired from the API on May 12, 2026**. They've been replaced by the GPT Image model family. GPT Image 1 is also scheduled for deprecation (Oct 23, 2026).

### Active Models

| Model | Best For | Cheapest 1024×1024 | Transparent PNG |
|---|---|---|---|
| **GPT Image 2** | SOTA quality, 4K, multilingual text | $0.006 (Low) | No |
| **GPT Image 1.5** | Production work, transparency | $0.009 (Low) | Yes |
| **GPT Image 1 Mini** | Drafts, bulk, budget | **$0.005 (Low)** | No |

All models output **PNG, JPEG, and WebP**. GPT Image models return `b64_json` by default (no temporary URL to download).

### Pricing Comparison (1024×1024)

| Quality | GPT Image 1 Mini | GPT Image 1.5 | GPT Image 2 |
|---|---|---|---|
| Low | **$0.005** | $0.009 | $0.006 |
| Medium | $0.011 | $0.034 | $0.053 |
| High | $0.036 | $0.133 | $0.211 |

---

## 2. Three Approaches, Ranked

### Approach A: Curl One-Liner (Simplest — Zero Setup)

**Pros:** Nothing to install, works immediately, full API control, Claude Code already has permission for `Bash(curl *)`.

**Cons:** Manual, Claude has to construct the command each time.

```bash
# Load key, generate, decode base64, save as PNG — all in one pipeline
export $(grep OPENAI_API_KEY .env.local | xargs) && \
curl -s https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d "{\"model\":\"gpt-image-1-mini\",\"prompt\":\"$(cat prompt.txt)\",\"size\":\"1024x1024\",\"quality\":\"low\"}" \
  | jq -r '.data[0].b64_json' | base64 -D > output.png
```

**Key detail for macOS:** `base64 -D` (not `base64 --decode` like Linux).

### Approach B: Claude Code Plugin (Smoothest UX)

Install one of these:

1. **`guinacio/claude-image-gen`** — Dual Gemini + OpenAI. Install via `/plugin install guinacio/claude-image-gen`. Auto-routes to OpenAI for `gpt-image*` model names.

2. **`openai-image-mcp-server`** (npm) — Pure OpenAI, gpt-image family only. Configure via:
   ```bash
   claude mcp add openai-image -e OPENAI_API_KEY=sk-... -- npx -y openai-image-mcp-server@latest
   ```

**Pros:** Dedicated tool in Claude Code, no manual curl construction, handles API key automatically, supports editing and variations.

**Cons:** Depends on the plugin being maintained, less flexibility than direct API.

### Approach C: Python Script (Most Flexible)

A 20-line stdlib-only Python script. Good when you need more logic (e.g., batch generation, prompt iteration, error handling) but don't want to install dependencies.

```python
import os, sys, json, base64, urllib.request

# Read key from .env.local
key = os.environ.get("OPENAI_API_KEY")
if not key:
    with open(".env.local") as f:
        for line in f:
            if line.startswith("OPENAI_API_KEY="):
                key = line.strip().split("=", 1)[1]; break

payload = json.dumps({
    "model": "gpt-image-1-mini", "prompt": sys.argv[1],
    "size": "1024x1024", "quality": "low"
}).encode()

req = urllib.request.Request(
    "https://api.openai.com/v1/images/generations",
    data=payload,
    headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"}
)
with urllib.request.urlopen(req) as resp:
    b64 = json.loads(resp.read())["data"][0]["b64_json"]

with open(sys.argv[2] if len(sys.argv) > 2 else "output.png", "wb") as f:
    f.write(base64.b64decode(b64))
```

---

## 3. Cost-Optimized Workflow

For one polished image (e.g., an event poster):

| Step | Model | Quality | Cost |
|---|---|---|---|
| Draft prompt expansion | GPT-4o-mini (text) | — | <$0.001 |
| Rough generation #1 | GPT Image 1 Mini | Low | $0.005 |
| Tweak + regenerate | GPT Image 1 Mini | Low | $0.005 |
| Final version | GPT Image 1 Mini | Medium | $0.011 |
| **Total** | | | **~$0.02** |

**Key optimization rules:**
- Iterate on Low quality ($0.005), finalize on Medium ($0.011)
- GPT Image 1 Mini Low is surprisingly good for the UX Chats sticker-zine style (flat illustration, not photorealism)
- Only use GPT Image 2 or High quality if you specifically need 4K or photorealistic output
- Lock the `seed` parameter once you find a composition you like
- Save all outputs (even rejects) with their prompts so you build intuition

---

## 4. JPEG vs PNG

GPT Image models output PNG by default (via `b64_json`). To get JPEG:

```bash
# Generate PNG first, then convert with macOS built-in sips
sips -s format jpeg output.png --out output.jpg
```

Or request WebP if you want smaller files for web without quality loss. All three formats are supported natively.

---

## 5. Gotchas

1. **GPT Image models return base64, not URLs.** The `data[0].url` field doesn't exist. Always decode `data[0].b64_json`. This differs from old DALL-E 3 docs you might find online.

2. **macOS base64 flag is `-D`**, not `--decode`. Cross-platform scripts should use Python for base64 decoding.

3. **Never inline the API key.** Always load from `.env.local` via `export $(grep ... | xargs)`.

4. **Content filter blocks cost you money.** If OpenAI's safety filter rejects the image after generation, you still pay for it. Avoid prompts with celebrity names, photorealistic violence, or brand logos.

5. **GPT Image 1.5 supports transparent backgrounds** (`"background": "transparent"`). GPT Image 2 does not (yet). If you need cut-out stickers or overlays, use 1.5.

---

## 6. Recommendation for UX Chats

For your use case (event posters, social graphics in the sticker-zine style):

- **Use the curl one-liner** for one-off images — it's already permissioned and costs zero setup
- **Consider `/plugin install guinacio/claude-image-gen`** if you find yourself generating images frequently
- **Default to GPT Image 1 Mini Low ($0.005)** for drafts and Medium ($0.011) for finals — the sticker-zine style is flat/illustrative, not photorealistic, so you don't need GPT Image 2
- **Use GPT Image 1.5** only when you need transparent PNGs for sticker overlays
- At ~2 posters/month, your total cost will be under $0.50/month

Sources:
- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [costgoat.com - GPT Image pricing calculator](https://costgoat.com/pricing/openai-images)
- [fal.ai - GPT Image 2 vs 1.5 comparison](https://fal.ai/learn/tools/gpt-image-2-vs-gpt-image-1-5)
- [tokencalculator.com - Image model comparison](https://tokencalculator.com/image-models)
- [GitHub: guinacio/claude-image-gen](https://github.com/guinacio/claude-image-gen)
- [npm: openai-image-mcp-server](https://www.npmjs.com/package/openai-image-mcp-server)
- [OpenAI Image Generation Guide](https://platform.openai.com/docs/guides/images)
