# Component Library

A catalog of reusable, hand-authored illustration components for posters — icons, textures, and decorative shapes that get **composited by name**, not regenerated from a prompt each time a poster needs one.

## Why this exists

Before this library, every decorative element (a pen-tool icon, a browser wireframe, an "AI" chip) was invented fresh by whichever image-generation path built the poster. That's how the UX Chats logo ended up hallucinated in earlier posters, and it's the same risk for any recurring illustration: ask a model to draw "a pen tool icon" twice and you get two different pens. A named component library fixes that — draw it once, name it, reuse the exact same asset every time.

## How it's organized

```
imagery-system/library/
├── manifest.json         — the catalog: name, file, description, tags, recommended size, color variables
└── README.md              — this file

public/library-components/icons/   — the actual SVG source files (public/ so the app can serve them and so
    ├── pen-nib.svg                  Path 2b's rasterizer can read them without a build step)
    ├── browser-wireframe.svg
    ├── ai-chip.svg
    ├── calendar.svg
    ├── star-burst.svg
    └── curved-arrow.svg
```

The catalog metadata lives in `imagery-system/`, but the actual SVG files live in `public/library-components/icons/` — that's the single source of truth, referenced both by the `/library` gallery page (`Imagery.tsx`) and by the rasterization script (below). `manifest.json`'s `file` field always points at the `public/`-relative path (e.g. `/library-components/icons/pen-nib.svg`).

## Format: SVG, not raster

Every component is authored as a **hand-drawn SVG**, never AI-generated. This is deliberate:

- **Pixel-perfect reuse.** An SVG scales to any size with zero quality loss and recolors with zero regeneration risk — unlike a PNG, which has to be re-run through a model (and can drift) every time you need a different size or color.
- **Matches how Path 3 already works.** The imagery system's documented pipeline (`../DESIGN.md`, `../PRODUCT.md`) is code-to-image: HTML/CSS/SVG rendered to a poster, not AI pixels. Components slot into that pipeline natively — no compositing step needed when a poster is built with Path 3.
- **Themeable.** Each icon exposes its colors as CSS custom properties (`--icon-color`, `--accent-color` where relevant) with sensible defaults, so the same pen-nib icon works on a purple poster, a blue Special Guest Night poster, or a dark-mode canvas without touching the file.

## How components get used

- **Path 3 (HTML/CSS/SVG-rendered posters):** inline the `<symbol>`/`<svg>` markup directly, set the CSS variables to match the poster's palette, and position it in the composition — same as any other coded element.
- **Path 2 / Path 2b (Vertex-generated background + deterministic composite):** rasterize the SVG to a transparent PNG at the target size first, then composite it the same way `scripts/composite_poster.py` already composites the logo and headshot (thick outline + hard shadow via `add_outline_and_shadow`, or shadow-only via `add_shadow_only` for elements that don't need an outline). Rasterization isn't wired up yet — see "Not yet built" below.
- **Path 1 (OpenAI curl):** not applicable — Path 1 doesn't have a compositing step. If a poster needs a component and is going through Path 1, either switch to Path 2b or accept that decorative elements will be prompt-generated (with the accuracy risk that implies) for that specific poster.

## Adding a new component

1. Author the SVG by hand (or trace/simplify a reference), `viewBox="0 0 100 100"` for consistency with the existing set.
2. Expose color via CSS custom properties with a default fallback (see any existing icon for the pattern), so it stays themeable rather than hardcoded to one poster's palette.
3. Add an entry to `manifest.json`: `name`, `file`, `type`, `description`, `tags`, `recommendedSize`, `colorVars`, `source`, `firstUsedIn`.
4. If the component is scoped to a specific sub-identity (e.g. `star-burst` is Special Guest Night only — see `restriction` in its manifest entry), say so explicitly. Don't let a scoped exception quietly become a global default.

## Rasterizing for Path 2b compositing

Path 2b's `composite_poster.py` works on raster PNGs, not SVGs, so a component has to be rasterized (with its colors substituted) before it can be pasted onto a poster shell. Use `scripts/rasterize_svg.py`:

```bash
# From ux-chats-app/
python3 scripts/rasterize_svg.py \
  --svg public/library-components/icons/pen-nib.svg \
  --out /tmp/pen-nib.png \
  --size 400 \
  --icon-color "#FBF3DD"
```

It substitutes the SVG's `var(--icon-color, ...)` / `var(--accent-color, ...)` placeholders with the hex values you pass (falling back to each icon's documented default if omitted), then rasterizes to a transparent PNG at the requested pixel size. Requires `cairosvg` (`pip install cairosvg`; also needs the system Cairo library — `brew install cairo` on macOS if `cairosvg` fails to import).

`composite_poster.py` then places the rasterized PNG with `--component path,x,y,size` (repeatable) — see that script's `--help` for the full flag reference. Components are composited with a shadow (no outline, since most of these are already line-art rather than solid-fill cutouts) in the order given, after the logo and headshot.

## `/library` gallery integration

The component catalog is surfaced on `/library` (`ImageryDesignSystem` in `Imagery.tsx`) as its own "Component Library" section, reading `manifest.json` and rendering each SVG live at its default colors. It's separate from the finished-poster gallery (`CATEGORIES` / `ImageryGallery`) since these are reusable building blocks, not finished graphics.
