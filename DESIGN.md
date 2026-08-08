---
name: UX Chats
description: A casual UX community where designers can be raw and real — no stiff intros, no corporate formalities.
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
    fontSize: "clamp(48px, 5.5vw, 76px)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "22px"
  full: "999px"
spacing:
  section-y: "84px"
  card-pad: "32px"
  btn-pad-x: "22px"
  btn-pad-y: "12px"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "12px 22px"
  button-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 22px"
  button-line:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 22px"
  tag-default:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px"
  card-default:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "32px"
  card-purple:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.cream}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: UX Chats

## Overview

**Creative North Star: "The Sticker Zine"**

UX Chats looks like something you'd find on a coffeeshop corkboard — a hand-assembled zine photocopied and stickered and passed around. It rejects both the glossy-dark startup aesthetic (glassmorphism, Inter, gradient everything) and sterile corporate minimalism (hairline borders, muted palettes, 'professional' restraint). This is a third thing: raw, tactile, made-by-someone.

Every surface feels like paper. Thick black outlines (3px, always) give every element the weight of a physical cutout. Hard offset shadows — zero blur radius, always — stack elements like layers of a collage, not like objects floating in digital space. Stickers rotate a few degrees and gently bob. The cream background has a faint dot texture, like newsprint held up to the light. Nothing feels rendered by a machine.

The system is deliberately coarse-grained. There are no 1px borders, no subtle drop-shadows, no 4px border-radius tokens. The smallest radius is 6px. The thinnest border is 2px (used sparingly). This is a design system that knows exactly what it rejects and leans all the way into its own language.

**Key Characteristics:**
- Thick 3px black outlines on every container, button, and card
- Hard offset shadows with zero blur — 6px/6px default, 10px/10px large
- Chunky Bricolage Grotesque display type at 800 weight with tight line-height (0.92)
- Warm cream paper background (#FBF3DD) with subtle dot texture
- Rotated elements (stickers, polaroids, testimonial cards) at 1–10° tilts
- Pill-shaped buttons with press-translate interaction (2px lift on hover, 2px depress on active)
- Alternating section backgrounds (cream → cream-2 → cream) for rhythm
- Dark surfaces (ink background) invert stroke to cream for visibility

## Colors

The palette is built on a physical metaphor: colored paper, ink, and stickers on a cream page. Every color has a clear, single job.

### Primary
- **Purple** (#6D28D9): The structural accent. Used for the navbar Events CTA, marquee band, date blocks, section kickers, and purple card variant. Also the default button fill.
- **Yellow** (#FFCB33): The primary CTA fill. Used on the hero's main action button and as an accent/star in the marquee. The most attention-commanding color on the page. Also fills host quote callouts.
- **Pink** (#FF6FA5): Sticker and accent color. Used on the floating "Next up" sticker, hero sticker, testimonial sticker badges, and as a game-card background. Adds energy without competing with the primary CTA.
- **Sky** (#8ECBFF): Secondary accent. Used on stickers, tag borders, and game-card backgrounds. Cooler and calmer than pink — provides contrast in the accent set.

### Neutral
- **Cream** (#FBF3DD): The page background. Warm, tactile, paper-like. Used as the default section background and the base canvas.
- **Cream-2** (#F6E9C4): The alternating section tint. Slightly warmer and more saturated than cream — creates visual rhythm between sections. Also used for the call-window title bar.
- **Ink** (#1C1430): Near-black with a subtle purple undertone. Used for all text, all borders (via `--stroke`), and all shadows. Also used for solid dark bands (CTA band, footer) where it becomes the background and cream becomes the text color.

### Named Rules
**The One Stroke Rule.** Every border on the page is 3px solid. The only exception is the 2px variant on interior dividers (testimonial author separators, dot borders). Never 1px, never hairline.

**The Dark Surface Inversion Rule.** When a section background is ink (#1C1430), all strokes and shadows switch from ink to cream so outlines remain visible. This is handled by the `[data-surface="dark"]` attribute.

## Typography

**Display Font:** Bricolage Grotesque (with sans-serif fallback)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif fallback)

**Character:** Bricolage Grotesque is chunky, expressive, and slightly irregular — it reads as hand-printed, not engineered. Hanken Grotesk is a workhorse grotesk that stays neutral and readable at small sizes while still feeling warm. The pairing is high-contrast in weight and personality: the display shouts, the body listens.

### Hierarchy
- **Display** (800, clamp(48px–76px), line-height 0.92, letter-spacing -0.02em): Section headlines and hero text. Always Bricolage Grotesque. Used on h1 and h2. The tight line-height creates a stacked, poster-like feel.
- **Title** (800, 28–34px, line-height 1.05): Card titles, founder names, event names. Bricolage Grotesque at a smaller scale. Still chunky, but measured.
- **Body** (500, 16–19px, line-height 1.45–1.55): All running text. Hanken Grotesk at weight 500. Max line length of ~620px for readability.
- **Label** (800, 13px, letter-spacing 0.14em, uppercase): Kicker/eyebrow labels above section headings. Purple, uppercase, wide tracking. Also used for entry tags and badge text.

### Named Rules
**The Chunky Headline Rule.** Every heading uses Bricolage Grotesque at weight 800. No light weights, no regular weights, no mixing display families. Hanken Grotesk never headlines.

## Layout

The page uses a single centered container (`max-width: 1180px, width: 92vw`) with sections stacked vertically at 84px padding each. Sections alternate background color (cream → cream-2) to create visual rhythm without relying on dividers.

Sections follow a consistent rhythm: kicker label → h2 headline → content, with the kicker at 25px and the headline following 14px below. Body lead text sits 18px below the headline.

The grid system is predominantly two-column on desktop (≥900–960px), stacking to single-column on mobile. Key grids: hero (1.08fr/0.92fr), about (1.05fr/0.95fr), hosts (0.8fr/1.2fr alternating), testimonials (1–3 columns by breakpoint).

Spacing is generous but not wasteful: 84px section padding, 32px card padding, 26–30px card gaps. The density reads as "comfortable zine spread," not "sparse luxury."

**Spacing scale:** The project uses an 8px grid for desktop/tablet (8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96) with a 4px supplement for mobile (4, 12, 20, 28, 36, 44, 52, 60). These are guidelines, not rigid constraints — the system prioritizes visual balance over strict grid adherence.

**Breakpoints:** 640px (mobile → tablet), 760px (cards go 2-col), 860px (nav switches to desktop), 900px (about/hosts go 2-col), 960px (hero goes 2-col).

## Elevation & Depth

This system uses **structural shadows** — hard offset shadows that simulate physical paper layering, not atmospheric glow. Every shadow has zero blur radius. The effect is a collage: elements sit on top of other elements, casting a hard ink shadow onto the surface below.

There are no soft shadows, no layered opacities, no elevation scale from 0–24dp. There are exactly two shadow sizes: default (6px/6px) and large (10px/10px). That's it.

Hover states increase the shadow offset (6→8px) and translate the element up and left (−2px/−2px), as if you're lifting a physical sticker off the page. Active/press states reverse the direction (translate 2px/2px, shadow shrinks to 2px/2px), as if the element has been pressed flat.

### Shadow Vocabulary
- **Default** (`box-shadow: 6px 6px 0 var(--ink)`): Cards, buttons, stickers, tags, polaroids, game cards, form fields on focus.
- **Large** (`box-shadow: 10px 10px 0 var(--ink)`): The hero call window, event cards, testimonial cards, CTA band cards.
- **Hover** (`box-shadow: 8px 8px 0 var(--ink)`; `translate: -2px -2px`): Buttons on hover.
- **Active** (`box-shadow: 2px 2px 0 var(--ink)`; `translate: 2px 2px`): Buttons on press.

### Named Rules
**The Zero-Blur Rule.** No shadow in this system ever has a blur radius. `0` is the only valid third parameter. Soft shadows are the visual language of SaaS; this is a zine.

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear on every card and container as a static collage property, not as a hover-only reveal. Movement (hover lift, press depress) changes the shadow offset, not its existence.

## Shapes

The form language is soft but not rounded-rectangle generic. Corners are generous (12–22px) but the thick 3px outlines keep them from feeling pillowy. The signature shapes are:

- **Pill (999px radius):** Buttons, badges, sticker badges, entry tags, floating stickers. The most recurring shape — everything actionable or accent is a pill.
- **Rounded rectangle (22px radius):** Cards, the call window, testimonial cards. The container shape — generous enough to feel friendly, not so round it loses structure.
- **Moderate rectangle (12–16px):** Inputs, tags (square variant), FAQ items, host quotes, logo mark, nav menu items. Utility shapes that balance readability with the system's softness.
- **Circle:** Stickers in the hero. Rare — used only when the element is purely decorative.

Borders are always 3px solid ink (the `--line` token). The only exception is `--line-thin` (2px solid), used sparingly for interior dividers — testimonial author separators, type specimen dividers, and dot borders on badges. There are no borderless containers, no subtle stroke colors, no border-radius-only differentiation. If it's a container, it has an outline.

## Components

The component library follows an atomic design hierarchy: Atoms (primitive building blocks), Molecules (composed patterns), and Organisms (full-section compounds). Every component respects the system's border, shadow, and typography rules.

### Atoms

**Badge** — Inline pill with a green dot, 3px ink border, hard shadow, slight rotation (−2°). White background, uppercase label in Hanken Grotesk 800 at 13px. Used for live/status indicators and section eyebrow labels.

**Kicker** — Eyebrow label rendered as a `<span>`, `<p>`, or `<div>`. Always 13px, weight 800, uppercase, 0.14em letter-spacing, purple. The universal section-introduction atom. Configurable via the `as` prop.

**Heading** — Typographic heading that defaults to Bricolage Grotesque display style. Configurable level (h1–h4) and a `display` boolean toggle to opt out of the display font. Passes through className and style.

**Text** — Body text wrapper with configurable `as` element (defaults to `<p>`). Passes through className and style. Used for consistent body typography without repeating font declarations.

**Button** — Full pill (999px radius), 3px ink border, hard shadow, Hanken Grotesk 800. Three sizes: sm (16px padding-x, 8px padding-y), md (20px/10px, default), lg (24px/12px). Four variants: primary (purple fill, white text), yellow (yellow fill, ink text — the primary CTA), line (white fill, ink text — secondary), ghost (transparent, no border/shadow — low priority). Hover lifts (−2px/−2px) and expands shadow to 8px/8px. Active presses down (2px/2px) and shrinks shadow to 2px/2px. All transitions 120ms ease. Renders as `<button>` or `<a>` via the `as` prop.

**Tag** — Chip with 3px colored border, hard shadow in the border color, slight random rotation (−1° to +1°). White background, ink text prefixed with `#`. Two shapes: square (12px radius, default) and pill (999px). Four color variants: default (purple border), yellow, sky, pink. The `#` prefix is injected automatically by the component.

**Sticker** — Decorative accent badge with 3px ink border, hard shadow. Three color variants: pink (white text), sky (ink text), yellow (ink text). Optional pill shape. Custom rotation via prop. Used as corner accents on cards and hero visuals. When positioned absolutely, applies a gentle floating keyframe animation (6–7s cycle).

**Card** — White container with 22px border radius, 3px ink border, large shadow (10px/10px), 32px padding. Lifts on hover (−4px translateY). Two variants: default (white) and purple (purple fill, cream text). Configurable `as` element (div, article, section).

**Polaroid** — White photo frame (10px padding top/sides, 0 bottom), 3px ink border, large shadow. Image fills the frame area, Bricolage 800 caption centered below at 14px. Defaults to a random slight rotation (−4° to +4°) if no explicit `rotate` prop is given. Used in the about collage and host bios.

### Molecules

**Marquee** — Purple scrolling band with 3px top/bottom borders. Bricolage Grotesque 800 at 24px in cream, phrases separated by a yellow star (★). Infinite 22s linear loop (duplicated content for seamless wrap). Accepts a `string[]` of items. Respects `prefers-reduced-motion`.

**NavBar** — Sticky header (74px height, cream background, 3px bottom border). Logo: rotated image tile (−4°, 42px, 12px radius) + "The UX Chats" wordmark in Bricolage 800 at 22px. Desktop nav links in Hanken Grotesk 700 at 15px with purple hover, plus a purple Events button. Mobile (<860px): pink hamburger toggle (rotated −3°) reveals a full-width slide-down menu of white bordered cards. Menu transition: 350ms cubic-bezier(0.22, 1, 0.36, 1) with opacity fade.

**Hero** — Full hero section with two-column grid (desktop ≥960px). Left: "live" badge (pink dot + label), h1 headline ("Be raw. Be real. Belong.") with yellow highlight on key phrases, subtitle in Hanken Grotesk 500, and dual CTAs (yellow primary + line secondary). Right: tilted call window (white card, 2° rotation, 22px radius) with macOS-style title bar dots, 2×2 face tile grid, and a purple "your seat →" join tile. Two floating stickers (pink circle, sky rounded-rect) positioned at corners with gentle float animations.

**CTABand** — Dark ink section with 3px top border, centered layout. Bricolage Grotesque h2 with a yellow-highlighted word, supporting paragraph, and a large yellow "Join Discord" button. Uses `data-surface="dark"` to invert strokes and shadows to cream.

### Organisms

**EventCard** — Compound event display with two variants. Features a purple date block (month/day/time stacked, 180px wide, Bricolage 800 day at 80px), a positioned "Next up →" or "Past event" sticker badge, an entry-tag pill (free/paid), a tag chip, h3 title, description, metadata row (icon + text pairs), and action buttons. Past variant: desaturated (filter: saturate(0.35)), reduced opacity (0.75), date block shifts to muted lavender (#A09AB5).

**TestimonialCard** — Rotated quote card (22px radius, large shadow). Large opening quote mark (Bricolage 800, 54px, purple at 20% opacity), quote text (17px Hanken Grotesk 500), and an author row with a circular avatar (44px, 3px border, hard shadow, Bricolage initials), name, and uppercase role label. Optional colored sticker badge at the top-right corner. Optional platform icon (Discord/LinkedIn) at the bottom-right. Cards have alternating rotations (−1.3° to +1.2°) and straighten on hover.

**TestimonialForm** — Bordered card (22px radius, cream-2 background, large shadow) with a pink "Share yours!" sticker badge at the top. Three fields: name, role, quote — each with an uppercase purple label (13px, 800 weight, 0.1em letter-spacing). Inputs are 16px Hanken Grotesk with 3px border, 12px radius, white background. Focus state: hard shadow appears + slight lift (−1px/−1px). Submit button (yellow, full width on mobile). Success state: centered card with a rotated yellow circle stamp, thank-you heading, and a link to Discord.

### Inputs / Fields
- **Style:** White or cream background, 3px ink border, 12px border radius, Hanken Grotesk at 16px/500 weight.
- **Focus:** Hard shadow appears (6px/6px) and the field shifts slightly (−1px, −1px), as if it's being lifted off the page.
- **Label:** 13px, 800 weight, uppercase, 0.1em letter-spacing, purple. Placed above the field with 6px gap.

### Imagery Gallery
- **Page:** A dedicated `/imagery` route for browsing event graphics. Content is organized into collapsible categories (Community Nights, Special Guest Nights, Partnerships, Extra Events).
- **Category accordion:** White header card (18px radius, hard shadow) with Bricolage title, purple item-count pill, and a chevron that rotates 180° on open. Hover lifts like a button.
- **Subcategory chips:** Sky-blue pill chips (2px border, uppercase 12px Hanken Grotesk 700) that act as a legend within each category.
- **Image grid:** CSS Grid with `auto-fill, minmax(260px, 280px)` columns. Each image is a square tile (1:1 aspect ratio, 8px radius, 3px border, hard shadow) that lifts on hover (−2px/−2px with expanded 10px/10px shadow). File name shown below in JetBrains Mono at 12px, with an optional yellow subcategory pill.

## Do's and Don'ts

### Do:
- **Do** use 3px solid borders on every container, card, and button. The `--line` token exists so you never have to think about this.
- **Do** use hard offset shadows (zero blur) for all depth. Default to `--shadow` (6px 6px), use `--shadow-lg` (10px 10px) for hero cards.
- **Do** alternate section backgrounds between cream and cream-2 for visual rhythm.
- **Do** use Bricolage Grotesque at weight 800 for all headings. Never lighter, never a different display face.
- **Do** rotate stickers, polaroids, and testimonial cards by 1–10° to maintain the hand-assembled feel.
- **Do** wrap new sections' content in `.reveal` for scroll-triggered entrance animation.
- **Do** respect `prefers-reduced-motion` — disable float animations and reveals when the user requests reduced motion.
- **Do** use the pill shape (999px radius) for buttons, badges, and accent labels. It's the system's most distinctive silhouette.

### Don't:
- **Don't** use 1px borders, hairline rules, or borderless containers. If it's a container, it has a 3px outline.
- **Don't** use soft/blurred shadows (`box-shadow` with a blur radius > 0). The zero-blur shadow is the system's single most defining rule.
- **Don't** use gradient backgrounds, glassmorphism, or translucent overlays. The material is paper, not glass.
- **Don't** use Inter, Roboto, Arial, or any neutralist sans-serif for display text. Bricolage Grotesque is the only display face.
- **Don't** set body text below 14px or above 19px. The readable range is intentionally tight.
- **Don't** add a dark mode. The cream paper background is the brand. This system doesn't invert.
- **Don't** use the purple card variant on more than one card per visible screen. Its weight depends on scarcity.
