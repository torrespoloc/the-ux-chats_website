# Findings: Cost Optimization for OpenAI Image Generation

## Cheapest Model: GPT Image 1 Mini

| Quality | Price/Image (1024×1024) |
|---|---|
| Low | **$0.005** (~half a cent) |
| Medium | $0.011 |
| High | $0.036 |

At $0.005/image, 1,000 images = $5. 10,000 images = $50.

## Optimization Strategies

### 1. Quality Tiering
- **Low quality** for drafts, thumbnails, rapid iteration: $0.005/image
- **Medium quality** for general use: $0.011-0.034/image
- **High quality** only for final deliverables: $0.036-0.211/image
- Iterate prompts on Low, only bump to High for the final version

### 2. Model Selection by Use Case
- **GPT Image 1 Mini Low**: social media thumbnails, concept art, bulk generation
- **GPT Image 1.5 Medium**: production graphics, transparent PNGs needed
- **GPT Image 2**: only when you need 4K or SOTA photorealism

### 3. Batch Generation
GPT Image 1.5 supports `n: 1-10` — generate up to 10 variations per API call, saving on per-request overhead.

### 4. Prompt Caching
Reusable style guidelines and config can save 60-80% on input token costs when using the chat completions endpoint with image output.

### 5. Credit-Wasting Mistakes to Avoid
- Using High quality for every image (10x the cost)
- Not checking if GPT Image 1 Mini Low is good enough (often is)
- Forgetting to set quality parameter (defaults may vary by model)
- Generating at max resolution when smaller would suffice
- Not using prompt engineering to get the right image in fewer tries

## Free Alternatives (Comparison)
- **Google Gemini** (Imagen): free tier available, good quality
- **Stability AI** (SDXL): ~$0.002-0.01/image via Replicate
- **Flux.1**: ~$0.003/image via BFL API or fal.ai

## Optimal Workflow for Claude Code
1. Draft prompt → GPT Image 1 Mini Low ($0.005) → review
2. Tweak prompt → GPT Image 1 Mini Low ($0.005) → review
3. Final version → GPT Image 1 Mini Medium ($0.011) or GPT Image 1.5 Medium ($0.034)
4. Total cost for a polished image: ~$0.02-0.05

Sources: simonwillison.net, wavespeed.ai, openrouter.ai, lmmarketcap.com
