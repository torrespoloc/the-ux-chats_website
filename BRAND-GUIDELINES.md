# The UX Chats: event and social brand guidelines

Updated November 25, 2026. Use this guide for community-facing event graphics, social posts and videos. It translates the existing Luma artwork into practical defaults, with Jacki's current direction taking precedence over older, busier examples.

## The idea

The UX Chats is a casual design community for honest conversation, creative play and connection. The work should feel welcoming, human, confident and design-literate. It can be playful without being noisy. No corporate hype, stiff networking language or generic technology imagery.

## Start with these references

- Community Night: [`events/images/community-night-2026-12-03.png`](events/images/community-night-2026-12-03.png) for large title, warm paper, expressive type and an accessible invitation. [`events/images/community-night-2026-11-05.png`](events/images/community-night-2026-11-05.png) is an alternate dark, cozy treatment.
- Special Guest: [`ux-chats-app/public/library/sg--john-sp.png`](ux-chats-app/public/library/sg--john-sp.png) for a real cutout portrait, strong cut-paper headline, official mark and saturated color. [`sg--mrinali-kamath.png`](ux-chats-app/public/library/sg--mrinali-kamath.png) shows another colorway and guest treatment.
- Website tokens and type: [`ux-chats-app/src/styles/tokens.css`](ux-chats-app/src/styles/tokens.css), [`DESIGN.md`](DESIGN.md). Voice: [`content-reference/voice-and-tone.md`](content-reference/voice-and-tone.md). Poster components and production: [`ux-chats-app/imagery-system/DESIGN.md`](ux-chats-app/imagery-system/DESIGN.md).

These examples are evidence of visual character, not templates to copy literally. Several older examples are denser than the current preference: simplify them.

## Logo: use the real asset

Use the actual UX Chats logo on every branded social graphic. The square logo is [`ux-chats-app/public/img/logo.png`](ux-chats-app/public/img/logo.png); vector versions are [`ux-chats-app/public/img/ux-chats-logo.svg`](ux-chats-app/public/img/ux-chats-logo.svg) and [`ux-chats-app/public/img/ux-chats-horizontal-logo.svg`](ux-chats-app/public/img/ux-chats-horizontal-logo.svg). Choose the suitable official asset and preserve its proportions and colors. Leave breathing room; keep it legible at feed size. Do not redraw, crop, approximate, or ask an image model to invent the logo. Place the real asset in a deterministic layout/compositing step after image generation.

## Visual hierarchy and composition

1. A short, accurate, prominent heading is the visual anchor. Set actual text with a reliable text tool, not generated lettering. It should remain legible on a phone.
2. Place the official logo in a consistent, visible position, typically a top corner, without competing with the headline.
3. Add only the necessary supporting details: event date/time and guest name where relevant. Keep other information in the post caption.
4. Use one focal subject and generous open space. Choose at most two or three small supporting graphic accents, only when they add meaning. Avoid a collage of unrelated icons, decorative people, or filling every corner.
5. Use a square social canvas by default; adapt dimensions for the destination without cropping the logo, headline or face. Verify at thumbnail size and supply useful alt text.

## Color and type

The site palette supplies dependable starting values: cream `#FBF3DD`, ink `#1C1430`, purple `#6D28D9`, deep purple `#4C1D95`, yellow `#FFCB33`, pink `#FF6FA5`, and sky `#8ECBFF`. The Luma references also use bold orange, teal, navy and warm paper. Treat those as artwork-specific color directions, not exact standardized hex values. Pick one dominant ground and one or two accents. Contrast must keep copy readable.

Use Bricolage Grotesque for bold display headlines and Hanken Grotesk for supporting copy, as specified by the website. The Community Night reference pairs an impactful condensed uppercase display with expressive script; script is an optional accent, never a replacement for readability. Use short headlines, not paragraphs of text on artwork.

## Two event treatments

**Community Night:** welcoming and relaxed. Lead with “Community Night” or a real, specific theme, a clear date/time when needed, official logo, and one simple community or play motif. The cream-and-orange December artwork and cozy navy November artwork offer two viable directions. The requested simpler hierarchy takes priority over duplicating every badge or decorative object.

**Special Guest:** headline and actual guest are the heroes. Use the supplied, authorized real portrait, accurately spelled name and verified title/topic. A cutout with a white edge and hard shadow can echo the John artwork; use a restrained number of accents. Never invent a face, credential, quote, or event details.

## Voice and calls to action

Write with warmth, clear language and short, conversational lines. Speak to people as peers; be specific about a real event or idea. Avoid corporate announcements, fake urgency and invented details. A small parenthetical aside is welcome when natural. No em dashes in post copy. For the current LinkedIn campaign, invite people to join Discord to stay connected, play, keep the Wordle streak, and discover member discounts for upcoming paid events or cohorts. Verify the current invite before publishing: the repository records conflicting Discord links in [`content-reference/source-material/metadata.md`](content-reference/source-material/metadata.md). Never use private team meetings as public source material.

## Production and review

Use existing assets and the poster pipeline where practical. If generating an illustration, use it as a supporting layer, then add the real logo and exact heading separately. Do not imply an invented scene is a photograph of an actual event. Before publishing, check logo authenticity, spelling, event facts, readability, visual restraint, contrast, crop, and alt text. Review the final rendered image, not just the prompt.

## Confidence and open points

- Logo, headline hierarchy, restraint and brand tone: high confidence (explicit user direction plus existing assets and voice guide).
- Community and guest visual treatments: medium confidence (derived from multiple existing examples, which vary in palette and density). Default to the simpler direction above.
- Discord invite: unresolved conflict in existing documentation. Recommendation: verify the live site or ask an owner before using a link; then update the canonical references together.
