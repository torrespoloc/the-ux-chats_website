# CLAUDE.md — UX Chats Website

## AI Provider Setup (for contributors)

This project uses Google Vertex AI as the default Claude Code backend, billed to the UX Chats GCP project. A provider switcher is included so you can also use DeepSeek or your own Anthropic account.

### First-time setup

```bash
# 1. Install gcloud (if not already installed)
brew install --cask google-cloud-sdk

# 2. Authenticate with the UX Chats account
gcloud auth login hello@theuxchats.co
gcloud auth application-default login
gcloud config set project the-ux-chats
gcloud services enable aiplatform.googleapis.com

# 3. Add to ~/.zshrc so Vertex is always active
echo 'export CLAUDE_CODE_USE_VERTEX=1' >> ~/.zshrc
echo 'export ANTHROPIC_VERTEX_PROJECT_ID="the-ux-chats"' >> ~/.zshrc
echo 'export CLOUD_ML_REGION="us-central1"' >> ~/.zshrc

# 4. Load the provider switcher
source ./providers.sh
```

### Switching providers

```bash
source ./providers.sh          # load commands (do once per shell session)

use-vertex                     # Google Vertex AI — UX Chats GCP project (default)
use-deepseek                   # DeepSeek via Anthropic-compatible endpoint
use-anthropic                  # Your personal Anthropic account (unsets Vertex)
which-provider                 # Show active provider + auth state
```

### Image generation (ux-chats-image-generator skill)

When generating event images, use the `ux-chats-image-generator` skill. Three paths are available: Path 1 (OpenAI curl — uses `OPENAI_API_KEY` from `.env.local`), Path 2 (Vertex AI via `npx tsx scripts/gemini-image-gen.ts` — uses gcloud ADC, no API key needed, billed to UX Chats GCP), and Path 3 (code-based image generator skills — compute only). See `research_image_gen/image-generation-setup.md` for full details. `.env.local` is gitignored and never committed.

`.env.local` also contains `DEEPSEEK_API_KEY` for the UX Chats DeepSeek account. With it, `use-deepseek` works as a third provider option for Claude Code.

---

This repo is the **UX Chats** community landing page — a React app built with **Vite + Tailwind CSS v4** at `ux-chats-app/`. It is a **playful "sticker zine" design** — NOT a
corporate or SaaS look. When editing or adding sections, match the system below exactly so
the page stays on-brand.

> **Design systems — which file to reference:**
> 
> | When working on... | PRODUCT.md | DESIGN.md |
> |---|---|--|
> | The website (pages, components, styles) | `./PRODUCT.md` (repo root) | `./DESIGN.md` (repo root) |
> | Event posters / social graphics / image generation | `ux-chats-app/imagery-system/PRODUCT.md` | `ux-chats-app/imagery-system/DESIGN.md` |
> 
> The imagery system **extends** the root DESIGN.md — it inherits all base tokens (colors, type, shadows) and adds poster-scale components and composition rules. When building imagery, read both: root DESIGN.md for tokens, imagery DESIGN.md for poster components and canvas specs.
> 
> **Architecture:** No vanilla HTML/CSS — everything runs through the React app.
>
> - Pages: `ux-chats-app/src/App.tsx` (route `/`) and `BecomeAGuest.tsx` (route `/become-a-guest`)
> - Components: `ux-chats-app/src/components/` (Button, Tag, Footer)
> - Styles: `ux-chats-app/src/styles/` (modular CSS files — edit the file that matches the section you're working on)
> - Design tokens: `ux-chats-app/src/styles/tokens.css`
> - Deployment: GitHub Actions builds `ux-chats-app/` and deploys `dist/` to GitHub Pages

---

## Brand in one line

A casual UX community where designers can be **raw and real** — no formal attire, no stiff
intros. The design should feel like a hand-made zine / sticker board: thick black outlines,
hard offset shadows, rotated "stickers", chunky display type, warm cream paper. Energetic,
human, a little irreverent. **Never** glossy gradients, glassmorphism, or generic dark-SaaS.

---

## Design tokens (CSS custom properties in `src/styles/tokens.css`)

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

## Style file reference

Edit the file that matches the section you're working on:


| File                      | Contains                                                                        |
| ------------------------- | ------------------------------------------------------------------------------- |
| `src/styles/tokens.css`   | `:root` design tokens (colors, shadows, base font)                              |
| `src/styles/base.css`     | Layout utilities (`.display`, `.wrap`, `.kicker`, `.lead`), `.reveal` animation |
| `src/styles/nav.css`      | Sticky nav, hamburger, mobile menu                                              |
| `src/styles/hero.css`     | Hero (headline, CTA, call window), stickers, float keyframes                    |
| `src/styles/sections.css` | Marquee, about, hosts, events, crew, CTA band, footer, floating join            |
| `src/styles/guest.css`    | Guest page (hero, details, form, signs, FAQ)                                    |


Imports chain: `index.css` → `tokens.css` | `App.css` → `base.css` + `nav.css` + `hero.css` + `sections.css` + `guest.css`

---

## Page structure (order matters)

1. **Sticky nav** — logo (image in a tilted outlined tile + "UX Chats" wordmark) + links + Join Discord button.
2. **Hero** — two columns: headline ("Be raw. Be real. Belong.") + CTA on the left; a tilted
  "UX Chat · Live" call window (face tiles + "your seat →") with stickers on its corners on the right.
3. **Marquee** — scrolling phrases.
4. **Events** (`#events`) — leads the content (events are the prime focus): featured "Next up"
  event card (purple date block + details + Luma buttons) and a "Last event" past card.
5. **Two kinds of night** (`#event-formats`) — the format cards (paid Special Guest Nights /
  free Community Nights, marked with `entry-tag` pills) + games row.
6. **What is UX Chats** (`#about`) — copy + chips (who it's for) on the left, tilted polaroid collage on the right.
7. **Meet your hosts** (`#host`) — two alternating founder rows (photo + bio + yellow quote
  callout + fact chips), shared philosophy line centered below.
8. **Real people. Real fun.** (`.crew`) — the real community call screenshot framed as a taped polaroid.
9. **Testimonials** (`#testimonials`) — member quotes + submission form.
10. **Join CTA band** — solid ink background, big headline, Discord CTA (secondary).
11. **Footer** — ink background, logo + tagline + handle.

---

## Voice & copy

- Casual, warm, a little cheeky. Second person. Short punchy lines.
- Core phrases to reuse: "raw and real", "take off your tie", "no stiff intros",
"Come as you are. Leave your LinkedIn voice at the door."
- Emoji are **allowed and on-brand here** (👋 ✦ 🎮 🤔 🎨 ⚡) — this is a casual community, unlike
most enterprise systems. Use them sparingly as accents, not decoration spam.

---

## The one CTA that matters

**Events** are the primary action on the home page. The main CTA is "Events" / "See the events"
pointing to the Luma events list `https://luma.com/TheUXChats` — keep it as the primary button in
the nav (purple) and hero (purple, big), and lead with the Events section directly under the hero.

Joining the **Discord** (`https://discord.com/invite/RamJrPZpYd`) is now the *secondary* action —
a plain link in the nav and a yellow secondary button in the hero — and remains the closing
CTA band (`CTABand`) and the floating join button on the Become-a-Guest / Design System pages.

The specific next event registers on Luma; the calendar is `https://luma.com/TheUXChats`.

---

## Do / Don't

**Do:** thick ink outlines, hard offset shadows, rotated stickers, cream paper, chunky
Bricolage headlines, alternating section tints, `.reveal` on new content, pill buttons that
translate on press.
**Don't:** soft/blurred shadows, hairline borders, gradient page backgrounds, glassmorphism,
Inter/Roboto/Arial, tiny text (<14px body), or a dark generic-SaaS look. Don't add hard
attendance counts that make the community look small.

---

