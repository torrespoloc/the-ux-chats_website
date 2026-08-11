#!/usr/bin/env python3
"""Deterministically composite a real headshot, the official logo, and any
component-library icons onto a Vertex-generated poster shell. No AI calls
here — pure local image ops, so real pixels (a face, the logo, a hand-drawn
icon) end up on the poster instead of a generative model's guess at any of
them.

Run with the project venv: scripts/.venv/bin/python3 composite_poster.py ...
(created via `python3 -m venv scripts/.venv && scripts/.venv/bin/pip install pillow cairosvg`)

Usage:
  python3 composite_poster.py \
    --bg shell.png --headshot headshot.png --key-color 77,137,249 \
    --logo logo.png --mode light --out final.png \
    --component /tmp/pen-nib.png,1060,2570,300

Component PNGs must be pre-rasterized from the SVG library first — see
rasterize_svg.py and imagery-system/library/README.md.
"""

import argparse
from PIL import Image, ImageFilter, ImageChops


def chroma_key_cutout(headshot: Image.Image, key_color, tolerance=70) -> Image.Image:
    rgba = headshot.convert("RGBA")
    r0, g0, b0 = key_color
    pixels = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            dist = ((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2) ** 0.5
            if dist < tolerance:
                pixels[x, y] = (r, g, b, 0)

    # Erode the mask a couple px to eat any residual blue-tinted fringe on
    # the cutout edge, then feather it back so the edge isn't jagged.
    r, g, b, a = rgba.split()
    a = a.filter(ImageFilter.MinFilter(5))
    a = a.filter(ImageFilter.GaussianBlur(1))
    rgba = Image.merge("RGBA", (r, g, b, a))
    return rgba.crop(rgba.getbbox())


def add_outline_and_shadow(cutout: Image.Image, outline_color, shadow_color, outline_px=14, shadow_offset=16):
    alpha = cutout.split()[-1]
    dilated = alpha.filter(ImageFilter.MaxFilter(outline_px * 2 + 1))
    outline_layer = Image.new("RGBA", cutout.size, outline_color + (255,))
    outline_layer.putalpha(dilated)

    canvas = Image.new(
        "RGBA",
        (cutout.width + outline_px * 2 + shadow_offset, cutout.height + outline_px * 2 + shadow_offset),
        (0, 0, 0, 0),
    )
    shadow_layer = Image.new("RGBA", canvas.size, shadow_color + (255,))
    shadow_mask = Image.new("L", canvas.size, 0)
    shadow_mask.paste(dilated, (outline_px + shadow_offset, outline_px + shadow_offset))
    canvas = Image.composite(shadow_layer, canvas, shadow_mask)

    canvas.alpha_composite(outline_layer, (outline_px, outline_px))
    canvas.alpha_composite(cutout, (outline_px, outline_px))
    return canvas


def add_shadow_only(img: Image.Image, shadow_color, shadow_offset=10):
    alpha = img.convert("RGBA").split()[-1]
    canvas = Image.new("RGBA", (img.width + shadow_offset, img.height + shadow_offset), (0, 0, 0, 0))
    shadow_layer = Image.new("RGBA", canvas.size, shadow_color + (255,))
    shadow_mask = Image.new("L", canvas.size, 0)
    shadow_mask.paste(alpha, (shadow_offset, shadow_offset))
    canvas = Image.composite(shadow_layer, canvas, shadow_mask)
    canvas.alpha_composite(img.convert("RGBA"), (0, 0))
    return canvas


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--bg", required=True)
    p.add_argument("--headshot", required=True)
    p.add_argument("--key-color", default="77,137,249")
    p.add_argument("--logo", required=True)
    p.add_argument("--mode", choices=["light", "dark"], default="light")
    p.add_argument("--out", required=True)
    p.add_argument("--canvas-size", type=int, default=1080)
    p.add_argument("--headshot-height", type=int, default=680)
    p.add_argument("--headshot-pos", default="380,340")
    p.add_argument("--logo-size", type=int, default=150)
    p.add_argument("--logo-pos", default="40,40")
    p.add_argument(
        "--component",
        action="append",
        default=[],
        metavar="PATH,X,Y,SIZE",
        help="repeatable — an already-rasterized library component PNG (see rasterize_svg.py) "
             "to composite with a shadow at position X,Y sized to SIZE px square. "
             "Placed after the logo, in the order given.",
    )
    args = p.parse_args()

    ink = (28, 20, 48)
    white = (255, 255, 255)
    outline_color = white if args.mode == "dark" else ink
    shadow_color = white if args.mode == "dark" else ink

    bg = Image.open(args.bg).convert("RGBA").resize((args.canvas_size, args.canvas_size), Image.LANCZOS)

    key_color = tuple(int(c) for c in args.key_color.split(","))
    headshot = Image.open(args.headshot)
    cutout = chroma_key_cutout(headshot, key_color)
    scale = args.headshot_height / cutout.height
    cutout = cutout.resize((int(cutout.width * scale), args.headshot_height), Image.LANCZOS)
    headshot_sticker = add_outline_and_shadow(cutout, outline_color, ink)

    hx, hy = (int(v) for v in args.headshot_pos.split(","))
    bg.alpha_composite(headshot_sticker, (hx, hy))

    logo = Image.open(args.logo).convert("RGBA")
    logo = logo.resize((args.logo_size, args.logo_size), Image.LANCZOS)
    logo_sticker = add_shadow_only(logo, ink)
    lx, ly = (int(v) for v in args.logo_pos.split(","))
    bg.alpha_composite(logo_sticker, (lx, ly))

    for spec in args.component:
        comp_path, cx, cy, csize = spec.rsplit(",", 3)
        cx, cy, csize = int(cx), int(cy), int(csize)
        component = Image.open(comp_path).convert("RGBA")
        component = component.resize((csize, csize), Image.LANCZOS)
        component_sticker = add_shadow_only(component, ink)
        bg.alpha_composite(component_sticker, (cx, cy))

    bg.convert("RGB").save(args.out, "PNG")
    print(f"Saved: {args.out}")


if __name__ == "__main__":
    main()
