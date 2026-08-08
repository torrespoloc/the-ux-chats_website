# Image Generation — UX Chats Setup

**Date:** 2026-08-07

## Overview

The `ux-chats-image-generator` skill runs a two-round intake (pick path → collect details) then builds a brief and generates via one of three paths:

| Path | Method | Auth | Billing | Best for |
|---|---|---|---|---|
| **2** ★ | Vertex AI (`gemini-image-gen.ts`) | gcloud ADC (`hello@theuxchats.co`) | UX Chats GCP ($300 trial) | **Default for most events** — zero cost, batch-friendly |
| **1** | OpenAI curl | `OPENAI_API_KEY` in `.env.local` | Your OpenAI account | Photorealistic portraits, transparent PNGs |
| **3** | Image generator skills | None (compute only) | None | Code-based typography, sticker aesthetic, geometric precision |

**★ Path 2 (Vertex AI) is the recommended default.** It's free (GCP trial), uses the existing gcloud setup from AI-SETUP.md, and handles every event type well. Reach for Path 1 only when you need photorealistic speaker portraits or transparent PNGs. Use Path 3 when you want precise typographic control without the prompt lottery.

---

## Path 2 — Vertex AI (recommended default)

Runs `ux-chats-app/scripts/gemini-image-gen.ts` — a TypeScript CLI that calls Vertex AI's `generateContent` endpoint. No API key needed; authenticates via `gcloud auth print-access-token`. Bills to the UX Chats GCP project ($300 free trial).

```
Your prompt
     │
     ▼
  gemini-image-gen.ts
     │
     ├── Auth: gcloud auth print-access-token → Bearer token
     ├── Model: gemini-3.1-flash-image-preview
     ├── Endpoint: aiplatform.googleapis.com/v1/projects/the-ux-chats/
     │             locations/global/publishers/google/models/
     │             gemini-3.1-flash-image-preview:generateContent
     └── Billing: the-ux-chats GCP project
```

### Usage

```bash
# From ux-chats-app/
npm run gen-image -- -p "Event poster description" -a "1:1" -s "1K"

# Full CLI
npx tsx scripts/gemini-image-gen.ts \
  -p "Prompt" \
  -a "16:9" \    # 1:1, 3:4, 4:3, 9:16, 16:9, 21:9
  -s "2K" \      # 1K, 2K, 4K
  -o ./my-dir    # output directory (default: ./outputs/)
```

### Prerequisites

```bash
gcloud auth login hello@theuxchats.co
gcloud auth application-default login
gcloud config set project the-ux-chats
```

### Model note

Uses `gemini-3.1-flash-image-preview` instead of the GA model because of a [confirmed Vertex AI bug](https://github.com/googleapis/js-genai/issues/1682) — the GA model ignores the `imageSize` parameter and always returns ~1K. The preview model respects all three sizes.

### Cost

**$0** during the $300 GCP free trial. Post-trial, see [Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing).

---

## Path 1 — OpenAI via curl

Direct REST call to the OpenAI image API. Use when you need photorealistic speaker portraits or transparent PNGs. The API key lives in `.env.local`.

```bash
OPENAI_KEY=$(grep OPENAI_API_KEY .env.local | cut -d= -f2-)
curl -s -X POST "https://api.openai.com/v1/images/generations" \
  -H "Authorization: Bearer $OPENAI_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-1-mini","prompt":"...","n":1,"size":"1024x1024","response_format":"b64_json"}' \
  | python3 -c "
import sys, json, base64
r = json.load(sys.stdin)
if 'error' in r:
    print('ERROR:', r['error']['message']); sys.exit(1)
open('ux-chats-app/public/library/FILENAME.png','wb').write(base64.b64decode(r['data'][0]['b64_json']))
print('Saved.')
"
```

### Cost strategy (~20 images/month)

| Step | Model | Quality | Cost/ea |
|---|---|---|---|
| Draft | `gpt-image-1-mini` | `low` | $0.005 |
| Iterate | `gpt-image-1-mini` | `low` | $0.005 |
| Final | `gpt-image-1-mini` | `medium` | $0.011 |
| Final (transparent) | `gpt-image-1.5` | `medium` | $0.034 |

**~$0.02 per polished image. ~$0.40/month at 20 images.**

### Available models

DALL-E 2 and DALL-E 3 were retired May 12, 2026.

| Model | Best for | Cheapest 1024×1024 | Transparent |
|---|---|---|---|
| **GPT Image 1 Mini** | Drafts, bulk, budget | $0.005 (Low) | No |
| **GPT Image 1.5** | Production, transparency | $0.009 (Low) | Yes |
| **GPT Image 2** | SOTA quality, 4K, text | $0.006 (Low) | No |

---

## Path 3 — Image generator skills

Code-based design generation — no API calls, no billing, compute only. Three skill levels are available:

| Skill | Method | Best for |
|---|---|---|
| `level-1-image-generator` | Canvas gradients, geometric shapes, real typography | Poster layouts, quote cards, Swiss/Bauhaus aesthetic |
| `level-2-image-generator` | Three.js 3D scene → headless render | 3D compositions, lighting-rich scenes, product shots |
| `level-3-image-generator` | Advanced generation | Complex multi-element compositions |

These skills nail the UX Chats typography and sticker aesthetic with precise control — no prompt lottery. Best for Community Nights, Game Nights, and any type-heavy geometric layout.

Invoke via the `Skill` tool with the brief's Generation Prompt and canvas size passed as the aspect ratio.

---

## Path selection guide

| What you're making | Recommended path | Why |
|---|---|---|
| Any event type (default) | **Path 2** (Vertex AI) | Free, already set up, handles every format well |
| Multiple platform variants (batch) | **Path 2** (Vertex AI) | Zero cost, preset aspect ratios, batch-friendly |
| Special Guest Night — headshot + portrait | Path 1 (OpenAI) | Best photorealistic portrait compositing |
| Community Night, Game Night, Challenge | Path 3 (skill) | Code-based skills nail typography and sticker aesthetic |
| Abstract, geometric, type-heavy | Path 3 (skill) | Precise graphic control, no prompt lottery |

---

## Cost optimization rules

1. **Default to Path 2 (Vertex AI).** It's free during the GCP trial and handles most events perfectly.
2. **Default to 1K resolution.** Social platforms compress images anyway. Only go 2K+ for Luma hero or LinkedIn banner.
3. **Iterate on Low, finalize on Medium** (Path 1).
4. **Use Path 3 (skills) for type-heavy designs** — free, and more precise than prompting.
5. **Save all outputs** (even rejects) to build intuition.

## Credit-wasting mistakes

- Generating at 4K when the platform caps at 1080px
- Using Path 1 (OpenAI) when Path 2 (Vertex) would produce the same result for free
- Using GPT Image 2 when Mini would suffice
- Forgetting `quality: "low"` for drafts
- Re-generating from scratch instead of editing an existing image
- Using High quality for every generation

---

## Key files

| File | Purpose |
|---|---|
| `ux-chats-app/scripts/gemini-image-gen.ts` | Path 2 CLI — Vertex AI image generation |
| `ux-chats-app/public/library/` | Output directory — all generated event graphics |
| `.env.local` | `OPENAI_API_KEY`, `DEEPSEEK_API_KEY` (gitignored) |
| `ux-chats-app/imagery-system/DESIGN.md` | Poster components, composition rules, canvas specs |
| `ux-chats-app/imagery-system/PRODUCT.md` | Event types, capabilities, constraints |
| `./DESIGN.md` | Base brand tokens (colors, type, shadows, voice) |

Sources:
- [Vertex AI Gemini image generation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-generation)
- [js-genai issue #1682 — GA model ignores imageSize](https://github.com/googleapis/js-genai/issues/1682)
- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [costgoat.com — GPT Image pricing](https://costgoat.com/pricing/openai-images)
