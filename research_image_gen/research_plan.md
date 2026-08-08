# Research Plan: Using OpenAI API Key to Create PNG/JPEG Images with Claude Code

## Main Question
What is the best, most cost-effective, and easiest way to use an OpenAI API key to create PNG and JPEG images using Claude Code?

## Subtopics

### 1. OpenAI Image Generation API — Models, Pricing & Formats
What image generation models does OpenAI offer (DALL-E 2, DALL-E 3, GPT-image-1, etc.)? What are the current prices per image at each quality/size tier? What formats (PNG, JPEG) do they natively support? Expected output: model comparison table with pricing.

### 2. Direct API Approach — curl / Python scripts from Claude Code
What's the simplest way to call the OpenAI Images API from Claude Code? Can Claude Code's Bash tool run curl commands or Python scripts that hit the API directly? What are the gotchas (API key handling, base64 response handling, saving binary files)?

### 3. MCP Servers & Wrapper Tools
Are there MCP servers or CLI tools that wrap OpenAI image generation? Does the OpenAI MCP server support image generation? Are there community-built MCP servers specifically for this? What about tools like `openai` CLI?

### 4. Cost Optimization & Workflow Best Practices
What's the cheapest way to generate images via OpenAI API? Can you generate multiple images per call? What quality/size tradeoffs exist? How to avoid wasted API calls (prompt iteration without regenerating)?
