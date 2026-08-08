# Image Generation Tests Report

**Date:** 2026-08-06

---

## Test 1: "From Designer to Design AI Builder" — Special Guest Night with John Rodrigues

**Generator:** Path 1 — direct coded (Imagery design system)
**Target:** 1:1 square (2000×2000px) for Luma hero
**Reference:** `figma-mcp-image.png`

### Process

1. **Intake** — conversational brief-building via `ux-chats-image-generator`. Collected event title, format (Special Guest Night), speaker info (John Rodrigues, AI Design Engineer & Founder of Human AI Studio), headshot, canvas size, and composition reference.
2. **Background removal** — used `rembg` (Python) to strip John's headshot background → `john_rodrigues_nobg.png`.
3. **Poster construction** — wrote HTML/CSS following Imagery DESIGN.md tokens (Bricolage Grotesque 800, 3-5px ink borders, hard shadows, sticker components).
4. **Rendering** — captured both at 2000×2000px via Chrome DevTools MCP with viewport emulation (DPR 1).



### Light Mode

Light mode poster

### Dark Mode

Dark mode poster

### Feedback: FAIL (0/10)

- **Wrong proportions** — composition doesn't match the reference poster style.
- **Not enough visual elements** — too sparse, missing the density of a proper zine poster.
- **Used buttons** — the CTA was rendered as a button shape, which has no place on a static image (can't click it).
- **Didn't use headline type components** — didn't reference the typography treatments from `guest_carl-1.png` ("What Recruiters Really Think").
- **Overall boring** — lacks the energy, sticker density, and physical collage feel of the existing gallery.



### Lessons

- Reference `guest_carl-1.png` as the composition target for 
- Special Guest Night posters.
- Never render button shapes on images.
- Use the headline component treatments from existing posters verbatim.
- Increase visual density — more stickers, more layering, more of the "printed flyer" physicality.

