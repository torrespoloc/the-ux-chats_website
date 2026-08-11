# AI Provider Setup Guide

A **provider** is where Claude Code sends your requests — and who gets billed for them.

```
You type a prompt
       │
       ▼
  Claude Code
       │
       ├─── Anthropic ──────────► Your Anthropic subscription
       │
       ├─── Google Vertex AI ───► UX Chats GCP project ($300 trial)
       │
       └─── DeepSeek ───────────► Whoever owns that DeepSeek API key
```

Claude Code picks the route based on **environment variables** set in your shell.

---

## The four commands (UX Chats setup)

| Command | Goes to | Pays from |
|---------|---------|-----------|
| `claude` | Anthropic | Your personal subscription |
| `claude-ds` | DeepSeek | Your personal DeepSeek account |
| `claude-google-ux-chats` | Google Vertex AI | UX Chats GCP project |
| `claude-ds-ux-chats` | DeepSeek | UX Chats DeepSeek account |

These are shell functions — not separate apps. They all launch the same Claude Code, just with different settings injected.

---

## How it works under the hood

```
claude-google-ux-chats "write me a function"
         │
         │  sets these before launching:
         │  CLAUDE_CODE_USE_VERTEX=1
         │  ANTHROPIC_VERTEX_PROJECT_ID=the-ux-chats
         │  CLOUD_ML_REGION=us-central1
         │
         ▼
    Claude Code ──────────────────► Google Vertex AI
                                    (billed to GCP project)
```

```
claude-ds "write me a function"
         │
         │  sets these before launching:
         │  ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
         │  ANTHROPIC_AUTH_TOKEN=sk-...
         │
         ▼
    Claude Code ──────────────────► DeepSeek API
                                    (billed to DeepSeek account)
```

The settings only apply to that one session. When you close the terminal, everything resets.

---

## First-time setup

### Step 1 — Get your API keys

| Provider | Where to get it | Env var name |
|----------|----------------|--------------|
| Anthropic | claude.ai → Settings → API | `ANTHROPIC_API_KEY` |
| DeepSeek | platform.deepseek.com → API Keys | `ANTHROPIC_AUTH_TOKEN` |
| Google Vertex | Needs gcloud setup (see below) | No key — uses gcloud login |

### Step 2 — Google Vertex (one-time)

```bash
# Install gcloud
brew install --cask google-cloud-sdk

# Log in with the UX Chats account
gcloud auth login hello@theuxchats.co
gcloud auth application-default login

# Point to the right project
gcloud config set project the-ux-chats
gcloud services enable aiplatform.googleapis.com
gcloud auth application-default set-quota-project the-ux-chats
```

### Step 3 — Add the commands to your shell

Open `~/.zshrc` in any text editor and add:

```bash
# Claude Code — Anthropic (default, no config needed)
# Just use: claude

# Claude Code — DeepSeek (your personal account)
claude-ds() {
  ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic" \
  ANTHROPIC_AUTH_TOKEN="YOUR_DEEPSEEK_KEY_HERE" \
  ANTHROPIC_MODEL="deepseek-v4-pro[1m]" \
  CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1" \
  claude "$@"
}

# Claude Code — Google Vertex AI (UX Chats)
claude-google-ux-chats() {
  CLAUDE_CODE_USE_VERTEX="1" \
  ANTHROPIC_VERTEX_PROJECT_ID="the-ux-chats" \
  CLOUD_ML_REGION="us-central1" \
  claude "$@"
}

# Claude Code — DeepSeek (UX Chats account)
claude-ds-ux-chats() {
  ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic" \
  ANTHROPIC_AUTH_TOKEN="GET_KEY_FROM_TEAM" \
  ANTHROPIC_MODEL="deepseek-v4-pro[1m]" \
  CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1" \
  claude "$@"
}
```

Then reload: `source ~/.zshrc`

---

## Vertex AI model availability (the-ux-chats), checked 2026-08-08

Status of the Model Garden enablement effort, verified by direct API tests.

### Working now (9 models, no extra setup)

| Model | Type | Endpoint |
|-------|------|----------|
| Gemini 3.1 Pro | Text | `global` |
| Gemini 3.6 Flash | Text | `global` |
| Llama 4 (API service) | Text | pay-per-token listing |
| gemini-3.5-flash | Text | `global` only |
| gemini-2.5-flash-lite | Text (cheap) | `global` only |
| gemini-3.1-flash-lite | Text (cheap) | `global` only |
| gemini-3.5-flash-lite | Text (cheap) | `global` only |
| gemini-2.5-flash-tts | Text-to-speech | `global` (replaces ElevenLabs) |
| gemini-3.1-flash-image | Image generation | `global` (replaces Imagen 4) |

The newer Gemini models only serve from the `global` endpoint. Regional
endpoints like `us-central1` return 404 for them.

### Blocked: all Claude models (quota, not enablement)

Claude Fable 5, Opus 4.8, Sonnet 4.6, Sonnet 5, and Opus 4.1 are fully
purchased and enabled. The old 403 "data sharing" error was fixed
permanently on 2026-08-08 via the `setPublisherModelConfig` API
(`dataSharingEnabledProvider: ANTHROPIC`). Do not re-fix this.

What still blocks them: the $300 free-trial billing account gets zero
usable quota for Claude models. Every request returns 429 regardless of
region. The single fix is upgrading the trial to a full paid billing
account (credits carry over). Quota increase requests will likely be
denied until then.

Consequence: `claude-google-ux-chats` cannot run any Claude model until
the billing upgrade. Use `claude-ds-ux-chats` for UX Chats-billed
sessions in the meantime. After the upgrade, also change
`CLOUD_ML_REGION` from `us-central1` to `global` in `~/.zshrc`, since
Claude models on this project serve from `global`/`us-east5`.

### Not available on this project

- **ElevenLabs TTS v2.5**: private offer only, cannot be enabled from
  the console. Substitute: gemini-2.5-flash-tts (tested, works).
- **Imagen 4 and Veo 3**: not in the project's model catalog at all
  (free-trial restriction). This is why the Veo playground shows
  "Failed to submit generate video request". Substitute for images:
  gemini-3.1-flash-image (tested, works). No video model is available
  until the billing upgrade.

---

## Verify it's working

There are two separate tools for checking your setup. They do similar things in different places.

```
  In your terminal                    Inside Claude Code
  ───────────────                     ──────────────────
  which-provider                      "check my providers"
       │                                      │
  Reads env vars                      Runs checks + tests
  Shows active provider               + gives a full report
  Instant, no AI                      + tells you how to fix it
```

---

### Tool 1 — `which-provider` (terminal shell function)

**What it is:** A shell function loaded from `providers.sh`. No AI involved — it just reads your environment variables and prints what's active.

**How to use it:**

```bash
# From the UX Chats repo root — load the switcher
source ./providers.sh

# Check what's currently active
which-provider
```

**Example output:**

```
● Google Vertex AI
  Project: the-ux-chats
  Region:  us-central1
  GCloud:  hello@theuxchats.co
```

**When to use it:** Quick sanity check. Did my `use-vertex` command actually work? Am I on the right provider before I start a session?

---

### Tool 2 — `check-claude-providers` (Claude Code skill)

**What it is:** A skill installed in Claude Code. When you ask Claude to check your providers, it runs a full diagnostic — env vars, gcloud auth, API key presence, and a live end-to-end test.

**How to use it:** Open a Claude Code session and say:

> *"Check my Claude providers"*

**Example output:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CLAUDE CODE — PROVIDER STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Active provider:   Google Vertex AI
Endpoint:          GCP project: the-ux-chats (us-central1)
Auth:              ✓ hello@theuxchats.co — ADC token valid
Live test:         ✓ responded — "I'm Claude, running on Vertex AI"
Billing:           UX Chats GCP project

Issues found:      none
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**What it checks:**

```
Vertex AI                DeepSeek                 Anthropic
────────────────         ────────────────         ────────────────
CLAUDE_CODE_             ANTHROPIC_BASE_          ANTHROPIC_
USE_VERTEX=1?            URL set?                 API_KEY set?
      │                        │                        │
gcloud installed?         Auth token set?          claude -p test
      │                        │
Account correct?          curl key test
      │                   (catches expired keys)
ADC token valid?
      │
claude -p test
```

If something fails, it tells you the exact command to fix it.

**When to use it:** Something feels wrong. You're not sure if you set up correctly. You want a full diagnosis, not just a quick glance.

---

## Who to ask for keys

| Key | Ask |
|-----|-----|
| UX Chats DeepSeek key | Jacki |
| UX Chats GCP access | Jacki (needs gcloud setup above) |
| Your own Anthropic key | Sign up at claude.ai |
| Your own DeepSeek key | Sign up at platform.deepseek.com |
