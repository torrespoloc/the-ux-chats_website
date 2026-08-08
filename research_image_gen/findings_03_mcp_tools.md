# Findings: MCP Servers & Wrapper Tools for OpenAI Image Generation

## Recommended MCP Servers

### 1. guinacio/claude-image-gen (Top Pick)
- Dual-provider: Google Gemini + OpenAI (gpt-image-2)
- Claude Code plugin: `/plugin install guinacio/claude-image-gen`
- Auto-routes models: `gpt-image*` or `dall-e*` → OpenAI, everything else → Gemini
- MCP 2026-07-28 spec with backward compatibility
- CLI script mode available (no MCP overhead)

### 2. openai-image-mcp-server (npm)
- Pure OpenAI: gpt-image family only
- Tools: generate, edit, create variation, pose generation, sprite sheets
- Config:
  ```json
  { "mcpServers": { "openai-image": { "command": "npx", "args": ["-y", "openai-image-mcp-server@latest"], "env": { "OPENAI_API_KEY": "sk-..." } } } }
  ```

### 3. @lpenguin/openai-image-mcp (npm)
- Supports gpt-image-1, gpt-image-1-mini, DALL-E 3, DALL-E 2
- Custom output formats, transparency support, moderation levels
- Run: `npx @lpenguin/openai-image-mcp`

### 4. pvliesdonk/image-generation-mcp (pip)
- Multi-provider: OpenAI, Gemini, SD WebUI
- Python-based, keyword auto-selection, Docker support
- Install: `pip install image-generation-mcp`

## Comparison: MCP vs Direct API

| Approach | Setup | Flexibility | Cost |
|---|---|---|---|
| MCP server | Install + configure once | Limited to server's tool surface | Free (just API costs) |
| Direct curl | None | Full API control | Free (just API costs) |
| Python script | None (Claude writes it) | Full API control | Free (just API costs) |
| Claude Code plugin | `/plugin install` | Depends on plugin | Free |

**Recommendation**: For one-off images, direct curl/Python is simplest. For frequent use, install an MCP server or write a reusable shell script.

Sources: GitHub (guinacio/claude-image-gen, LimSuyun/openai-image-mcp-server), npm, mcpworld.com
