# Findings: Direct API Approach from Claude Code

## Endpoint
`POST https://api.openai.com/v1/images/generations`

## GPT Models Return Base64 by Default

Unlike DALL-E which returned a URL or required `"response_format": "b64_json"`, GPT image models return `b64_json` automatically.

## Working curl Command (macOS)

```bash
curl https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1-mini",
    "prompt": "A futuristic city skyline at night",
    "size": "1024x1024",
    "quality": "low"
  }' | jq -r '.data[0].b64_json' | base64 -D > output.png
```

## One-liner Saving as JPEG

```bash
curl ... | jq -r '.data[0].b64_json' | base64 -D > output.png
# Then convert via sips (built-in macOS):
sips -s format jpeg output.png --out output.jpg
```

## Python Script Approach (Recommended for Reliability)

```python
import os, base64, json, requests
from pathlib import Path

api_key = os.environ["OPENAI_API_KEY"]
response = requests.post(
    "https://api.openai.com/v1/images/generations",
    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    json={"model": "gpt-image-1-mini", "prompt": "...", "size": "1024x1024", "quality": "low"}
)
b64 = response.json()["data"][0]["b64_json"]
Path("output.png").write_bytes(base64.b64decode(b64))
```

## Key Gotchas
- GPT models return `b64_json` (not `url`) by default
- macOS uses `base64 -D` (not `base64 --decode` like Linux)
- Pipe through Python for cross-platform reliability
- API key from `.env.local`: `export $(grep OPENAI_API_KEY .env.local | xargs)`
- Max prompt length: ~4000 characters
- Response is small (~1-2 MB base64) — no timeout issues

Sources: QuantumNous/new-api-docs, StackOverflow, aifreeapi.com
