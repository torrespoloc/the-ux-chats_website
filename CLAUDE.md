# CLAUDE.md — UX Chats Website

This repo is the **UX Chats** community landing page: a single self-contained `index.html`
(all CSS, fonts, and images inlined). It is a **playful "sticker zine" design** — NOT a
corporate or SaaS look. When editing or adding sections, match the system below exactly so
the page stays on-brand.

> **Important:** `index.html` is a *bundled* output (fonts + images are base64-inlined, so it
> is huge and hard to read). Treat the design tokens and component recipes in THIS file as the
> source of truth. Keep edits consistent with these rules rather than reverse-engineering the
> minified bundle.

---

## Brand in one line
A casual UX community where designers can be **raw and real** — no formal attire, no stiff
intros. The design should feel like a hand-made zine / sticker board: thick black outlines,
hard offset shadows, rotated "stickers", chunky display type, warm cream paper. Energetic,
human, a little irreverent. **Never** glossy gradients, glassmorphism, or generic dark-SaaS.

---

## Design tokens (CSS custom properties — already in `:root`)

```css
:root {
  --cream:       #FBF3DD;  /* page background (paper) */
  --cream-2:     #F6E9C4;  /* alternating section tint */
  --ink:         #1C1430;  /* near-black text, borders, shadows */
  --purple:      #6D28D9;  /* primary brand (buttons, marquee, date block) */
  --purple-deep: #4C1D95;
  --yellow:      #FFCB33;  /* accent / highlight / primary CTA fill */
  --pink:        #FF6FA5;  /* sticker accent */
  --sky:         #8ECBFF;  /* sticker / card accent */
  --line:        3px solid var(--ink);     /* the signature thick outline */
  --shadow:      6px 6px 0 var(--ink);      /* hard offset shadow (no blur) */
  --shadow-lg:   10px 10px 0 var(--ink);
}
```

**Rules**
- Borders are ALWAYS `3px solid var(--ink)` (the `--line` token). Never hairline/1px.
- Shadows are ALWAYS hard offset (`Xpx Ypx 0 var(--ink)`) — **zero blur radius**. Never soft.
- Brand color usage: yellow = primary CTA fill, purple = secondary/structural, pink & sky =
  playful accents only. Cream is the paper; ink is everything structural.
- Backgrounds alternate `--cream` ↔ `--cream-2` section to section for rhythm. The final CTA
  band is solid `--ink`; the footer is `--ink`.

---

## Typography

Two Google Fonts (loaded via `<link>` in `<head>`):

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

- **Display / headings:** `"Bricolage Grotesque"`, weight **800**, `line-height: 0.92`,
  `letter-spacing: -0.02em`. Used for h1/h2/h3, logo wordmark, stickers, card titles, the
  date block, fact-callouts. Helper class: `.display`.
- **Body / UI:** `"Hanken Grotesk"`, weights 400–800. Body copy is weight 500.
- **Scale (clamp-based, responsive):**
  - Hero h1: `clamp(50px, 8.4vw, 108px)`
  - Section h2 (`.sec`): `clamp(36px, 5.5vw, 64px)`
  - Card/founder h3: ~28–46px
  - Body: 16–19px / line-height 1.45–1.55
  - Kicker (eyebrow label): 13px, weight 800, `text-transform: uppercase`,
    `letter-spacing: .14em`, color `--purple`.

---

## Signature components & recipes

**Button (`.btn`)** — pill, thick outline, hard shadow, press-translates:
```css
.btn { font-family:"Hanken Grotesk"; font-weight:800; font-size:15px;
  border:var(--line); border-radius:999px; padding:12px 22px;
  background:var(--purple); color:#fff; box-shadow:var(--shadow);
  transition:transform .12s ease, box-shadow .12s ease; }
.btn:hover  { transform:translate(-2px,-2px); box-shadow:8px 8px 0 var(--ink); }
.btn:active { transform:translate(2px,2px);  box-shadow:2px 2px 0 var(--ink); }
.btn.yellow { background:var(--yellow); color:var(--ink); }   /* primary CTA */
.btn.line   { background:#fff;          color:var(--ink); }   /* secondary */
.btn.big    { font-size:18px; padding:16px 30px; box-shadow:var(--shadow-lg); }
```

**Sticker** — small rotated outlined badge with hard shadow. Pink/sky/yellow fills,
`transform: rotate(±Ndeg)`, often gently floating via a `float` keyframe. If a sticker
overhangs a card that has `overflow:hidden`, put the sticker in a **wrapper outside** the
clipped element (see the event card) so it isn't cut off.

**Card (`.card`)** — white, `border:var(--line)`, `border-radius:22px`, `padding:32px`,
`box-shadow:var(--shadow-lg)`, lifts on hover (`translateY(-4px)`). A `.card.p` variant is
purple-filled with cream text.

**Polaroid** — white frame (`padding:10px 10px 0`), thick outline, hard shadow, rotated a few
degrees, image on top + a `.cap` caption in Bricolage 800. Used for photos.

**Marquee** — purple band, infinite horizontal scroll of Bricolage 800 phrases separated by a
yellow ★ (`::after { content:"★" }`). 22s linear loop.

**Reveal-on-scroll** — elements with class `.reveal` start `opacity:0; translateY(26px)` and
get `.in` added by an IntersectionObserver (threshold 0.15) to animate up. **Always** wrap new
sections' content in `.reveal`. Respect `prefers-reduced-motion` (a media query disables it).

**Floating Join button** — fixed bottom-right, hidden until `scrollY > 520` (class `.show`
toggled on scroll), so it doesn't duplicate the hero CTA.

---

## Page structure (order matters)
1. **Sticky nav** — logo (image in a tilted outlined tile + "UX Chats" wordmark) + links + Join Discord button.
2. **Hero** — two columns: headline ("Be raw. Be real. Belong.") + CTA on the left; a tilted
   "UX Chat · Live" call window (face tiles + "your seat →") with stickers on its corners on the right.
3. **Marquee** — scrolling phrases.
4. **What we do** (`#about`) — copy + chips (who it's for) on the left, tilted polaroid collage on the right.
5. **Meet your hosts** (`#host`) — two alternating founder rows (photo + bio + yellow quote
   callout + fact chips), shared philosophy line centered below.
6. **Events** (`#events`) — featured "Next up" event card (purple date block + details + two
   Luma buttons), then the "Two kinds of night" format cards + games row.
7. **Real people. Real fun.** (`.crew`) — the real community call screenshot framed as a taped polaroid.
8. **Join CTA band** (`#join`) — solid ink background, big headline, yellow CTA.
9. **Footer** — ink background, logo + tagline + handle.

---

## Voice & copy
- Casual, warm, a little cheeky. Second person. Short punchy lines.
- Core phrases to reuse: "raw and real", "take off your tie", "no stiff intros",
  "Come as you are. Leave your LinkedIn voice at the door."
- Emoji are **allowed and on-brand here** (👋 ✦ 🎮 🤔 🎨 ⚡) — this is a casual community, unlike
  most enterprise systems. Use them sparingly as accents, not decoration spam.

---

## The one CTA that matters
Joining the **Discord** is the primary action everywhere:
`https://discord.gg/bBbDbZbQ9` — keep it in the nav, hero, floating button, and closing band.
Events link to Luma: event `https://luma.com/zjbt9cxo`, calendar `https://luma.com/TheUXChats`.

---

## Do / Don't
**Do:** thick ink outlines, hard offset shadows, rotated stickers, cream paper, chunky
Bricolage headlines, alternating section tints, `.reveal` on new content, pill buttons that
translate on press.
**Don't:** soft/blurred shadows, hairline borders, gradient page backgrounds, glassmorphism,
Inter/Roboto/Arial, tiny text (<14px body), or a dark generic-SaaS look. Don't add hard
attendance counts that make the community look small.

---

## How this file was built
The canonical, editable source (un-bundled, with separate `img/` assets) lives in the design
project this was exported from. `index.html` in this repo is the compiled single-file output
for GitHub Pages. If you make structural changes here, keep them consistent with the recipes
above so a future re-export from the design source doesn't clash.
