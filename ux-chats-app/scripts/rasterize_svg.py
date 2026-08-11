#!/usr/bin/env python3
"""Rasterize a component-library SVG icon to a transparent PNG, substituting
its themeable var(--icon-color, ...) / var(--accent-color, ...) placeholders
with concrete hex values first. Used to prepare library components
(public/library-components/icons/*.svg) for deterministic compositing onto
Path 2b poster shells via composite_poster.py.

Usage:
  python3 rasterize_svg.py \
    --svg ../public/library-components/icons/pen-nib.svg \
    --out /tmp/pen-nib.png \
    --size 400 \
    --icon-color "#FBF3DD"
"""

import argparse
import re
import cairosvg


def substitute_color_var(svg_text: str, var_name: str, hex_color: str | None) -> str:
    if not hex_color:
        return svg_text
    pattern = rf"var\(--{var_name},\s*[^)]+\)"
    return re.sub(pattern, hex_color, svg_text)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--svg", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("--size", type=int, default=400, help="output width and height in px (square)")
    p.add_argument("--icon-color", default=None, help="hex to substitute for var(--icon-color, ...); omit to keep the SVG's own default")
    p.add_argument("--accent-color", default=None, help="hex to substitute for var(--accent-color, ...); omit to keep the SVG's own default")
    args = p.parse_args()

    with open(args.svg, encoding="utf-8") as f:
        svg_text = f.read()

    svg_text = substitute_color_var(svg_text, "icon-color", args.icon_color)
    svg_text = substitute_color_var(svg_text, "accent-color", args.accent_color)

    cairosvg.svg2png(
        bytestring=svg_text.encode("utf-8"),
        write_to=args.out,
        output_width=args.size,
        output_height=args.size,
    )
    print(f"Saved: {args.out}")


if __name__ == "__main__":
    main()
