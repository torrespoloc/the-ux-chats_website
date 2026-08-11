---
name: UX Chats Imagery System
description: A code-to-image poster design system for UX Chats event graphics. Extends the parent sticker-zine brand with poster-scale components and composition rules.
parentSystem: ../../DESIGN.md
colors:
  cream: "#FBF3DD"
  cream-2: "#F6E9C4"
  ink: "#1C1430"
  purple: "#6D28D9"
  purple-deep: "#4C1D95"
  yellow: "#FFCB33"
  pink: "#FF6FA5"
  sky: "#8ECBFF"
  accent-orange: "#FF5A1F"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.02em"
    posterScale: "80px–200px"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontWeight: 500
    lineHeight: 1.35
    posterScale: "20px–28px"
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontWeight: 800
    fontSize: "16px"
    letterSpacing: "0.14em"
    textTransform: "uppercase"
rounded:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "22px"
  full: "999px"
spacing:
  poster-pad: "64px"
  block-gap: "32px"
  sticker-offset: "-12px"
components:
  poster-canvas-light:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    border: "5px solid {colors.ink}"
    dimensions: "2000px × 2000px"
  poster-canvas-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    border: "5px solid {colors.ink}"
    dimensions: "2000px × 2000px"
  poster-title-hero:
    fontFamily: "Bricolage Grotesque"
    fontWeight: 800
    fontSize: "100px–180px"
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  poster-speaker-photo:
    border: "4px solid {colors.ink}"
    rounded: "{rounded.md}"
    boxShadow: "10px 10px 0 {colors.ink}"
    sizing: "large — a lead visual element (600-900px on a 2000px canvas), not a small inset"
    source: "existing approved headshot only — search public/library/ before ever generating one"
    aspectRatio: "preserve source exactly — never stretch or squash"
  poster-logo:
    asset: "ux-chats-app/public/img/logo.png"
    rule: "composite the exact asset — never redrawn, restyled, or recolored by an image model"
    position: "top-left by default; move only for a format's safe-margin needs"
    border: "optional white outline"
    boxShadow: "6px 6px 0 {colors.ink} (subtle)"
    rotation: "none"
  poster-sticker:
    border: "3px solid {colors.ink}"
    rounded: "{rounded.sm}"
    rotation: "±2° to ±6°"
    boxShadow: "6px 6px 0 {colors.ink}"
  poster-tag:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "8px 18px"
    fontSize: "18px"
    fontWeight: 800
  poster-cta:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "18px 36px"
    fontSize: "22px"
    fontWeight: 800
    boxShadow: "8px 8px 0 {colors.ink}"
---

# Design System: UX Chats Event Imagery

## Overview

**Creative North Star: "The Flyer on the Corkboard"**

The UX Chats imagery system produces event posters that look like they were printed, stickered, and pinned up. It is the poster-making dialect of the parent sticker-zine brand — same vocabulary (thick ink outlines, hard shadows, chunky display type, cream paper), different medium (fixed canvas instead of scrolling viewport).

Where the website *scrolls*, the poster *composes*. Every element sits in deliberate relation to every other element on a fixed canvas. The poster must read as a single visual gesture — bold headline first, details for the interested, CTA for the convinced. Nothing feels like it fell into place by document flow.

The system is opinionated about what makes a code-generated image feel like a poster instead of a screenshot:
- **Scale.** Typography at 80–200px. Borders at 5px. Shadows at 10–14px. Everything is bigger, bolder, more physical.
- **Composition.** Elements are placed, not flowed. Absolute positioning, deliberate overlap, intentional white space.
- **Depth.** Hard shadows, rotation, and a subtle dot texture create the illusion of physical layers.
- **Restraint.** Two modes (light paper / dark ink), one type family pair, six accent colors. Variation comes from content and composition, not from adding new visual effects.

## Design Principles

1. **It must feel printed.** Thick borders, hard shadows, slight rotation, paper texture — every visual decision serves the physical illusion. If it looks like a screenshot of a div, it's wrong.
2. **Typography leads.** The event title in Bricolage Grotesque at 100px+ is the dominant visual element. Everything else supports it. Body copy is short — this is a poster, not an article.
3. **The parent brand is non-negotiable.** All tokens from the main UX Chats DESIGN.md apply. No new colors, no new typefaces, no new shadow styles. The imagery system *extends*, it does not *fork*.
4. **Composition over decoration.** A well-placed sticker and a bold headline do more work than six decorative elements. Negative space is part of the composition.
5. **Config-driven, not template-cramped.** A poster is a configuration object (title, date, speaker, photo, CTA) + a composition pattern. The system provides the composition; the event provides the content.

## Colors

The imagery system uses the identical 8-color palette from the parent brand. Poster-specific guidance:

| Token | Hex | Poster role |
|-------|-----|-------------|
| `--cream` | `#FBF3DD` | Light-mode canvas background |
| `--cream-2` | `#F6E9C4` | Light-mode secondary fields, sticker fills |
| `--ink` | `#1C1430` | All text on light backgrounds, dark-mode canvas background, all borders |
| `--purple` | `#6D28D9` | Title accents, dark-mode light-source fields |
| `--purple-deep` | `#4C1D95` | Dark-mode background fields, shadow on purple elements |
| `--yellow` | `#FFCB33` | Alternate single accent (CTA fill, one headline word, one sticker) |
| `--accent-orange` | `#FF5A1F` | **Preferred single accent** — CTA fill, one headline word, one sticker |
| `--pink` | `#FF6FA5` | Rare exception accent only — not a default |
| `--sky` | `#8ECBFF` | Rare exception accent only — not a default |

**v2 rule:** pick exactly one accent per poster — orange preferred, yellow as the alternate. Never combine yellow + pink + sky as equal accents on the same canvas.

### Light Mode vs. Dark Mode

Two poster modes, determined by the canvas background:

**Light Mode** (cream/cream-2 background): Used for Community Nights, partnerships, general announcements. Feels warm, open, daytime. Ink text on cream. Purple and yellow are the primary accents. Photos use polaroid-style white frames.

**Dark Mode** (ink background): Used for Game Nights, headshot-free Workshops, general premium/evening-feel announcements. Feels dramatic, evening, premium. Cream/white text on ink. Yellow, pink, and sky accents pop vividly against the dark background — use them as glowing sticker elements. Photos can use no frame or a thin cream border.

**Guest Collage** (see "Special Guest Night Visual Identity" below): the default for Special Guest Nights and any Workshop with a real speaker headshot — a third mode, not a Dark Mode variant.

Never mix modes within a single poster. The canvas color sets the mode; all elements adapt.

## Typography

### Poster Scale

Poster typography operates at a much larger scale than the website. The same two typefaces apply, with poster-specific sizing:

| Role | Family | Weight | Size range | Line height | Tracking |
|------|--------|--------|-----------|-------------|----------|
| Hero title | Bricolage Grotesque | 800 | 100–180px | 0.88 | -0.03em |
| Subtitle | Bricolage Grotesque | 800 | 48–72px | 0.92 | -0.02em |
| Speaker name | Hanken Grotesk | 700 | 36–52px | 1.1 | -0.01em |
| Date/number | Bricolage Grotesque | 800 | 40–64px | 0.92 | -0.02em |
| Body copy | Hanken Grotesk | 500 | 22–28px | 1.35 | 0 |
| Label/kicker | Hanken Grotesk | 800 | 16–18px | 1.2 | +0.14em |
| CTA text | Hanken Grotesk | 800 | 20–24px | 1.0 | 0 |

### Title Composition

Titles on posters are multi-line by nature — a 100px+ word on a 2000px canvas is 5–10 characters wide. Break titles for visual rhythm, not grammatical correctness. Each line should be roughly balanced in width. Use `line-height: 0.88` to create tight, impactful stacks.

Long event titles (e.g., "What Recruiters Really Think with Carl Wheatley") should be broken into 2–3 lines with the most impactful word(s) largest. Consider making the speaker name its own line or block, visually separated.

### Dark Mode Typography

On dark backgrounds, body text set in cream (#FBF3DD) at 500 weight on Hanken Grotesk meets WCAG AA (contrast ratio ~14:1). Bricolage headlines at 800 weight pass easily. Yellow (#FFCB33) on ink can be used sparingly for single-word highlights — it meets AAA for large text.

## Shapes & Borders

Identical to the parent system, with one addition for poster scale:

| Token | Value | Usage |
|-------|-------|-------|
| `--line` | `3px solid var(--ink)` | Internal borders, sticker edges, photo frames |
| `--line-heavy` | `5px solid var(--ink)` | **Poster outer border** — frame the entire canvas |
| `--line-thin` | `2px solid var(--ink)` | Dividing lines, subtle internal separators (rare) |
| `--shadow` | `6px 6px 0 var(--ink)` | Stickers, small badges |
| `--shadow-lg` | `10px 10px 0 var(--ink)` | Photos, polaroid frames, large accent blocks |
| `--shadow-xl` | `14px 14px 0 var(--ink)` | **Poster outer shadow** — the canvas itself casts a shadow |

### The Outer Frame

Every poster has a 5px solid ink border inset from the canvas edge by 20–30px, with a 14px hard offset shadow. This is the single strongest signal that "this is a printed object." Without it, the poster looks like a webpage screenshot. The frame also provides a natural margin that keeps content from bleeding to the edge.

### Rotation

Stickers rotate ±2° to ±6°. Photos (polaroid frames) rotate ±2° to ±4°. Never rotate the outer frame or the main title block — they anchor the composition. Rotation is random per-instance but should be deterministic given a seed so the same config always produces the same poster.

## Layout & Spacing

### Canvas Sizes

| Format | Dimensions | Use case |
|--------|-----------|----------|
| Square (default) | 2000 × 2000px | Instagram feed, general event poster |
| Story | 1080 × 1920px | Instagram/Facebook stories |
| Banner | 2400 × 1256px | Luma event header, Twitter banner |
| Wide | 2000 × 1400px | Luma event cover, rectangular posters |

### Composition Zones

A poster canvas divides into zones. Not every zone is used in every poster, but every element falls into one:

```
┌──────────────────────────────┐
│  MARGIN (30px, outer frame)  │
│  ┌────────────────────────┐  │
│  │  HEADER ZONE           │  │  ← event type tag, sticker cluster
│  │                        │  │
│  │  TITLE ZONE            │  │  ← hero headline, 2-3 lines
│  │                        │  │
│  │  DETAILS ZONE          │  │  ← speaker, price (never date/time — see Do/Don't)
│  │                        │  │
│  │  IMAGE ZONE            │  │  ← speaker photo, event photo
│  │                        │  │
│  │  FOOTER ZONE           │  │  ← CTA, URL, "Register on Luma"
│  └────────────────────────┘  │
│  STICKER OVERHANG ZONE       │  ← stickers that break the frame
└──────────────────────────────┘
```

### Spacing scale

| Token | Value | Usage |
|-------|-------|-------|
| `--ps-pad` | `64px` | Internal canvas padding (inside the border frame) |
| `--ps-gap` | `32px` | Gap between composition zones |
| `--ps-gap-sm` | `20px` | Gap within a zone (e.g., date and time) |
| `--ps-gap-lg` | `80px` | Large breathing room (between title and details) |
| `--ps-sticker-offset` | `-12px` | How far a sticker overhangs the element it's attached to |

## Elevation & Shadow

### The Zero-Blur Rule (extended)

No shadow on any element in the imagery system may have a blur radius. Every shadow is a hard offset: `Xpx Ypx 0 var(--ink)`. This is the single most important rule for the "printed" feel. Soft shadows read as digital; hard shadows read as paper.

### Shadow hierarchy

| Level | Token | Offset | Usage |
|-------|-------|--------|-------|
| 1 | `--shadow` | `6px 6px 0` | Stickers, small badges, tags |
| 2 | `--shadow-lg` | `10px 10px 0` | Photos, polaroid frames, speaker cards |
| 3 | `--shadow-xl` | `14px 14px 0` | Poster outer frame |

Elements with shadows should never overlap another element's shadow in a way that breaks the "stacked paper" illusion. Shadows all fall in the same direction (right + down). Never mix shadow directions on a single poster.

## Components

### Poster Canvas

**Adjusted — this no longer describes a fixed, code-rendered container.** Posters are generated (Vertex AI / OpenAI / Path 2b composite), not rendered from an HTML/CSS template with a literal outer frame — so "Poster Canvas" now means the output's *dimensions and aspect ratio*, not a bordered div.

- **Size/aspect ratio:** picked from the platform table (Instagram square, story, LinkedIn, banner, etc. — see Layout & Spacing below), not a fixed 2000×2000 default.
- **Background color and mode:** chosen per-poster, not locked to `--cream`/`--ink`. Pastels and saturated colors beyond the base 8-token palette are allowed — pick what fits the sub-identity (e.g. the blue-primary Special Guest Night direction) as long as the poster still reads as one deliberate, non-rainbow composition.
- **No separate outer frame.** There is no independently-drawn 5px border + 14px shadow wrapped around the whole canvas — the generated image *is* the poster. If a specific poster's visual language calls for an edge treatment (a border, a corner texture), it's part of that poster's own composition, not a global canvas component applied on top.
- **The logo still anchors every poster.** `poster-logo` (the official asset at `ux-chats-app/public/img/logo.png`) is composited top-left by default regardless of canvas size or color — see the Logo component below.

### Title Block

The event title set in Bricolage Grotesque 800. This is the most important element on the poster.

- **Size:** 100–180px depending on title length. Short titles (2–4 words) go larger. Long titles (5–8 words) go smaller and may split across more lines.
- **Color:** Ink on light mode; cream on dark mode.
- **Alignment:** Left-aligned by default. Centered for single-line short titles. Never right-aligned.
- **Accent:** A single word or phrase can be colored in the poster's one chosen accent (orange preferred, yellow as the alternate) for emphasis. Never color more than 30% of the title, and never use more than one accent color on a single poster.
- **Line breaks:** Manual `<br>` at semantic breaks. Use a `<span>` with `display: block` and a smaller font-size for subtitle lines.

Markup pattern:
```html
<h1 class="poster-title">
  What Recruiters
  <span class="accent">Really Think</span>
  with Carl Wheatley
</h1>
```

### Speaker Block

Displays the guest speaker's photo and name. Two layout variants:

**Horizontal:** Photo on the left (cutout, no frame or polaroid), name + role on the right. Used when the speaker is the primary draw (Special Guest Nights).

**Stacked:** Photo above, name below, centered. Used for host photos or secondary speakers.

- **Before rendering this block, search `public/library/` for `headshot_<first>-<last>.*`.** Use the existing approved photo if one exists — never generate a synthetic face for a named speaker. If none exists, flag it explicitly rather than silently substituting a generated portrait.
- Photo frame: 4px solid ink (or white on dark canvas) border, 16px border-radius, 10px hard shadow. Optional 2–4° rotation.
- Photo dimensions: **600–900px** on a 2000px canvas — large and prominent, a lead visual element, not a small inset. Scale proportionally for smaller canvas sizes.
- Aspect ratio: always match the source photo exactly. Never stretch or squash.
- Speaker name: Hanken Grotesk 700, 36–52px.
- Speaker role/title: Hanken Grotesk 500, 20–24px, in a muted tone (purple on light, sky on dark).

### Stickers

Rotated accent badges that add the "zine" feel. Stickers contain short text (1–4 words), an icon, or both.

- **Frame:** 3px solid ink border, 12px border-radius, 6px hard shadow.
- **Fill options:** Yellow (`#FFCB33`), Pink (`#FF6FA5`), Sky (`#8ECBFF`), Cream (`#FBF3DD`), or White for light mode; Yellow, Pink, Sky, or Purple for dark mode.
- **Text:** Bricolage Grotesque 800, 16–22px, tightly tracked. Always short: "Free," "Aug 13," "New," "Game Night."
- **Rotation:** Random ±2° to ±6°. Determined by a seed derived from the sticker text so the same sticker always lands at the same angle.
- **Position:** Stickers can be placed anywhere in the composition. Common placements: top-left corner, next to the speaker photo, near the title block. At least one sticker should overhang another element — this is key to the "physical collage" illusion.
- **Never:** rotate a sticker past 8° or it looks broken. Never place a sticker fully inside the margins — at least one edge should touch or cross a border.

### Photo / Polaroid

A photo element with the signature polaroid treatment.

- **Frame:** 10px white/cream padding on top, left, and right; 0px on bottom. The image sits on top; a caption area (`.cap`) below contains a short label in Bricolage 800.
- **Border:** 3px solid ink around the entire frame.
- **Shadow:** `10px 10px 0 #1C1430`.
- **Rotation:** ±2° to ±4°.
- **Dark mode variant:** Reduce the white frame to 4px (it can look harsh against ink). Alternatively, use no frame and just the image with a 3px ink border.

### Logo

The official UX Chats mark, composited exactly as provided — never redrawn, restyled, or recolored by an image model.

- **Asset:** `ux-chats-app/public/img/logo.png` (200×200px source).
- **Position:** Top-left corner of the header zone by default. Only nudge for a format's safe-margin needs (e.g. a 6:1 LinkedIn banner) — note the reason when you do.
- **Treatment:** Optional white outline, subtle `6px 6px 0 {ink}` shadow, no rotation.
- This replaces the old bottom-right text wordmark as the primary brand mark on every poster; a small "UX Chats" text lockup may still appear in the footer if useful, but the logo asset top-left is the required brand anchor.

### Event Tag

A small pill that labels the event type. Always placed in the header zone.

- **Style:** Identical to the main site's Tag component: pill shape (`border-radius: 999px`), 3px ink border, white/cream fill, Hanken Grotesk 800 at 16–18px with uppercase letter-spacing.
- **Content:** "Community Night," "Special Guest Night," "Workshop," "Free," or "Ticketed."
- **Dark mode variant:** Yellow fill with ink text for maximum contrast.
- **Prefix:** Prepend a `#` for category tags (`# Community Night`). No star/sparkle prefixes — those are retired.

### CTA Block

The call-to-action at the bottom of the poster.

- **Style:** Yellow pill button (`background: #FFCB33`, `border: 3px solid #1C1430`, `border-radius: 999px`, `padding: 18px 36px`, `font: 800 22px Hanken Grotesk`, `box-shadow: 8px 8px 0 #1C1430`).
- **Content:** "Register on Luma →" or "Join Discord →" or "Free — Grab a Spot →"
- **Dark mode:** Same yellow button — it pops dramatically against ink.
- **Position:** Bottom-right or centered in the footer zone. Always the last element in the reading order.

### Component Library

Recurring illustrations (icons, textures, decorative shapes) live in `imagery-system/library/` as hand-authored SVGs, cataloged by name in `library/manifest.json` — not regenerated from a prompt each time a poster needs one. This exists for the same reason the logo is composited instead of redrawn: ask a model to draw "a pen tool icon" twice and you get two different pens, which breaks the "same family" requirement below. See `library/README.md` for the full rationale and how to add new components.

When a poster needs a topic-specific decorative element (Rule: "Topic-specific objects" below), check the library first. If a matching component exists, reuse it by name instead of generating a new one. If it doesn't exist yet, author it as a new SVG component rather than a one-off AI-generated element — future posters on the same topic should get the same asset.

### Decorative Elements (v2 — no stars, with one named exception)

Small CSS-drawn shapes that add texture and playfulness. **The star/sparkle motif (✦/★) is retired from the poster vocabulary** — replace it with one of these instead. Budget: 2–4 supporting decorative elements total per poster, beyond the headline + speaker + logo anchors.

**Scoped exception:** the `star-burst` component in the component library is permitted on Special Guest Night posters that feature a real speaker headshot — this is a deliberate sub-identity choice, not a reversal of the rule below. It stays retired everywhere else (Community Night, Game Night, Workshop, Partnership). See `library/manifest.json` for the exact restriction as written.

- **Arrows:** Hand-drawn curved arrows pointing from a label toward the element it annotates. Ink color, 3–5px stroke.
- **Scribbles / squiggles:** A hand-drawn underline effect via `text-decoration-style: wavy` or an SVG path. Use sparingly under single words in titles.
- **Dot clusters:** Groups of 3–5 small filled circles in brand colors. Used as lightweight decoration in empty corners. CSS `border-radius: 50%` divs, 8–16px diameter.
- **Checkmarks:** Simple hand-drawn check marks, useful for case-study/checklist-themed talks.
- **Paper shapes:** Torn-edge rectangles or simple geometric cutouts, echoing the torn-paper headline treatment.
- **Topic-specific objects:** UI fragments (browser chrome, checklist cards) in moderation when the event topic calls for it — e.g. a case-study talk. Don't default to these for every poster.
- **Green dot:** The `.badge-dot` from the parent system (6px green circle). Use next to "Live" or "Free" indicators.

## Special Guest Night Visual Identity ("Guest Collage")

**A third canvas mode, alongside Light and Dark — used whenever a poster features a real speaker headshot.** This is not a one-off exception; it's the standing default for Special Guest Nights and any Workshop with a named speaker photo. Confirmed 2026-08-10, reverse-engineered from `sg--earl-case-study-light.png` (see `imagery-system/library/` for the component assets this sub-identity draws from).

### Why a third mode, not a Light/Dark variant

Guest Collage doesn't fit the cream-paper/ink-canvas binary — it runs on a fully saturated, per-poster canvas color that neither existing mode describes. Rather than force it into "Dark Mode" (as the original Pattern A did), it's its own documented mode. Community Nights, Game Nights, Partnerships, and headshot-free Workshops still choose Light or Dark as before — Guest Collage only activates when a real human photo is the lead visual element.

### Palette — color is free, per poster

**There is no fixed Guest Collage color.** The mechanics below (sticker collage, ransom-note headline, script name, expanded decoration) are the constant; the canvas color is chosen fresh for each poster, the same way the existing gallery already varies it: `sg--john-sp.png` runs orange, `sg--carl.png` runs a pastel purple/lavender, and `sg--earl-case-study-*.png` runs a saturated blue — all three are correct Guest Collage posters, not variations on one "true" color.

When picking a poster's palette, choose:
- **One canvas base color** — saturated or pastel, whatever fits the speaker/topic. Reference points already in the gallery: saturated blue (Earl), saturated orange (John), pastel purple (Carl).
- **One warm or contrasting accent** against that base, used sparingly (a CTA-adjacent chip, an arrow, a small blob) — not spread evenly across the canvas.
- **White or cream** for sticker/card fills and outlines — this stays constant regardless of the base color.
- **Black/ink** (or white, on a dark-enough base) for headline text — pick whichever gives the strongest contrast against the chosen base.

Earl's poster measured out to `#2462EE` (base), `#153FE4` (darker title-slab shade), `#0D28CC` (shadow), `#FDA91A` (accent) — useful as a worked example of how one base color splits into a slightly darker shade for the title slab and a deeper shade for shadows, not as the palette to reuse by default.

### Headline: the "ransom-note stack"

A new title pattern, distinct from the single continuous `poster-title-hero` used elsewhere. Each line of the headline is its own independently-colored, independently-rotated sticker card, stacked with slight overlap:

- 3–4 lines, each its own rectangular chip (solid color or white/cream paper texture)
- Each chip rotated independently, roughly ±2–4°, not uniform
- Text: Bricolage Grotesque 800 (same brand headline font — no new typeface needed here)
- The chips overlap slightly top-to-bottom rather than stacking with even gaps, echoing torn/pasted paper
- Reserve one chip (typically the last line) for the strongest color emphasis — the poster's accent fill with contrasting text reads as the "punchline" of the headline

### Speaker name: plain pill, not script

**Reversed 2026-08-10 — the script-font treatment below is retired, do not use it again.** The `with [Speaker Name]` tag uses the same plain-pill component as `sg--what-recruiters-really-think.png`: a white pill, thin ink outline, "with" in regular weight + the name in bold weight, both in plain dark ink text (Hanken Grotesk, or Bricolage Grotesque Regular/Bold if compositing with PIL). No script face, no color fill on the pill itself. This is now the one standard name-tag component for every poster — Guest Collage included, no exception.

### Headshot — supporting element, not half the canvas

Same non-negotiable rule as the base system, restated because it matters most here: **the headshot is a real photo, pixel-exact, never AI-regenerated or filtered.** Thick white cutout outline, hard shadow. Upright or very slightly tilted depending on the composition — not a dramatic rotation. See `scripts/composite_poster.py` (Path 2b) for how this gets composited deterministically rather than left to a generation model.

**Size, confirmed 2026-08-10 after the Mrinali poster ran too large:** the headshot should read as one of four equal-weight anchors (headshot, logo, headline, texture/color), not the dominant element. Target roughly **30–35% of canvas width**, not ~50%. If the photo is crowding the headline or touching more than a third of the canvas, shrink it.

### Logo — always present, top-left, always tilted right, white sticker border

Confirmed 2026-08-10: the UX Chats sticker logo is **never optional** on a Guest Collage poster and its position is fixed — top-left corner, same as every other mode. The one Guest-Collage-specific difference from the base system's logo rule: give it a small rotation, the same loose "stickered on" tilt as the ransom-note headline chips, rather than sitting perfectly square.

- **Rotation direction is fixed: always tilt right (positive rotation), never left.** Roughly 5–10°.
- **Source asset:** use the real vector, `ux-chats-app/public/library-components/logos/ux-chats-logo_SVG.svg` — not a flattened PNG. Its white backing plate (first `<path>`, `fill="#FEFEFE"`) is a **built-in sticker-style white border**, already extending beyond the orange card on every side — don't draw a separate border, correctly rasterizing this asset produces it automatically.
- **Rasterizing this SVG:** strip every `style="..."` attribute via regex (`re.sub(r'\s*style="[^"]*"', '', svg)`) before running it through `cairosvg.svg2png()`. The exported `style` attributes embed a `color(display-p3 ...)` fill that cairosvg can't parse and silently renders as solid black — stripping `style` lets the plain XML `fill="#HEX"` attributes take over and produces a correct full-color render. This is a general fix for any Figma-exported SVG hitting the same black-silhouette failure, not a one-off.
- Never redrawn, never recolored by a generation model — always composited from the real asset.

### Decorative elements — expanded budget for this mode only

The base system's 2–4 element cap is **not** the limit here — Guest Collage posters can run denser, pulling named assets from the component library (`imagery-system/library/manifest.json`) instead of inventing new ones each time:

- `star-burst` — permitted on Guest Collage posters specifically (see the library's `restriction` note); use 2–3 scattered in empty corners
- Topic-relevant library icons (`pen-nib`, `browser-wireframe`, `ai-chip`) — pick 1–2 that match the talk's subject, not all three by default
- Hand-drawn arrows/motion lines annotating the headline or headshot
- Budget: roughly 4–7 total supporting elements (stars + icons + arrows combined), versus the base system's 2–4 — still curated, not "everything at once." If you're reaching for an 8th, cut one.
- **Illustrations carry color, confirmed 2026-08-10:** icons/arrows/stars should not default to flat black or white line art across the board. Give at least half of them a fill or stroke in the poster's accent color (and a touch of the secondary/tertiary accent — e.g. a dash of yellow alongside an orange-led palette) so the decoration reinforces the palette instead of sitting outside it. Black and white remain fine for some elements — the point is variety, not banning ink.

### Background texture — subtle, not flat-dead

Confirmed 2026-08-10, reverse-engineered from `sg--carl.png`: a pure flat-color canvas reads cheap at this scale. Add **minimal, low-contrast texture** confined to corners/edges, never behind the headline or face:
- Soft organic blob shapes, one shade darker or lighter than the base color (Carl's poster uses this in the top-right and bottom-left corners)
- Small polka-dot clusters in a similarly low-contrast tone, tucked into an otherwise-empty corner
- Keep contrast subtle enough that it reads as texture, not a second competing shape — the canvas should still feel "mostly flat and solid" at a glance, just less sterile.

### Tags and CTA — no "Special Guest" tag, ever; CTA smaller and fixed bottom-left

**Reversed 2026-08-10 — do not add a "Special Guest" tag to any poster, standing rule, no exception.** Earlier guidance treated it as the one tag that "earns its place by default"; that's retired. Drop it along with "Live" and "Q&A" unless the user explicitly asks for a tag back.

**Register CTA badge, confirmed 2026-08-10:**
- Size: **30% smaller** than the earlier draft scale (which was already "roughly half the scale of earlier drafts" — this compounds on top of that, so the badge reads as a small supporting element, not a button).
- Position: **always the bottom-left corner** of the canvas. Not footer-centered, not right-aligned — bottom-left, every poster, no exception.

### The four-anchor formula

For every Guest Collage poster: **headshot + logo + two colors (base + accent) + white.** That's the whole palette and the whole anchor set — headline, tags, and decoration all draw from those same two colors plus white/black, never introducing a third saturated hue.

### What still applies unchanged

- **Never redraw the logo** — composite the exact `public/img/logo.png` asset, same as every other poster.
- **Never add a date/time badge** — the global rule applies here too, including to future regenerations of the reference poster itself.
- **Real photos only, pixel-exact** — no exception, no softening for this mode.
- **One accent color as the "lead" emphasis** — even though the base color is chosen per poster, don't spread three saturated accents evenly; let one accent carry the emphasis role the base system's orange/yellow rule describes.

## Composition Patterns

### Pattern A: Speaker-Feature (Guest Collage)

For Special Guest Nights and speaker-driven Workshops — see "Special Guest Night Visual Identity" above for the full color/typography/decoration spec this pattern uses by default. (Older dark-mode Special Guest posters used this same zone layout under a plain ink canvas; that variant is still valid for events without a photo-driven speaker, but Guest Collage is the default whenever a real headshot anchors the poster.)

```
┌────────────────────────────────────┐
│  [Logo]  [Event Tag: Special Guest]│
│                                    │
│  TITLE          ┌──────────┐       │
│  TITLE          │          │       │
│  TITLE          │  SPEAKER │       │
│                 │  PHOTO   │       │
│                 │ (large)  │       │
│                 └──────────┘       │
│  with [Speaker Name] (script)     │
│                                    │
│              [Register on Luma →]  │
│  [4-7 library/decorative elements] │
└────────────────────────────────────┘
```

### Pattern B: Event-Feature (Light Mode)

For Community Nights and free entrys where the activity is the draw.

```
┌────────────────────────────────────┐
│  [Logo]        [Sticker: Aug 13]  │
│                                    │
│         GAME NIGHT                 │
│         ─────────                  │
│                                    │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ GAME │  │ GAME │  │ GAME │     │
│  │  1   │  │  2   │  │  3   │     │
│  └──────┘  └──────┘  └──────┘     │
│                                    │
│           [Grab a Spot →]          │
└────────────────────────────────────┘
```

### Pattern C: Minimal (Light Mode)

For partnership announcements or simple event cards.

```
┌────────────────────────────────────┐
│                                    │
│  [Sticker]                         │
│                                    │
│  UX Chats                           │
│  ×                                   │
│  Partner Name                        │
│                                    │
│  Description in 2-3 lines.         │
│  Short body copy.                  │
│                                    │
│                    [Learn More →]  │
└────────────────────────────────────┘
```

## Imagery & Photos

### Photo Treatment

All photos in posters must be real event photos — no stock imagery, no AI-generated faces. This is a binding rule from the parent brand. Acceptable photo treatments:

1. **Polaroid frame** (default): White padding + ink border + shadow + slight rotation. Good for speaker portraits, crew photos.
2. **Hard-edge tile:** Image cropped to a rounded rectangle with a 3px ink border and hard shadow. No white frame. Good for action shots, event photos.
3. **Circle cutout:** `border-radius: 50%`, 3px ink border. Good for small headshots next to names.
4. **No frame:** Full-bleed image with no border. Only in dark mode where the dark image edges blend with the ink background.

### Image Specs

- **Resolution:** Source photos should be at least 800px in the relevant dimension for a 2000px poster.
- **Format:** PNG with transparency support for elements that need to layer.
- **Color treatment:** Photos can be left natural (they're candid event shots, not studio photography). No filters, no duotone, no heavy color grading — the poster styling provides the visual identity; the photo provides the humanity.

## Responsive Strategy

Posters are fixed-canvas, not responsive. There is no "mobile poster." Instead, the system defines multiple canvas sizes for different distribution channels:

| Channel | Canvas | Notes |
|---------|--------|-------|
| Instagram feed | 2000×2000px (1:1) | Default square poster |
| Instagram story | 1080×1920px (9:16) | Recomposed, not just cropped — title stacks vertically, photo moves below |
| Luma event cover | 2400×1256px | Wider composition, title + photo side by side |
| Email/social preview | 1200×630px | Simplified: title + CTA only, no photos, no date/time |

Each canvas size is its own composition template, not a CSS media query. The same config object produces different posters for different sizes by rearranging elements, not shrinking them.

## Do / Don't

**Do:**
- 5px ink outer frame with 14px hard shadow on every poster
- Bricolage Grotesque 800 at 100px+ for titles
- Hard shadows with zero blur, always right + down
- Search `public/library/` for an existing speaker headshot before ever generating one
- Composite the official logo asset (`public/img/logo.png`) top-left, exactly as provided
- A large, prominent speaker photo — a lead element, not an inset
- Exactly one contrasting accent color (orange preferred, yellow alternate) against the purple/lavender base
- 2–4 supporting decorative elements total, each with a clear purpose
- Short punchy body copy (2–3 lines max)
- Deliberate element placement (absolute positioning, not flow)
- Accent-color CTA button as the last visual element
- Real event photos only

**Don't:**
- Soft/blurred shadows — ever
- Hairline borders (minimum 2px, almost always 3px+)
- Gradient backgrounds or gradient overlays on photos
- Glassmorphism, backdrop-filter, or any translucent-blur effect
- Body text longer than 3 lines
- Stars or sparkles (✦/★) anywhere — retired from the poster vocabulary
- More than 4 decorative elements on one poster
- More than one accent color used as a "lead" color (never yellow + pink + sky as equals)
- A redrawn or restyled logo — always the exact asset
- A generated/synthetic face standing in for a real, named speaker
- **Date or time badges on the image, ever.** Rule as of 2026-08-10: dates and times go in the social copy/caption, never on the poster itself — a date on the image goes stale the moment the event is rescheduled and forces a full regeneration. The `Date Badge` component and its icon are retired from the poster vocabulary.
- Rotation beyond ±8°
- AI-generated imagery or stock photos
- Inter, Roboto, Arial, or any typeface not in the brand system
- Mixing light and dark mode elements on the same canvas
