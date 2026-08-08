#!/usr/bin/env bash
# UX Chats — AI provider switcher
# ─────────────────────────────────────────────────────────────────
# Source this file to get switcher commands in your shell:
#   source ./providers.sh
#
# Or add this line to your ~/.zshrc to auto-load for every session:
#   [ -f "$HOME/path/to/ux-chats/providers.sh" ] && source "$_"
#
# Commands: use-vertex | use-deepseek | use-anthropic | which-provider
# ─────────────────────────────────────────────────────────────────

# ── use-vertex ───────────────────────────────────────────────────
# Routes Claude Code through GCP Vertex AI on the UX Chats project.
# Requires: gcloud auth application-default login (as hello@theuxchats.co)
use-vertex() {
  export CLAUDE_CODE_USE_VERTEX=1
  export ANTHROPIC_VERTEX_PROJECT_ID="the-ux-chats"
  export CLOUD_ML_REGION="us-central1"
  unset ANTHROPIC_BASE_URL
  unset ANTHROPIC_MODEL
  unset ANTHROPIC_DEFAULT_OPUS_MODEL
  unset ANTHROPIC_DEFAULT_SONNET_MODEL
  unset ANTHROPIC_DEFAULT_HAIKU_MODEL
  unset CLAUDE_CODE_EFFORT_LEVEL
  unset CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC

  _uxchats_check_vertex_auth
  echo "✓ Provider → Google Vertex AI"
  echo "  Project: the-ux-chats | Region: us-central1"
  echo "  Billing: GCP project the-ux-chats"
}

# ── use-deepseek ─────────────────────────────────────────────────
# Routes Claude Code through DeepSeek's Anthropic-compatible endpoint.
# Uses your personal ANTHROPIC_AUTH_TOKEN from ~/.zshrc (claude-ds setup).
# Model mapping mirrors the claude-ds function:
#   Opus/Sonnet → deepseek-v4-pro (1M context)
#   Haiku       → deepseek-v4-flash
use-deepseek() {
  unset CLAUDE_CODE_USE_VERTEX
  unset ANTHROPIC_VERTEX_PROJECT_ID

  # Key is the UX Chats DeepSeek account — lives in .env.local as DEEPSEEK_API_KEY
  local key="${DEEPSEEK_API_KEY}"
  if [ -z "$key" ] && [ -f ".env.local" ]; then
    key=$(grep '^DEEPSEEK_API_KEY=' .env.local | cut -d= -f2-)
  fi
  if [ -z "$key" ]; then
    echo "✗ DEEPSEEK_API_KEY not found — add it to .env.local (get it from the team)"
    return 1
  fi
  export ANTHROPIC_AUTH_TOKEN="$key"

  export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
  export ANTHROPIC_MODEL="deepseek-v4-pro[1m]"
  export ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro[1m]"
  export ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-v4-pro[1m]"
  export ANTHROPIC_DEFAULT_HAIKU_MODEL="deepseek-v4-flash"
  export CLAUDE_CODE_EFFORT_LEVEL="medium"
  export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1

  echo "✓ Provider → DeepSeek (personal account)"
  echo "  Endpoint: https://api.deepseek.com/anthropic"
  echo "  Opus/Sonnet → deepseek-v4-pro[1m] | Haiku → deepseek-v4-flash"
  echo "  Telemetry: disabled"
}

# ── use-anthropic ────────────────────────────────────────────────
# Routes Claude Code directly through Anthropic's API.
# Requires: ANTHROPIC_API_KEY in your environment.
# Note: this explicitly unsets CLAUDE_CODE_USE_VERTEX so Vertex doesn't intercept.
use-anthropic() {
  unset CLAUDE_CODE_USE_VERTEX
  unset ANTHROPIC_VERTEX_PROJECT_ID
  unset ANTHROPIC_BASE_URL
  unset ANTHROPIC_MODEL
  unset ANTHROPIC_DEFAULT_OPUS_MODEL
  unset ANTHROPIC_DEFAULT_SONNET_MODEL
  unset ANTHROPIC_DEFAULT_HAIKU_MODEL
  unset CLAUDE_CODE_EFFORT_LEVEL
  unset CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC

  if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "⚠ ANTHROPIC_API_KEY is not set — set it before launching claude"
  fi

  echo "✓ Provider → Anthropic (direct API)"
  echo "  Billing: your personal Anthropic account"
}

# ── which-provider ───────────────────────────────────────────────
# Shows the currently active provider and auth state.
which-provider() {
  echo ""
  if [ "${CLAUDE_CODE_USE_VERTEX}" = "1" ]; then
    local account
    account=$(gcloud config get-value account 2>/dev/null)
    local project
    project=$(gcloud config get-value project 2>/dev/null)
    echo "● Google Vertex AI"
    echo "  Project: ${ANTHROPIC_VERTEX_PROJECT_ID:-the-ux-chats}"
    echo "  Region:  ${CLOUD_ML_REGION:-us-central1}"
    echo "  GCloud:  ${account:-⚠ not authenticated}"
    if [ "$account" != "hello@theuxchats.co" ] && [ -n "$account" ]; then
      echo "  ⚠ Expected hello@theuxchats.co — billing goes to wrong account"
    fi
  elif [ -n "${ANTHROPIC_BASE_URL}" ]; then
    echo "● DeepSeek"
    echo "  Endpoint: ${ANTHROPIC_BASE_URL}"
    echo "  Telemetry: ${CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC:-off}"
  else
    echo "● Anthropic (direct)"
    local has_key="${ANTHROPIC_API_KEY:+set}"
    echo "  API key: ${has_key:-⚠ not set}"
  fi
  echo ""
}

# ── _uxchats_check_vertex_auth (internal) ────────────────────────
_uxchats_check_vertex_auth() {
  if ! command -v gcloud &>/dev/null; then
    echo "⚠ gcloud not installed — run: brew install --cask google-cloud-sdk"
    return
  fi
  local account
  account=$(gcloud config get-value account 2>/dev/null)
  if [ -z "$account" ] || [ "$account" = "(unset)" ]; then
    echo "⚠ Not authenticated with gcloud."
    echo "  Run: gcloud auth login hello@theuxchats.co"
    echo "  Then: gcloud auth application-default login"
  elif [ "$account" != "hello@theuxchats.co" ]; then
    echo "⚠ Authenticated as: $account"
    echo "  For UX Chats billing, switch to: hello@theuxchats.co"
    echo "  Run: gcloud config set account hello@theuxchats.co"
  fi
}

echo "UX Chats providers ready → use-vertex | use-deepseek | use-anthropic | which-provider"
