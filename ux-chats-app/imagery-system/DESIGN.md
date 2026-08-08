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
  poster-date-badge:
    backgroundColor: "{colors.purple}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "20px 32px"
  poster-speaker-photo:
    border: "4px solid {colors.ink}"
    rounded: "{rounded.md}"
    boxShadow: "10px 10px 0 {colors.ink}"
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
| `--purple` | `#6D28D9` | Date badges, title accents, dark-mode light-source fields |
| `--purple-deep` | `#4C1D95` | Dark-mode background fields, shadow on purple elements |
| `--yellow` | `#FFCB33` | Primary CTA fill, accent stickers, dark-mode text highlights |
| `--pink` | `#FF6FA5` | Sticker accent, speaker name highlights, decorative dots |
| `--sky` | `#8ECBFF` | Sticker accent, secondary info badges, dark-mode link color |

### Light Mode vs. Dark Mode

Two poster modes, determined by the canvas background:

**Light Mode** (cream/cream-2 background): Used for Community Nights, partnerships, general announcements. Feels warm, open, daytime. Ink text on cream. Purple and yellow are the primary accents. Photos use polaroid-style white frames.

**Dark Mode** (ink background): Used for Special Guest Nights, workshops, game nights. Feels dramatic, evening, premium. Cream/white text on ink. Yellow, pink, and sky accents pop vividly against the dark background — use them as glowing sticker elements. Photos can use no frame or a thin cream border.

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
│  │  DETAILS ZONE          │  │  ← date, time, speaker, price
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

The outermost container. Two variants:

**Light Canvas:** `background: #FBF3DD`, `border: 5px solid #1C1430`, `box-shadow: 14px 14px 0 #1C1430`. Background has a subtle 1px dot texture (same as the website's `.dots` pattern, scaled for poster resolution). Inner padding: 64px.

**Dark Canvas:** `background: #1C1430`, `border: 5px solid #1C1430` (border still visible against the page background the poster sits on), `box-shadow: 14px 14px 0 rgba(0,0,0,0.3)` — shadow softens slightly on dark mode since ink-on-ink shadow is invisible. Inner padding: 64px. No dot texture on dark canvases (it doesn't read).

### Title Block

The event title set in Bricolage Grotesque 800. This is the most important element on the poster.

- **Size:** 100–180px depending on title length. Short titles (2–4 words) go larger. Long titles (5–8 words) go smaller and may split across more lines.
- **Color:** Ink on light mode; cream on dark mode.
- **Alignment:** Left-aligned by default. Centered for single-line short titles. Never right-aligned.
- **Accent:** A single word or phrase can be colored (purple on light, yellow on dark) for emphasis. Never color more than 30% of the title.
- **Line breaks:** Manual `<br>` at semantic breaks. Use a `<span>` with `display: block` and a smaller font-size for subtitle lines.

Markup pattern:
```html
<h1 class="poster-title">
  What Recruiters
  <span class="accent">Really Think</span>
  with Carl Wheatley
</h1>
```

### Date Badge

A purple block (or dark-mode variant) displaying the event date and time prominently.

- **Light mode:** `background: #6D28D9`, `color: white`, `border-radius: 16px`, `padding: 20px 32px`, `box-shadow: 8px 8px 0 #1C1430`.
- **Dark mode:** `background: #FFCB33`, `color: #1C1430`, same dimensions.
- **Content:** Day + date on one line (Bricolage 800, 48px), time + timezone below (Hanken Grotesk 700, 22px).
- **Position:** Typically top-right or integrated into the title zone.

### Speaker Block

Displays the guest speaker's photo and name. Two layout variants:

**Horizontal:** Photo on the left (polaroid frame), name + role on the right. Used when the speaker is the primary draw (Special Guest Nights).

**Stacked:** Photo above, name below, centered. Used for host photos or secondary speakers.

- Photo frame: 4px solid ink border, 16px border-radius, 10px hard shadow. Optional 2–4° rotation.
- Photo dimensions: 300–500px square (adjustable).
- Speaker name: Hanken Grotesk 700, 36–52px.
- Speaker role/title: Hanken Grotesk 500, 20–24px, in a muted tone (purple on light, sky on dark).

### Stickers

Rotated accent badges that add the "zine" feel. Stickers contain short text (1–4 words), an icon, or both.

- **Frame:** 3px solid ink border, 12px border-radius, 6px hard shadow.
- **Fill options:** Yellow (`#FFCB33`), Pink (`#FF6FA5`), Sky (`#8ECBFF`), Cream (`#FBF3DD`), or White for light mode; Yellow, Pink, Sky, or Purple for dark mode.
- **Text:** Bricolage Grotesque 800, 16–22px, tightly tracked. Always short: "Free," "Aug 13," "New," "Game Night."
- **Rotation:** Random ±2° to ±6°. Determined by a seed derived from the sticker text so the same sticker always lands at the same angle.
- **Position:** Stickers can be placed anywhere in the composition. Common placements: top-left corner (overhanging the border frame), attached to the date badge, next to the speaker photo. At least one sticker should overhang the outer frame or another element — this is key to the "physical collage" illusion.
- **Never:** rotate a sticker past 8° or it looks broken. Never place a sticker fully inside the margins — at least one edge should touch or cross a border.

### Photo / Polaroid

A photo element with the signature polaroid treatment.

- **Frame:** 10px white/cream padding on top, left, and right; 0px on bottom. The image sits on top; a caption area (`.cap`) below contains a short label in Bricolage 800.
- **Border:** 3px solid ink around the entire frame.
- **Shadow:** `10px 10px 0 #1C1430`.
- **Rotation:** ±2° to ±4°.
- **Dark mode variant:** Reduce the white frame to 4px (it can look harsh against ink). Alternatively, use no frame and just the image with a 3px ink border.

### Event Tag

A small pill that labels the event type. Always placed in the header zone.

- **Style:** Identical to the main site's Tag component: pill shape (`border-radius: 999px`), 3px ink border, white/cream fill, Hanken Grotesk 800 at 16–18px with uppercase letter-spacing.
- **Content:** "Community Night," "Special Guest Night," "Workshop," "Free," or "Ticketed."
- **Dark mode variant:** Yellow fill with ink text for maximum contrast.
- **Prefix:** Always prepend a hash or icon: `# Community Night` or `✦ Special Guest`.

### CTA Block

The call-to-action at the bottom of the poster.

- **Style:** Yellow pill button (`background: #FFCB33`, `border: 3px solid #1C1430`, `border-radius: 999px`, `padding: 18px 36px`, `font: 800 22px Hanken Grotesk`, `box-shadow: 8px 8px 0 #1C1430`).
- **Content:** "Register on Luma →" or "Join Discord →" or "Free — Grab a Spot →"
- **Dark mode:** Same yellow button — it pops dramatically against ink.
- **Position:** Bottom-right or centered in the footer zone. Always the last element in the reading order.

### Decorative Elements

Small CSS-drawn shapes that add texture and playfulness:

- **Stars** (✦): A yellow or purple 5-pointed shape. Used as list bullets, section dividers, or standalone accents in sticker clusters.
- **Squiggles:** A hand-drawn underline effect via `text-decoration-style: wavy` or an SVG path. Use sparingly under single words in titles.
- **Dot clusters:** Groups of 3–5 small filled circles in brand colors. Used as lightweight decoration in empty corners. CSS `border-radius: 50%` divs, 8–16px diameter.
- **Green dot:** The `.badge-dot` from the parent system (6px green circle). Use next to "Live" or "Free" indicators.

## Composition Patterns

### Pattern A: Speaker-Feature (Dark Mode)

For Special Guest Nights where the speaker is the draw.

```
┌────────────────────────────────────┐
│  [Event Tag: Special Guest Night]  │
│                                    │
│  TITLE          ┌──────────┐       │
│  TITLE          │          │       │
│  TITLE          │  SPEAKER │       │
│                 │  PHOTO   │       │
│  [Date Badge]   │          │       │
│                 └──────────┘       │
│  Description text here.           │
│  Short and punchy.                │
│                                    │
│              [Register on Luma →]  │
│  [★ sticker]                 [✦]  │
└────────────────────────────────────┘
```

### Pattern B: Event-Feature (Light Mode)

For Community Nights and free events where the activity is the draw.

```
┌────────────────────────────────────┐
│  [Sticker: Free]  [Sticker: Aug 13]│
│                                    │
│         GAME NIGHT                 │
│         ─────────                  │
│                                    │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ GAME │  │ GAME │  │ GAME │     │
│  │  1   │  │  2   │  │  3   │     │
│  └──────┘  └──────┘  └──────┘     │
│                                    │
│  [Date]  [Time]  [Free]            │
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
| Email/social preview | 1200×630px | Simplified: title + date + CTA only, no photos |

Each canvas size is its own composition template, not a CSS media query. The same config object produces different posters for different sizes by rearranging elements, not shrinking them.

## Do / Don't

**Do:**
- 5px ink outer frame with 14px hard shadow on every poster
- Bricolage Grotesque 800 at 100px+ for titles
- Hard shadows with zero blur, always right + down
- At least one sticker that overhangs a border or frame
- Short punchy body copy (2–3 lines max)
- Deliberate element placement (absolute positioning, not flow)
- Yellow CTA button as the last visual element
- Real event photos only

**Don't:**
- Soft/blurred shadows — ever
- Hairline borders (minimum 2px, almost always 3px+)
- Gradient backgrounds or gradient overlays on photos
- Glassmorphism, backdrop-filter, or any translucent-blur effect
- Body text longer than 3 lines
- More than 3 stickers on one poster
- Rotation beyond ±8°
- AI-generated imagery or stock photos
- Inter, Roboto, Arial, or any typeface not in the brand system
- Mixing light and dark mode elements on the same canvas
