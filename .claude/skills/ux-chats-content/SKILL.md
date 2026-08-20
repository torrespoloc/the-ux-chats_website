---
name: ux-chats-content
description: >
  Use for any written content for The UX Chats community brand — newsletters, event announcements, LinkedIn posts, guest spotlights, calls to action, follow-up reminders, and short product/update blurbs. Not for Jacki's personal-brand content (use `content-gen` for that). Triggers on "UX Chats newsletter," "event announcement," "guest spotlight," "reminder for the event," "write a blurb," "draft copy for," or any request to write community-facing marketing copy for The UX Chats.
---

# UX Chats Content

A structured writing system for The UX Chats marketing pipeline. Produces copy that sounds like a specific community, not a generic AI-generated announcement — meant to pair with AI-generated visuals and ship with light editing.

This skill is the counterpart to `content-gen` (Jacki's personal-brand voice). If the request is about Jacki's personal LinkedIn/build-story voice, defer to `content-gen` instead.

---

## Purpose

Produce natural, human, on-brand writing for The UX Chats across every channel the community pipeline touches: event promotions, newsletters, LinkedIn posts, guest announcements, reminder copy, and short marketing blurbs — reliably enough that another agent or a teammate can generate it without re-deriving the voice each time.

---

## Phase 0: Run the Brief

Before drafting, establish:

1. **Format?** Newsletter intro / event announcement / LinkedIn post / guest spotlight / call to action / follow-up reminder / short blurb. If unclear, ask or infer from context and confirm back.
2. **What's the point?** The specific event, guest, milestone, or update this is about — get the real details (names, dates, links), never invent them.
3. **Where's this landing?** Email, LinkedIn, Discord, Luma page — affects link placement and length (see `references/templates.md` quick-reference table).
4. **Any specific detail to anchor the hook?** A funny moment, a real quote, a specific number. This skill's whole voice depends on specificity — if none is supplied, ask for one rather than inventing a generic one.

If the user gave enough in their prompt, extract and confirm rather than re-asking everything.

---

## Phase 1: Load Voice + Format

1. Read `references/voice-and-tone.md` — brand voice, writing rules, banned phrases, canonical links. This governs every format equally.
2. Read `references/templates.md` — find the structure for the requested format.
3. Read `references/examples.md` — find the strong/weak pair for the requested format, and calibrate to the strong one before writing.

---

## Phase 2: Draft

Write the draft following the format's structure from `templates.md`, in the voice from `voice-and-tone.md`. Then self-check against the banned-phrase list and the format's length target before presenting.

### When presenting a draft, show:
1. **The hook choice** — one sentence on why this specific detail earns the open.
2. **The full copy** — exactly as it should ship.
3. **One revision angle** — a shorter cut, or a different hook, if there's an obvious alternate.

---

## Reusable Prompt Instructions (for other agents / pipeline use)

If you are an agent or workflow generating UX Chats content programmatically, follow this contract:

**Required inputs before generating anything:**
- `format` — one of: newsletter_intro, event_announcement, linkedin_post, guest_spotlight, cta, reminder, short_blurb
- `real_details` — actual event name, date, time, timezone, link, and/or guest name. Never invent these.
- `anchor_detail` — one specific, true, ideally funny or human detail to build the hook from. If not supplied, ask for one before generating; do not substitute a generic hook.
- `channel` — where this ships (affects length + link placement, see `templates.md` quick-reference).

**How to match tone:**
- Load `voice-and-tone.md` in full before generating. Do not paraphrase the rules from memory — banned phrases and voice mechanics are specific and easy to drift from.
- Run the draft against the banned-phrase list in `voice-and-tone.md` before returning it. If any appear, rewrite.
- Compare the draft's opening line against the weak examples in `examples.md`. If it resembles the weak pattern (generic enthusiasm, resume-speak, throat-clearing), rewrite the hook.

**How to adapt by channel:**
- Use the format's entry in the `templates.md` quick-reference table for length and link placement.
- LinkedIn: links in first comment, max 3 hashtags, full voice mechanics (parentheticals, register shift).
- Email/newsletter: links inline are fine, no hashtags, shorter and scene-setting.
- Discord/reminder/blurb: shortest, most direct, utility tone — resist the urge to re-sell.

**How to keep consistency across outputs:**
- Every output must use the canonical links table in `voice-and-tone.md` verbatim — never restate a link from memory or guess a URL.
- Every output must be traceable to a real, specific detail supplied in `real_details`/`anchor_detail` — no invented quotes, no invented attendee numbers, no invented guest credentials.
- If two outputs in the same batch would use the same hook structure (e.g. both open with "Last time, someone..."), vary the structure — repetition across a content batch reads as templated even when each individual piece is on-voice.

**Output format:** plain text/markdown copy only, no meta-commentary embedded in the copy itself. Meta-commentary (hook rationale, revision angles) goes outside the copy block, never inside it.

---

## Reference Files

- **`references/voice-and-tone.md`** — brand voice, writing rules, banned phrases, canonical links, hashtags
- **`references/templates.md`** — structure for all 7 content formats + quick-reference table
- **`references/examples.md`** — strong/weak few-shot pairs with rationale, one per format

## Related Skills

- **`content-gen`** — Jacki's personal-brand voice (LinkedIn, build stories). Use that skill instead when the content is written as Jacki herself rather than as The UX Chats brand.
- **`ux-chats-image-generator`** — matching visual asset generation for the same events/announcements this skill writes copy for.
