import { useState, useEffect } from "react";
import {
  Button, Tag, Footer, NavBar, Marquee,
  Badge, Sticker, Card, Kicker, Polaroid, Heading, Text,
  EventCard, TestimonialCard, TestimonialForm,
  TiltedTitle, TiltedBadge, CurvedDivider,
  DotCluster, Star, PartnershipLockup, HostPill, BackgroundBlob, Sparkle,
} from "./components";
import "./App.css";

/* ───────────────────────────────────────
   Types & constants
   ─────────────────────────────────────── */

type TopTab = "website" | "imagery";
type SubTab = "design-system" | "gallery";

interface ImageEntry {
  src: string;
  alt: string;
  subcategory?: string;
  filterTags?: string[];
}

interface Category {
  id: string;
  label: string;
  subcategories?: string[];
  images: ImageEntry[];
}

const CATEGORIES: Category[] = [
  {
    id: "community-nights",
    label: "Community Nights",
    subcategories: ["Game Nights", "Challenges", "General"],
    images: [
      { src: "/library/cm--aug-13.png", alt: "Community Night Aug 13", subcategory: "General" },
      { src: "/library/cm--game-night.png", alt: "Game night poster", subcategory: "Game Nights" },
      { src: "/library/cm--challenge.png", alt: "Event challenge graphic", subcategory: "Challenges" },
      { src: "/library/cm--defend-your-case.png", alt: "Defend Your Case event", subcategory: "Challenges" },
    ],
  },
  {
    id: "special-guest-nights",
    label: "Special Guest Nights",
    subcategories: ["Talks", "Workshops"],
    images: [
      { src: "/library/sg--workshop-romit.png", alt: "Workshop with Romit", subcategory: "Workshops" },
      { src: "/library/sg--carl.png", alt: "Special guest Carl", subcategory: "Talks" },
      { src: "/library/sg--what-recruiters-really-think.png", alt: "What Recruiters Really Think with Carl Wheatley", subcategory: "Talks" },
      { src: "/library/x--team-uxchats.png", alt: "Team TUXChats event poster", subcategory: "Talks" },
      { src: "/library/sg--john-sp.png", alt: "John Rodrigues — Special Guest Night poster", subcategory: "Talks" },
      { src: "/library/sg--earl-case-study-light.png", alt: "Earl Friedberg — The Perfect Case Study (light)", subcategory: "Talks" },
      { src: "/library/sg--earl-case-study-dark.png", alt: "Earl Friedberg — The Perfect Case Study (dark)", subcategory: "Talks" },
      { src: "/library/sg--mrinali-kamath.png", alt: "Mrinali Kamath — Design Engineering: the new role to hire for?", subcategory: "Talks" },
    ],
  },
  {
    id: "headshots",
    label: "Headshots",
    images: [
      { src: "/library/headshot_john-rodrigues.jpeg", alt: "John Rodrigues headshot" },
      { src: "/library/headshot_earl-friedberg.png", alt: "Earl Friedberg headshot" },
      { src: "/library/headshot_mrinali-kamath.png", alt: "Mrinali Kamath headshot" },
    ],
  },
  {
    id: "partnerships",
    label: "Partnerships",
    images: [
      { src: "/library/p--figma.png", alt: "Figma partnership announcement" },
    ],
  },
];

/* ───────────────────────────────────────
   Design system data (website)
   ─────────────────────────────────────── */

const COLORS = [
  { name: "--cream", val: "#FBF3DD", desc: "Page background (paper)", css: "var(--cream)" },
  { name: "--cream-2", val: "#F6E9C4", desc: "Alternating section tint", css: "var(--cream-2)" },
  { name: "--ink", val: "#1C1430", desc: "Text, borders, shadows", css: "var(--ink)" },
  { name: "--purple", val: "#6D28D9", desc: "Primary brand", css: "var(--purple)" },
  { name: "--purple-deep", val: "#4C1D95", desc: "Darker brand accent", css: "var(--purple-deep)" },
  { name: "--yellow", val: "#FFCB33", desc: "Accent / highlight / primary CTA", css: "var(--yellow)" },
  { name: "--pink", val: "#FF6FA5", desc: "Sticker accent", css: "var(--pink)" },
  { name: "--sky", val: "#8ECBFF", desc: "Sticker / card accent", css: "var(--sky)" },
];

const BORDERS = [
  { name: "--line", css: "var(--line)", desc: "3px solid var(--ink)" },
  { name: "--line-thin", css: "var(--line-thin)", desc: "2px solid var(--ink)" },
];

const SHADOWS = [
  { name: "--shadow", css: "var(--shadow)", desc: "6px 6px 0 var(--ink)" },
  { name: "--shadow-lg", css: "var(--shadow-lg)", desc: "10px 10px 0 var(--ink)" },
];

const SPACING_SCALE = {
  desktop: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96],
  mobile: [4, 12, 20, 28, 36, 44, 52, 60],
};

/* ───────────────────────────────────────
   Imagery design system data
   ─────────────────────────────────────── */

const IMAGERY_COLORS = [
  { token: "--cream", hex: "#FBF3DD", role: "Light-mode canvas background" },
  { token: "--cream-2", hex: "#F6E9C4", role: "Light-mode secondary fields, sticker fills" },
  { token: "--ink", hex: "#1C1430", role: "All text on light, dark-mode canvas, all borders" },
  { token: "--purple", hex: "#6D28D9", role: "Title accents, dark-mode light-source fields" },
  { token: "--purple-deep", hex: "#4C1D95", role: "Dark-mode background fields, shadow on purple" },
  { token: "--yellow", hex: "#FFCB33", role: "Primary CTA fill, accent stickers, dark-mode highlights" },
  { token: "--pink", hex: "#FF6FA5", role: "Sticker accent, speaker name highlights" },
  { token: "--sky", hex: "#8ECBFF", role: "Sticker accent, secondary badges, dark-mode links" },
];

const IMAGERY_TYPE = [
  { role: "Hero title", family: "Bricolage Grotesque", weight: 800, size: "100–180px", line: 0.88, tracking: "-0.03em" },
  { role: "Subtitle", family: "Bricolage Grotesque", weight: 800, size: "48–72px", line: 0.92, tracking: "-0.02em" },
  { role: "Speaker name", family: "Hanken Grotesk", weight: 700, size: "36–52px", line: 1.1, tracking: "-0.01em" },
  { role: "Date/number", family: "Bricolage Grotesque", weight: 800, size: "40–64px", line: 0.92, tracking: "-0.02em" },
  { role: "Body copy", family: "Hanken Grotesk", weight: 500, size: "22–28px", line: 1.35, tracking: "0" },
  { role: "Label/kicker", family: "Hanken Grotesk", weight: 800, size: "16–18px", line: 1.2, tracking: "+0.14em" },
  { role: "CTA text", family: "Hanken Grotesk", weight: 800, size: "20–24px", line: 1.0, tracking: "0" },
];

const IMAGERY_BORDERS = [
  { token: "--line", value: "3px solid var(--ink)", usage: "Internal borders, sticker edges, photo frames" },
  { token: "--line-heavy", value: "5px solid var(--ink)", usage: "Poster outer border — frame the entire canvas" },
  { token: "--line-thin", value: "2px solid var(--ink)", usage: "Dividing lines, subtle internal separators (rare)" },
];

const IMAGERY_SHADOWS = [
  { token: "--shadow", value: "6px 6px 0", usage: "Stickers, small badges" },
  { token: "--shadow-lg", value: "10px 10px 0", usage: "Photos, polaroid frames, large accent blocks" },
  { token: "--shadow-xl", value: "14px 14px 0", usage: "Poster outer frame" },
];

const IMAGERY_CANVASES = [
  { format: "Square (default)", dims: "2000 × 2000px", use: "Instagram feed, general event poster" },
  { format: "Story", dims: "1080 × 1920px", use: "Instagram / Facebook stories" },
  { format: "Banner", dims: "2400 × 1256px", use: "Luma event header, Twitter banner" },
  { format: "Wide", dims: "2000 × 1400px", use: "Luma event cover, rectangular posters" },
];

const IMAGERY_SPACING = [
  { token: "--ps-pad", value: "64px", usage: "Internal canvas padding (inside the border frame)" },
  { token: "--ps-gap", value: "32px", usage: "Gap between composition zones" },
  { token: "--ps-gap-sm", value: "20px", usage: "Gap within a zone (e.g., date and time)" },
  { token: "--ps-gap-lg", value: "80px", usage: "Large breathing room (between title and details)" },
  { token: "--ps-sticker-offset", value: "-12px", usage: "How far a sticker overhangs its anchor element" },
];

// Mirrors imagery-system/library/manifest.json — keep both in sync when adding
// or editing a component. Duplicated here (rather than imported) to match this
// file's existing pattern of hardcoded design-system data arrays.
const LIBRARY_COMPONENTS = [
  {
    name: "pen-nib",
    file: "/library-components/icons/pen-nib.svg",
    description: "Vector pen-tool nib with anchor points and bezier handles — a design-tool motif.",
    tags: ["design-tool", "case-study", "ux-process"],
    size: "180–260px on a 2000px poster canvas",
  },
  {
    name: "browser-wireframe",
    file: "/library-components/icons/browser-wireframe.svg",
    description: "Browser chrome with wireframe content (image placeholder, text lines, a CTA bar) and a cursor.",
    tags: ["design-tool", "case-study", "ux-process", "product"],
    size: "220–320px on a 2000px poster canvas",
  },
  {
    name: "ai-chip",
    file: "/library-components/icons/ai-chip.svg",
    description: "Rounded chip with circuit-leg pins and a baked-in 'AI' label.",
    tags: ["ai", "tech", "future-of-design"],
    size: "140–200px on a 2000px poster canvas",
  },
  {
    name: "calendar",
    file: "/library-components/icons/calendar.svg",
    description: "Simple grid calendar with binding rings.",
    tags: ["date", "logistics"],
    size: "100–160px",
    deprecated: "Never add date/time badges to poster images (date/time go in social copy instead) — confirm before using this for anything beyond a non-literal 'scheduling' motif.",
  },
  {
    name: "star-burst",
    file: "/library-components/icons/star-burst.svg",
    description: "Two-point sparkle/star cluster (one large, one small).",
    tags: ["special-guest-night", "sparkle"],
    size: "40–100px, scattered 2–3x per poster in empty corners",
    restriction: "Special Guest Night posters with a real speaker headshot only. The parent 'no stars' rule still governs every other poster type.",
  },
  {
    name: "curved-arrow",
    file: "/library-components/icons/curved-arrow.svg",
    description: "Hand-drawn curved annotation arrow, pointing from a label toward the element it references.",
    tags: ["annotation", "general"],
    size: "120–260px depending on the distance it needs to span",
  },
];

const IMAGERY_PRINCIPLES = [
  { num: "1", title: "It must feel printed.", body: "Thick borders, hard shadows, slight rotation, paper texture — every visual decision serves the physical illusion. If it looks like a screenshot of a div, it's wrong." },
  { num: "2", title: "Typography leads.", body: "The event title in Bricolage Grotesque at 100px+ is the dominant visual element. Everything else supports it. Body copy is short — this is a poster, not an article." },
  { num: "3", title: "The parent brand is non-negotiable.", body: "All tokens from the main UX Chats DESIGN.md apply. No new colors, no new typefaces, no new shadow styles. The imagery system extends, it does not fork." },
  { num: "4", title: "Composition over decoration.", body: "A well-placed sticker and a bold headline do more work than six decorative elements. Negative space is part of the composition." },
  { num: "5", title: "Config-driven, not template-cramped.", body: "A poster is a configuration object (title, date, speaker, photo, CTA) + a composition pattern. The system provides the composition; the event provides the content." },
];

/* ───────────────────────────────────────
   Helpers
   ─────────────────────────────────────── */

function fileName(path: string): string {
  return path.split("/").pop() ?? path;
}

function Section({ children, tint }: { children: React.ReactNode; tint?: boolean }) {
  return (
    <section className="ds-section" style={tint ? { background: "var(--cream-2)" } : undefined}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/* ───────────────────────────────────────
   Website > Design System
   ─────────────────────────────────────── */

function WebsiteDesignSystem() {
  return (
    <div className="tab-content">
      {/* Colors */}
      <Section tint>
        <h2 className="display sec">Colors</h2>
        <div className="ds-swatches">
          {COLORS.map((c) => (
            <div className="ds-swatch" key={c.name}>
              <div className="swatch" style={{ background: c.css }} />
              <div className="info">
                <div className="name">{c.name}</div>
                <div className="val">{c.val}</div>
                <div style={{ fontSize: 13, opacity: 0.7, marginTop: 2 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Borders & Shadows */}
      <Section>
        <h2 className="display sec">Borders &amp; Shadows</h2>
        <div className="ds-demos">
          {BORDERS.map((b) => (
            <div className="ds-demo" key={b.name}>
              <h4>{b.name}</h4>
              <div className="preview" style={{ border: b.css as string, background: "var(--cream)" }} />
              <div className="caption">{b.desc}</div>
            </div>
          ))}
          {SHADOWS.map((s) => (
            <div className="ds-demo" key={s.name}>
              <h4>{s.name}</h4>
              <div className="preview" style={{ background: "var(--cream)", borderRadius: 12 }}>
                <div style={{ width: "80%", height: "100%", margin: "0 auto", background: "#fff", borderRadius: 10, boxShadow: s.css as string }} />
              </div>
              <div className="caption">{s.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section tint>
        <h2 className="display sec">Typography</h2>
        <div className="ds-type-grid">
          <div className="type-family">
            <h3 className="display" style={{ fontSize: 22 }}>Bricolage Grotesque</h3>
            <div className="sub">Display / headings · weight 800</div>
            {[
              { size: "clamp(50px, 8.4vw, 108px)", text: "Hero h1", tag: "h1" },
              { size: "clamp(36px, 5.5vw, 64px)", text: "Section h2", tag: "h2" },
              { size: "clamp(30px, 4vw, 46px)", text: "Founder / card h3", tag: "h3" },
              { size: "clamp(22px, 2.8vw, 34px)", text: "Event card title", tag: "h3" },
              { size: "clamp(19px, 2.2vw, 24px)", text: "Philosophy line", tag: "p" },
            ].map((s) => (
              <div className="type-specimen" key={s.size}>
                <span className="samp" style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: s.size as string, lineHeight: 0.92, letterSpacing: "-0.02em" }}>
                  {s.text}
                </span>
                <span className="meta">{s.size}</span>
              </div>
            ))}
          </div>

          <div className="type-family">
            <h3 style={{ fontFamily: '"Hanken Grotesk"', fontWeight: 800, fontSize: 22 }}>Hanken Grotesk</h3>
            <div className="sub">Body / UI</div>
            {[
              { weight: 400, size: "16px", text: "Body copy (weight 400)" },
              { weight: 500, size: "16px", text: "Body copy (weight 500) — default" },
              { weight: 600, size: "16px", text: "Body copy (weight 600)" },
              { weight: 700, size: "16px", text: "Body copy (weight 700)" },
              { weight: 800, size: "13px", text: "Kicker / eyebrow (weight 800)", extra: "text-transform: uppercase; letter-spacing: .14em; color: var(--purple)" },
              { weight: 800, size: "15px", text: "Button label (weight 800)" },
              { weight: 500, size: "19px", text: "Lead / larger body (weight 500)", extra: "line-height: 1.55" },
            ].map((s) => (
              <div className="type-specimen" key={`${s.weight}-${s.size}`}>
                <span className="samp" style={{ fontFamily: '"Hanken Grotesk"', fontWeight: s.weight, fontSize: s.size, ...(s.extra ? Object.fromEntries(s.extra.split(";").filter(Boolean).map((p) => p.trim().split(":").map((x) => x.trim()))) : {}) }}>
                  {s.text}
                </span>
                <span className="meta">weight {s.weight} · {s.size}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Atomic design: Atoms */}
      <Section>
        <h2 className="display sec">Atomic design</h2>
        <p className="lead" style={{ maxWidth: 600, marginBottom: 32 }}>
          Our component hierarchy, from smallest building blocks to composed layout molecules.
        </p>

        <h3 className="display" style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 24 }}>Atoms</h3>
        <div className="ds-recipes">
          <div className="ds-recipe">
            <h3 className="display">&lt;Badge /&gt;</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <Badge>Design System</Badge>
              <Badge>Free to join</Badge>
              <Badge>A casual community</Badge>
            </div>
            <p className="ds-meta">Green dot + label · inline badge atom</p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;Kicker /&gt;</h3>
            <Kicker>Section eyebrow label</Kicker>
            <Kicker as="p" style={{ marginTop: 8 }}>Uppercase · letter-spaced · purple</Kicker>
            <p className="ds-meta">Configurable <code>as</code> element</p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;Sticker /&gt;</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              <Sticker variant="pink">pink</Sticker>
              <Sticker variant="sky">sky</Sticker>
              <Sticker variant="yellow">yellow</Sticker>
              <Sticker variant="pink" pill>pill shape</Sticker>
              <Sticker variant="yellow" rotate={5}>5° tilt</Sticker>
            </div>
            <p className="ds-meta">3 color variants · optional pill shape · custom rotation</p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;Card /&gt;</h3>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <Card><h4 className="display" style={{ fontSize: 16 }}>Default</h4><p>White bg, hard shadow</p></Card>
              <Card variant="purple"><h4 className="display" style={{ fontSize: 16 }}>Purple</h4><p>Purple fill, cream text</p></Card>
            </div>
            <p className="ds-meta">2 variants · configurable <code>as</code> element</p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;Polaroid /&gt;</h3>
            <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
              <Polaroid src="/img/host-jacki.png" alt="Demo" caption="Jacki" rotate={-2} />
              <Polaroid src="/img/host-romit.jpg" alt="Demo" caption="Romit" rotate={3} />
            </div>
            <p className="ds-meta">White frame · thick outline · random or explicit tilt</p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;Heading /&gt;</h3>
            <Heading level="h4" style={{ fontSize: 18 }}>Heading level 1</Heading>
            <Heading level="h2" style={{ fontSize: 22 }}>Heading level 2 (.display)</Heading>
            <Heading level="h3" style={{ fontSize: 18, marginTop: 8 }} display={false}>Heading level 3 (plain)</Heading>
            <p className="ds-meta">Configurable level · display font toggle · inline style passthrough</p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;Text /&gt;</h3>
            <Text>Default paragraph text.</Text>
            <Text as="span" className="lead">Rendered as a span · </Text>
            <Text as="small" style={{ opacity: 0.65 }}>Small secondary.</Text>
            <p className="ds-meta">Configurable <code>as</code> element · style and className passthrough</p>
          </div>
        </div>
      </Section>

      {/* Atomic design: Molecules */}
      <Section tint>
        <h3 className="display" style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 24 }}>Molecules</h3>
        <div className="ds-recipes">
          <div className="ds-recipe">
            <h3 className="display">&lt;Marquee /&gt;</h3>
            <Marquee items={["real talk", "game night", "craft night"]} />
            <p className="ds-meta">Purple scrolling band · infinite loop · items as <code>string[]</code></p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;NavBar /&gt;</h3>
            <p>Sticky header with logo wordmark, nav links, Join Discord button, and mobile hamburger menu.</p>
            <p className="ds-meta">Self-contained mobile state · props: discordHref (optional)</p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;Hero /&gt;</h3>
            <p>Full hero section: badge, "Be raw. Be real. Belong." headline, CTA + schedule, call window with face tiles, and positioned stickers.</p>
            <p className="ds-meta">Props: discordHref (optional) · see <a href="/" style={{ textDecoration: "underline", fontWeight: 800 }}>homepage</a></p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;CTABand /&gt;</h3>
            <p>Dark CTA band with "Come hang out in the Discord." heading and yellow join button. Rendered as part of Footer.</p>
            <p className="ds-meta">Props: discordHref (optional)</p>
          </div>
        </div>
      </Section>

      {/* Organisms */}
      <Section tint>
        <h3 className="display" style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 24 }}>Organisms</h3>

        <div className="ds-organism">
          <h3 className="display">&lt;EventCard variant="upcoming" /&gt;</h3>
          <EventCard
            variant="upcoming"
            data={{
              month: "Jun", day: "17", time: "5:00 PM PST",
              tag: "Community Night · Online", tagVariant: "sky" as const,
              entryTag: "premium event",
              title: "The UX Chats",
              description: "Games, conversations, and great company — our regular community night open to all.",
              meta: [
                { icon: "🕐", text: "5:00 PM PST" },
                { icon: "💬", text: "In our Discord" },
                { icon: "⏱", text: "1.5 hours" },
              ],
              buttons: [{ label: "Register on Luma →", href: "https://luma.com/TheUXChats", variant: "yellow" as const }],
            }}
          />
          <p className="ds-meta">Compound card: date block · tag · title · meta · action buttons</p>
        </div>

        <div className="ds-organism">
          <h3 className="display">&lt;EventCard variant="past" /&gt;</h3>
          <EventCard
            variant="past"
            data={{
              month: "Jun", day: "03", time: "5:00 PM PST",
              tag: "Special Guest Night · Online",
              entryTag: "free entry",
              title: "How to Use Claude Code to Design Multiple Products",
              description: "Hands-on look at designing with AI tools — ~40-min talk + open Q&A.",
              meta: [
                { icon: "🕐", text: "5:00 PM PST" },
                { icon: "👥", text: "29 attended" },
              ],
              buttons: [{ label: "See all events", href: "https://luma.com/TheUXChats", variant: "line" as const }],
            }}
          />
          <p className="ds-meta">Past variant · dimmed style · single action button</p>
        </div>

        <div className="ds-organism">
          <h3 className="display">&lt;TestimonialCard /&gt;</h3>
          <div style={{ maxWidth: 360 }}>
            <TestimonialCard
              data={{
                quote: "UX Chats is genuinely the warmest design community I've found. Real conversations, zero pretense.",
                name: "Jordan", role: "Product Designer", platform: "discord" as const,
                avatar: "J", avatarColor: "purple" as const,
                sticker: { label: "✦ fave", color: "yellow" as const },
              }}
              index={0}
            />
          </div>
          <p className="ds-meta">Card with avatar · quote · platform icon · optional sticker</p>
        </div>

        <div className="ds-organism">
          <h3 className="display">&lt;TestimonialForm /&gt;</h3>
          <div style={{ maxWidth: 480 }}>
            <TestimonialForm />
          </div>
          <p className="ds-meta">Inline form · name, role, quote fields · validation · success state</p>
        </div>
      </Section>

      {/* Buttons & Tags */}
      <Section>
        <h3 className="display" style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 24 }}>Button &amp; Tag</h3>
        <div className="ds-recipes">
          <div className="ds-recipe">
            <h3 className="display">&lt;Button /&gt;</h3>
            <div className="ds-btn-row">
              <Button variant="yellow" size="md">Primary</Button>
              <Button variant="primary" size="md">Secondary</Button>
              <Button variant="line" size="md">Outline</Button>
              <Button variant="yellow" size="lg">Large CTA</Button>
            </div>
            <p className="ds-meta">Pill shape · 3px ink outline · hard offset shadow · press-translates</p>
          </div>

          <div className="ds-recipe">
            <h3 className="display">&lt;Tag /&gt;</h3>
            <div className="ds-tag-row">
              <Tag variant="yellow">Design</Tag>
              <Tag variant="sky">Research</Tag>
              <Tag variant="pink">Frontend</Tag>
              <Tag variant="default">Strategy</Tag>
            </div>
            <p className="ds-meta">Outlined chip · hard shadow · slight random rotation</p>
          </div>
        </div>
      </Section>

      {/* Spacing reference */}
      <Section tint>
        <h2 className="display sec">Spacing scale</h2>
        <p style={{ marginBottom: 16, fontWeight: 500, opacity: 0.8, maxWidth: 560 }}>
          8pt grid for desktop / tablet · 4pt supplement for mobile. All values in <strong>px</strong>.
        </p>

        <h3 className="display" style={{ fontSize: "clamp(18px, 2.2vw, 22px)", marginBottom: 16 }}>Desktop &amp; tablet <span style={{ opacity: .45, fontWeight: 500, fontFamily: '"Hanken Grotesk"', fontSize: 14 }}>8pt grid</span></h3>
        <div className="ds-spacing">
          {SPACING_SCALE.desktop.map((n) => (
            <div className="ds-space" key={`d-${n}`}>
              <div className="bar" style={{ width: n > 80 ? 64 : n }} />
              <span className="label">{n}px</span>
            </div>
          ))}
        </div>

        <h3 className="display" style={{ fontSize: "clamp(18px, 2.2vw, 22px)", marginTop: 36, marginBottom: 16 }}>Mobile supplement <span style={{ opacity: .45, fontWeight: 500, fontFamily: '"Hanken Grotesk"', fontSize: 14 }}>4pt grid</span></h3>
        <div className="ds-spacing">
          {SPACING_SCALE.mobile.map((n) => (
            <div className="ds-space" key={`m-${n}`}>
              <div className="bar" style={{ width: n > 60 ? 60 : n < 8 ? 8 : n }} />
              <span className="label">{n}px</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Utility classes */}
      <Section>
        <h2 className="display sec">Utility classes</h2>
        <div style={{ display: "grid", gap: 12, maxWidth: 700 }}>
          {[
            { class: ".display", css: 'font-family: "Bricolage Grotesque"; font-weight: 800; line-height: 0.92; letter-spacing: -0.02em;' },
            { class: ".wrap", css: "max-width: 1120px; margin: 0 auto; padding: 0 24px;" },
            { class: ".kicker", css: 'font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .14em; color: var(--purple);' },
            { class: ".sec (h2)", css: 'font-size: clamp(36px, 5.5vw, 64px);' },
            { class: ".lead", css: "font-size: 19px; font-weight: 500; line-height: 1.55;" },
            { class: ".reveal", css: "opacity: 0; translateY(26px); transition: .6s ease;" },
            { class: ".reveal.in", css: "opacity: 1; translateY(0);" },
          ].map((u) => (
            <div key={u.class} style={{ background: "#fff", border: "var(--line)", borderRadius: 14, padding: "14px 18px" }}>
              <code style={{ fontWeight: 800, fontFamily: '"Bricolage Grotesque"', fontSize: 15 }}>{u.class}</code>
              <div style={{ fontSize: 13, fontFamily: '"JetBrains Mono", monospace', opacity: 0.7, marginTop: 4, wordBreak: "break-word" }}>{u.css}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ───────────────────────────────────────
   Imagery > Design System
   ─────────────────────────────────────── */

function ImageryDesignSystem() {
  return (
    <div className="tab-content">
      {/* Overview */}
      <Section>
        <h2 className="display sec">Overview</h2>
        <div className="ds-prose">
          <p><strong>Creative North Star: "The Flyer on the Corkboard"</strong></p>
          <p>
            The UX Chats imagery system produces event posters that look like they were printed, stickered, and pinned up.
            It is the poster-making dialect of the parent sticker-zine brand — same vocabulary (thick ink outlines, hard
            shadows, chunky display type, cream paper), different medium (fixed canvas instead of scrolling viewport).
          </p>
          <p>
            Where the website <em>scrolls</em>, the poster <em>composes</em>. Every element sits in deliberate relation
            to every other element on a fixed canvas. The poster must read as a single visual gesture — bold headline
            first, details for the interested, CTA for the convinced.
          </p>
        </div>
      </Section>

      {/* Design Principles */}
      <Section tint>
        <h2 className="display sec">Design Principles</h2>
        {IMAGERY_PRINCIPLES.map((p) => (
          <div className="ds-principle" key={p.num}>
            <div className="ds-principle-num">{p.num}</div>
            <p><strong>{p.title}</strong> {p.body}</p>
          </div>
        ))}
      </Section>

      {/* Colors */}
      <Section>
        <h2 className="display sec">Colors</h2>
        <p className="lead" style={{ maxWidth: 600, marginBottom: 24 }}>
          The identical 8-color palette from the parent brand, with poster-specific guidance.
        </p>
        <div className="ds-swatches">
          {IMAGERY_COLORS.map((c) => (
            <div className="ds-swatch" key={c.token}>
              <div className="swatch" style={{ background: c.hex }} />
              <div className="info">
                <div className="name">{c.token}</div>
                <div className="val">{c.hex}</div>
                <div style={{ fontSize: 13, opacity: 0.7, marginTop: 2 }}>{c.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
          <div className="ds-do" style={{ background: "var(--cream)" }}>
            <h4>Light Mode</h4>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--cream)", border: "var(--line)" }} />
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--purple)", border: "var(--line)" }} />
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--yellow)", border: "var(--line)" }} />
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--pink)", border: "var(--line)" }} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>Cream background. Ink text. Purple and yellow primary accents with pink/sky sticker pops. Photos use polaroid-style white frames. Feels warm, open, daytime. Used for Community Nights, partnerships, general announcements.</p>
          </div>
          <div className="ds-do" style={{ background: "var(--ink)", color: "var(--cream)" }}>
            <h4 style={{ color: "var(--cream)" }}>Dark Mode</h4>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--ink)", border: "2px solid var(--cream)" }} />
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--yellow)", border: "var(--line)" }} />
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--pink)", border: "var(--line)" }} />
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--sky)", border: "var(--line)" }} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, margin: 0, opacity: 0.85 }}>Ink background. Cream/white text. Yellow, pink, and sky accents pop vividly. Photos use no frame or thin cream border. Feels dramatic, evening, premium. Used for Special Guest Nights, workshops, game nights.</p>
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section tint>
        <h2 className="display sec">Typography (Poster Scale)</h2>
        <p className="lead" style={{ maxWidth: 600, marginBottom: 24 }}>
          Poster typography operates at a much larger scale than the website. Same two typefaces, poster-specific sizing.
        </p>

        {/* Bricolage Grotesque — poster specimens */}
        <div className="type-family" style={{ marginBottom: 28 }}>
          <h3 className="display" style={{ fontSize: 22 }}>Bricolage Grotesque</h3>
          <div className="sub">Display / headings · weight 800 · poster scale 40–180px</div>
          {[
            { role: "Hero title", size: "clamp(48px, 8vw, 100px)", text: "GAME NIGHT", line: 0.88, tracking: "-0.03em" },
            { role: "Subtitle", size: "clamp(32px, 5vw, 56px)", text: "Special Guest Night", line: 0.92, tracking: "-0.02em" },
            { role: "Date / number", size: "clamp(28px, 4vw, 48px)", text: "AUG 13", line: 0.92, tracking: "-0.02em" },
          ].map((s) => (
            <div className="type-specimen" key={s.role}>
              <span className="samp" style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: s.size, lineHeight: s.line, letterSpacing: s.tracking }}>
                {s.text}
              </span>
              <span className="meta">{s.role} · {s.size}</span>
            </div>
          ))}
        </div>

        {/* Hanken Grotesk — poster specimens */}
        <div className="type-family">
          <h3 style={{ fontFamily: '"Hanken Grotesk"', fontWeight: 800, fontSize: 22 }}>Hanken Grotesk</h3>
          <div className="sub">Body / labels / UI · poster scale 16–52px</div>
          {[
            { role: "Speaker name", weight: 700, size: "clamp(24px, 3.5vw, 40px)", text: "Carl Wheatley", line: 1.1, tracking: "-0.01em" },
            { role: "Body copy", weight: 500, size: "clamp(16px, 2vw, 24px)", text: "Join us for an evening of real conversations about design, careers, and the future of UX.", line: 1.35, tracking: "0" },
            { role: "Label / kicker", weight: 800, size: "14px", text: "SPECIAL GUEST NIGHT · ONLINE", line: 1.2, tracking: "0.14em", extra: "text-transform: uppercase; color: var(--purple)" },
            { role: "CTA text", weight: 800, size: "clamp(16px, 2vw, 22px)", text: "Register on Luma →", line: 1.0, tracking: "0" },
          ].map((s) => (
            <div className="type-specimen" key={s.role}>
              <span className="samp" style={{ fontFamily: '"Hanken Grotesk"', fontWeight: s.weight, fontSize: s.size, lineHeight: s.line, letterSpacing: s.tracking, ...(s.extra ? Object.fromEntries(s.extra.split(";").filter(Boolean).map((p) => p.trim().split(":").map((x) => x.trim()))) : {}) }}>
                {s.text}
              </span>
              <span className="meta">{s.role} · weight {s.weight} · {s.size}</span>
            </div>
          ))}
        </div>

        {/* Reference table */}
        <details style={{ marginTop: 32 }}>
          <summary style={{ cursor: "pointer", fontFamily: '"Hanken Grotesk"', fontWeight: 700, fontSize: 14, opacity: 0.7 }}>
            Full poster scale reference table
          </summary>
          <div style={{ overflowX: "auto", marginTop: 14 }}>
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Family</th>
                  <th>Weight</th>
                  <th>Size</th>
                  <th>Line</th>
                  <th>Tracking</th>
                </tr>
              </thead>
              <tbody>
                {IMAGERY_TYPE.map((t) => (
                  <tr key={t.role}>
                    <td><strong>{t.role}</strong></td>
                    <td>{t.family}</td>
                    <td>{t.weight}</td>
                    <td><code>{t.size}</code></td>
                    <td>{t.line}</td>
                    <td><code>{t.tracking}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </Section>

      {/* Shapes & Borders */}
      <Section>
        <h2 className="display sec">Shapes &amp; Borders</h2>
        <div style={{ overflowX: "auto", marginBottom: 28 }}>
          <table className="ds-table">
            <thead>
              <tr><th>Token</th><th>Value</th><th>Usage</th></tr>
            </thead>
            <tbody>
              {IMAGERY_BORDERS.map((b) => (
                <tr key={b.token}><td><code>{b.token}</code></td><td><code>{b.value}</code></td><td>{b.usage}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Visual border previews */}
        <div className="ds-demos" style={{ marginBottom: 28 }}>
          {IMAGERY_BORDERS.map((b) => (
            <div className="ds-demo" key={b.token}>
              <h4>{b.token}</h4>
              <div className="preview" style={{ border: b.value, background: "var(--cream)", borderRadius: 4 }} />
              <div className="caption">{b.usage}</div>
            </div>
          ))}
        </div>

        <div className="ds-prose">
          <p><strong>The Outer Frame:</strong> Every poster has a 5px solid ink border inset from the canvas edge by 20–30px, with a 14px hard offset shadow. This is the single strongest signal that "this is a printed object."</p>
          <p><strong>Rotation:</strong> Stickers rotate ±2° to ±6°. Photos (polaroid frames) rotate ±2° to ±4°. Never rotate the outer frame or main title block.</p>
        </div>
      </Section>

      {/* Layout & Spacing */}
      <Section tint>
        <h2 className="display sec">Layout &amp; Spacing</h2>

        <h3 className="display" style={{ fontSize: "clamp(18px,2.2vw,22px)", marginBottom: 16 }}>Canvas Sizes</h3>
        <div style={{ overflowX: "auto", marginBottom: 28 }}>
          <table className="ds-table">
            <thead>
              <tr><th>Format</th><th>Dimensions</th><th>Use case</th></tr>
            </thead>
            <tbody>
              {IMAGERY_CANVASES.map((c) => (
                <tr key={c.format}><td><strong>{c.format}</strong></td><td><code>{c.dims}</code></td><td>{c.use}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="display" style={{ fontSize: "clamp(18px,2.2vw,22px)", marginBottom: 16 }}>Composition Zones</h3>
        <div className="ds-diagram">{`┌──────────────────────────────┐
│  MARGIN (30px, outer frame)  │
│  ┌────────────────────────┐  │
│  │  HEADER ZONE           │  │  ← event type tag, sticker cluster
│  │  TITLE ZONE            │  │  ← hero headline, 2-3 lines
│  │  DETAILS ZONE          │  │  ← date, time, speaker, price
│  │  IMAGE ZONE            │  │  ← speaker photo, event photo
│  │  FOOTER ZONE           │  │  ← CTA, URL, "Register on Luma"
│  └────────────────────────┘  │
│  STICKER OVERHANG ZONE       │  ← stickers that break the frame
└──────────────────────────────┘`}</div>

        <h3 className="display" style={{ fontSize: "clamp(18px,2.2vw,22px)", marginBottom: 16 }}>Spacing Scale</h3>
        <div className="ds-spacing" style={{ marginBottom: 24 }}>
          {IMAGERY_SPACING.map((s) => {
            const val = parseInt(s.value);
            const barWidth = val > 80 ? 72 : val < 12 ? 12 : val;
            return (
              <div className="ds-space" key={s.token}>
                <div className="bar" style={{ width: barWidth }} />
                <span className="label"><code>{s.token}</code><br />{s.value}</span>
              </div>
            );
          })}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="ds-table">
            <thead>
              <tr><th>Token</th><th>Value</th><th>Usage</th></tr>
            </thead>
            <tbody>
              {IMAGERY_SPACING.map((s) => (
                <tr key={s.token}><td><code>{s.token}</code></td><td><code>{s.value}</code></td><td>{s.usage}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Elevation & Shadow */}
      <Section>
        <h2 className="display sec">Elevation &amp; Shadow</h2>
        <p className="lead" style={{ maxWidth: 600, marginBottom: 24 }}>
          <strong>The Zero-Blur Rule:</strong> No shadow may have a blur radius. Every shadow is a hard offset. Soft shadows read as digital; hard shadows read as paper.
        </p>

        {/* Visual shadow demos */}
        <div className="ds-demos" style={{ marginBottom: 28 }}>
          {IMAGERY_SHADOWS.map((s) => (
            <div className="ds-demo" key={s.token}>
              <h4>{s.token}</h4>
              <div className="preview" style={{ background: "var(--cream)", borderRadius: 12 }}>
                <div style={{ width: "65%", height: "100%", margin: "0 auto", background: "#fff", borderRadius: 10, boxShadow: `${s.value} var(--ink)` }} />
              </div>
              <div className="caption">{s.usage}</div>
            </div>
          ))}
        </div>

        {/* Reference table */}
        <div style={{ overflowX: "auto" }}>
          <table className="ds-table">
            <thead>
              <tr><th>Level</th><th>Token</th><th>Offset</th><th>Usage</th></tr>
            </thead>
            <tbody>
              {IMAGERY_SHADOWS.map((s) => (
                <tr key={s.token}><td>{s.token === "--shadow" ? "1" : s.token === "--shadow-lg" ? "2" : "3"}</td><td><code>{s.token}</code></td><td><code>{s.value}</code></td><td>{s.usage}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Components */}
      <Section tint>
        <h2 className="display sec">Poster Components</h2>
        <div className="ds-recipes">
          {/* Poster Canvas */}
          <div className="ds-recipe">
            <h3 className="display">Poster Canvas</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {["1:1", "4:5", "9:16", "6:1"].map((ratio) => (
                <div key={ratio} style={{ width: 64, height: 64, border: "3px dashed var(--ink)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6 }}>
                  <span style={{ fontFamily: '"Hanken Grotesk"', fontWeight: 700, fontSize: 11 }}>{ratio}</span>
                </div>
              ))}
            </div>
            <p className="ds-meta">Canvas = the raster output's dimensions/aspect ratio only, per the platform table (Instagram, LinkedIn, story, banner). Background color and mode are chosen per-poster, not fixed to cream/ink — pastels and saturated colors are allowed as long as one accent stays intentional. There's no separate outer frame/shadow wrapped around the whole canvas the way earlier drafts of this doc implied; the generated image itself is the poster.</p>
          </div>

          {/* Title Block */}
          <div className="ds-recipe" style={{ overflow: "hidden" }}>
            <h3 className="display">Title Block</h3>
            <TiltedTitle
              strips={[
                { text: "What", bg: "var(--purple)", rotation: -3 },
                { text: "Recruiters", bg: "var(--ink)", rotation: -4 },
                { text: "Really Think", bg: "#e60067", rotation: -2 },
              ]}
            />
            <p className="ds-meta">Each word on its own colored strip · independently rotated · negative-margin overlap · Bricolage 800 · matches Figma reference design</p>
          </div>

          {/* Speaker Block */}
          <div className="ds-recipe">
            <h3 className="display">Speaker Block</h3>
            <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
              <Polaroid src="/img/host-jacki.png" alt="Speaker" caption="Host" rotate={-2} />
              <div>
                <div style={{ fontFamily: '"Hanken Grotesk"', fontWeight: 700, fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.1 }}>Jane Designer</div>
                <div style={{ fontFamily: '"Hanken Grotesk"', fontWeight: 500, fontSize: 16, opacity: 0.6, marginTop: 4 }}>Staff Product Designer at Acme</div>
              </div>
            </div>
            <p className="ds-meta">Horizontal or stacked layout · Photo: 4px border + shadow + rotation · Name: Hanken 700, 36–52px</p>
          </div>

          {/* Stickers */}
          <div className="ds-recipe">
            <h3 className="display">Stickers</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
              <Sticker variant="yellow">Free</Sticker>
              <Sticker variant="pink">Aug 13</Sticker>
              <Sticker variant="sky">New</Sticker>
              <TiltedBadge color="pink" rotation={-5} size="sm">Game Night</TiltedBadge>
              <TiltedBadge color="yellow" rotation={3} float>✦ Special</TiltedBadge>
              <TiltedBadge color="ink" rotation={-2} size="sm">Sold Out</TiltedBadge>
            </div>
            <p className="ds-meta">Sticker (website) + TiltedBadge (poster) · 3px ink border · ±2–6° rotation · Bricolage 800 · float animation on select badges</p>
          </div>

          {/* Photo / Polaroid */}
          <div className="ds-recipe">
            <h3 className="display">Photo / Polaroid</h3>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <Polaroid src="/img/host-romit.jpg" alt="Demo" caption="Speaker" rotate={-3} />
              <div style={{ width: 100, height: 100, borderRadius: 16, border: "3px solid var(--ink)", boxShadow: "8px 8px 0 var(--ink)", overflow: "hidden", background: "var(--cream-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.4 }}>photo</span>
              </div>
            </div>
            <p className="ds-meta">Polaroid frame or hard-edge tile · 3px ink border · 10px shadow · ±2–4° rotation · no stock/AI photos</p>
          </div>

          {/* Event Tag */}
          <div className="ds-recipe">
            <h3 className="display">Event Tag</h3>
            <div className="ds-tag-row">
              <Tag variant="yellow">Community Night</Tag>
              <Tag variant="sky">Workshop</Tag>
              <Tag variant="pink">Special Guest</Tag>
            </div>
            <p className="ds-meta">Pill shape · 3px border · Hanken 800 uppercase · prefix with # or ✦ · dark mode: yellow fill</p>
          </div>

          {/* CTA Block */}
          <div className="ds-recipe">
            <h3 className="display">CTA Block</h3>
            <div className="ds-btn-row">
              <Button variant="yellow" size="lg">Register on Luma →</Button>
            </div>
            <p className="ds-meta">Yellow pill · 3px ink border · 999px radius · Hanken 800 at 22px · always the last element · dark mode: same yellow button pops against ink</p>
          </div>

          {/* Decorative Elements */}
          <div className="ds-recipe">
            <h3 className="display">Decorative Elements</h3>
            <div className="imagery-demo-row" style={{ gap: 20 }}>
              <Star color="var(--yellow)" size="28px" />
              <Star color="var(--purple)" size="28px" />
              <Star color="var(--pink)" size="22px" />
              <DotCluster colors={["var(--pink)", "var(--sky)", "var(--yellow)"]} count={4} />
              <DotCluster colors={["var(--purple)", "var(--pink)"]} count={3} size={10} />
              <span style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 18 }}>
                with a{" "}
                <span style={{ textDecoration: "underline wavy var(--purple) 3px", textUnderlineOffset: "6px" }}>squiggle</span>
              </span>
            </div>
            <p className="ds-meta">Stars, dot clusters, wavy underlines · all CSS-drawn · no AI imagery or stock photos</p>
          </div>
        </div>
      </Section>

      {/* Component Library */}
      <Section>
        <h2 className="display sec">Component Library</h2>
        <p className="lead" style={{ maxWidth: 640, marginBottom: 28 }}>
          Reusable, hand-authored SVG illustrations — never AI-generated — cataloged so posters can composite
          them in by name instead of a model redrawing them slightly differently every time. Full catalog:{" "}
          <code>imagery-system/library/manifest.json</code>. See{" "}
          <code>imagery-system/library/README.md</code> for how to add a new one or rasterize an existing one
          for Path 2b compositing.
        </p>
        <div className="ds-recipes">
          {LIBRARY_COMPONENTS.map((c) => (
            <div className="ds-recipe" key={c.name}>
              <h3 className="display">{c.name}</h3>
              <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
                <img src={c.file} alt={c.name} width={72} height={72} style={{ display: "block" }} />
              </div>
              <p className="ds-meta">{c.description}</p>
              <p className="ds-meta" style={{ opacity: 0.6 }}>{c.tags.join(" · ")} · {c.size}</p>
              {c.restriction && (
                <p className="ds-meta" style={{ color: "var(--purple)" }}>⚠ {c.restriction}</p>
              )}
              {c.deprecated && (
                <p className="ds-meta" style={{ color: "var(--purple)" }}>⚠ Deprecated: {c.deprecated}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Live Poster Previews */}
      <Section>
        <h2 className="display sec">Live Previews</h2>
        <p className="lead" style={{ maxWidth: 600, marginBottom: 28 }}>
          Mini poster compositions built entirely from imagery kit components. Each one demonstrates how the components combine at poster scale.
        </p>

        <div className="ds-recipes">
          {/* Figma-reference poster: Special Guest Night */}
          <div className="ds-recipe" style={{
            position: "relative",
            background: "#d4cefc",
            minHeight: 320,
            overflow: "hidden",
          }}>
            {/* Background blobs */}
            <BackgroundBlob variant="organic" color="var(--purple)" width={180} height={180} opacity={0.1} style={{ top: -40, right: -40 }} />
            <BackgroundBlob variant="organic" color="#e60067" width={200} height={160} opacity={0.08} style={{ bottom: -40, left: -60 }} />

            {/* Sparkle accent */}
            <Sparkle color="var(--yellow)" size={28} style={{ position: "absolute", top: 20, left: 180 }} />

            {/* Floating pill tags */}
            <div style={{ position: "absolute", top: 16, right: 40 }}>
              <TiltedBadge color="blue" rotation={-4} size="sm" shadow="soft">recruiter</TiltedBadge>
            </div>
            <div style={{ position: "absolute", top: 72, left: 220 }}>
              <TiltedBadge color="pink" rotation={3} size="sm" shadow="soft">portfolio</TiltedBadge>
            </div>
            <div style={{ position: "absolute", top: 48, right: 20 }}>
              <TiltedBadge color="purple" rotation={-2} size="sm" shadow="soft">salary</TiltedBadge>
            </div>

            {/* Tilted strip title */}
            <div style={{ paddingLeft: 4, paddingTop: 20 }}>
              <TiltedTitle
                strips={[
                  { text: "What", bg: "var(--purple)", rotation: -3, fontSize: "clamp(26px, 4.5vw, 48px)" },
                  { text: "Recruiters", bg: "var(--ink)", rotation: -4, fontSize: "clamp(26px, 4.5vw, 48px)" },
                  { text: "Really Think", bg: "#e60067", rotation: -2, fontSize: "clamp(26px, 4.5vw, 48px)" },
                ]}
              />
            </div>

            {/* Host pill */}
            <div style={{ marginTop: 24, paddingLeft: 8 }}>
              <HostPill prefix="with" name="Carl Wheatley" accent="var(--purple)" />
            </div>

            <p className="ds-meta" style={{ marginTop: 20 }}>Figma-reference poster · lavender bg · organic blobs · floating pill tags · tilted strip title · host pill</p>
          </div>

          {/* Community Night poster (light mode, brand colors) */}
          <div className="ds-recipe" style={{
            position: "relative",
            background: "var(--cream)",
            minHeight: 260,
            overflow: "hidden",
          }}>
            <BackgroundBlob variant="squircle" color="var(--yellow)" width={140} height={140} opacity={0.15} style={{ top: -30, right: -20 }} />
            <Sparkle color="var(--purple)" size={20} style={{ position: "absolute", top: 12, right: 100 }} />

            <div style={{ position: "absolute", top: -4, right: -4 }}>
              <TiltedBadge color="pink" rotation={6} size="sm">Free</TiltedBadge>
            </div>

            <TiltedTitle
              strips={[
                { text: "GAME", bg: "var(--ink)", rotation: -2, fontSize: "clamp(28px, 5vw, 44px)" },
                { text: "NIGHT", bg: "var(--purple)", rotation: 3, fontSize: "clamp(28px, 5vw, 44px)" },
              ]}
            />

            <div className="imagery-demo-row" style={{ marginTop: 14 }}>
              <TiltedBadge color="sky" rotation={2} size="sm">Bring snacks</TiltedBadge>
              <DotCluster colors={["var(--pink)", "var(--yellow)"]} count={3} size={10} />
            </div>
            <div style={{ marginTop: 14 }}>
              <Button variant="yellow" size="md">Grab a Spot →</Button>
            </div>
            <p className="ds-meta">Community Night · cream bg · tilted strips · floating badges · soft blob · CTA</p>
          </div>

          {/* Partnership poster */}
          <div className="ds-recipe" style={{
            position: "relative",
            background: "#fff",
            minHeight: 220,
            overflow: "hidden",
          }}>
            <BackgroundBlob variant="droplet" color="var(--pink)" width={120} height={160} opacity={0.1} style={{ top: 20, right: 30 }} />
            <Sparkle color="var(--yellow)" size={22} style={{ position: "absolute", top: -4, right: -4 }} />

            <PartnershipLockup brandA="UX Chats" brandB="Figma" size="sm" />
            <CurvedDivider color="var(--pink)" width="40%" flip />

            <div className="imagery-demo-row" style={{ marginTop: 10 }}>
              <TiltedBadge color="purple" rotation={-3} size="sm" shadow="soft">Partnership</TiltedBadge>
              <TiltedBadge color="yellow" rotation={4} size="sm" shadow="soft">Coming Soon</TiltedBadge>
            </div>
            <p className="ds-meta" style={{ marginTop: 10 }}>Partnership lockup · droplet blob · curved divider · floating badges</p>
          </div>

          {/* Dark mode poster */}
          <div className="ds-recipe" style={{
            position: "relative",
            background: "var(--ink)",
            minHeight: 240,
            overflow: "hidden",
          }}>
            <BackgroundBlob variant="organic" color="var(--purple)" width={160} height={160} opacity={0.2} style={{ top: -30, right: -30 }} />
            <Sparkle color="var(--yellow)" size={24} style={{ position: "absolute", top: 10, right: 60 }} />

            <div style={{ position: "absolute", top: -4, left: -4 }}>
              <TiltedBadge color="yellow" rotation={-4} size="sm" shadow="soft">Special Guest</TiltedBadge>
            </div>

            <TiltedTitle
              strips={[
                { text: "UX Chats", bg: "var(--purple)", rotation: -2, fontSize: "clamp(24px, 4vw, 38px)" },
                { text: "Live", bg: "#e60067", rotation: 3, fontSize: "clamp(24px, 4vw, 38px)" },
              ]}
            />

            <div style={{ marginTop: 16 }}>
              <HostPill prefix="with" name="Jane Designer" accent="var(--yellow)" background="var(--ink)" textColor="var(--cream)" />
            </div>
            <div style={{ marginTop: 14 }}>
              <Button variant="yellow" size="md">Register on Luma →</Button>
            </div>
            <p className="ds-meta" style={{ color: "var(--cream)", opacity: 0.55 }}>Dark mode · ink bg · purple/pink strips · yellow host pill · cream text</p>
          </div>
        </div>
      </Section>

      {/* Composition Patterns */}
      <Section>
        <h2 className="display sec">Composition Patterns</h2>

        <h3 className="display" style={{ fontSize: "clamp(16px,2vw,20px)", marginBottom: 12 }}>Pattern A: Speaker-Feature (Dark Mode)</h3>
        <p className="ds-meta" style={{ marginBottom: 12 }}>For Special Guest Nights where the speaker is the draw.</p>
        <div className="ds-diagram">{`┌────────────────────────────────────┐
│  [Event Tag: Special Guest Night]  │
│                                    │
│  TITLE          ┌──────────┐       │
│  TITLE          │          │       │
│  TITLE          │  SPEAKER │       │
│                 │  PHOTO   │       │
│                 │          │       │
│                 └──────────┘       │
│  Description text here.           │
│                                    │
│              [Register on Luma →]  │
└────────────────────────────────────┘`}</div>

        <h3 className="display" style={{ fontSize: "clamp(16px,2vw,20px)", marginBottom: 12 }}>Pattern B: Event-Feature (Light Mode)</h3>
        <p className="ds-meta" style={{ marginBottom: 12 }}>For Community Nights and free entrys where the activity is the draw.</p>
        <div className="ds-diagram">{`┌────────────────────────────────────┐
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
│  [Sticker: Free]                   │
│                                    │
│           [Grab a Spot →]          │
└────────────────────────────────────┘`}</div>

        <h3 className="display" style={{ fontSize: "clamp(16px,2vw,20px)", marginBottom: 12 }}>Pattern C: Minimal (Light Mode)</h3>
        <p className="ds-meta" style={{ marginBottom: 12 }}>For partnership announcements or simple event cards.</p>
        <div className="ds-diagram">{`┌────────────────────────────────────┐
│                                    │
│  [Sticker]                         │
│                                    │
│  UX Chats                           │
│  ×                                   │
│  Partner Name                        │
│                                    │
│  Description in 2-3 lines.         │
│                                    │
│                    [Learn More →]  │
└────────────────────────────────────┘`}</div>
      </Section>

      {/* Photo Treatments */}
      <Section tint>
        <h2 className="display sec">Photo Treatments</h2>
        <p className="lead" style={{ maxWidth: 600, marginBottom: 24 }}>
          All photos must be real event photos — no stock imagery, no AI-generated faces.
        </p>
        <div className="ds-recipes">
          <div className="ds-recipe">
            <h3 className="display">Polaroid frame</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Polaroid src="/img/host-jacki.png" alt="Polaroid demo" caption="speaker" rotate={-2} />
            </div>
            <p className="ds-meta">White padding + ink border + shadow + slight rotation. For speaker portraits, crew photos.</p>
          </div>
          <div className="ds-recipe">
            <h3 className="display">Hard-edge tile</h3>
            <div style={{ width: 100, height: 100, margin: "0 auto", borderRadius: 16, border: "3px solid var(--ink)", boxShadow: "8px 8px 0 var(--ink)", background: "var(--cream-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.4 }}>photo</span>
            </div>
            <p className="ds-meta">Rounded rectangle, 3px ink border, hard shadow, no white frame. For action shots, event photos.</p>
          </div>
          <div className="ds-recipe">
            <h3 className="display">Circle cutout</h3>
            <div style={{ width: 80, height: 80, margin: "0 auto", borderRadius: "50%", border: "3px solid var(--ink)", background: "var(--sky)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.5 }}>headshot</span>
            </div>
            <p className="ds-meta">border-radius: 50%, 3px ink border. For small headshots next to names.</p>
          </div>
          <div className="ds-recipe">
            <h3 className="display">No frame</h3>
            <div style={{ width: 100, height: 70, margin: "0 auto", borderRadius: 8, background: "#2a2040", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--cream)", opacity: 0.5 }}>full bleed</span>
            </div>
            <p className="ds-meta">Full-bleed image, no border. Dark mode only — dark image edges blend with ink background.</p>
          </div>
        </div>
      </Section>

      {/* Responsive Strategy */}
      <Section>
        <h2 className="display sec">Responsive Strategy</h2>
        <div className="ds-prose">
          <p>Posters are fixed-canvas, not responsive. There is no "mobile poster." Instead, the system defines multiple canvas sizes for different distribution channels. Each canvas size is its own composition template — the same config object produces different posters by rearranging elements, not shrinking them.</p>
        </div>
        <div style={{ overflowX: "auto", marginTop: 20 }}>
          <table className="ds-table">
            <thead>
              <tr><th>Channel</th><th>Canvas</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Instagram feed</td><td><code>2000×2000px (1:1)</code></td><td>Default square poster</td></tr>
              <tr><td>Instagram story</td><td><code>1080×1920px (9:16)</code></td><td>Recomposed — title stacks vertically, photo moves below</td></tr>
              <tr><td>Luma event cover</td><td><code>2400×1256px</code></td><td>Wider composition, title + photo side by side</td></tr>
              <tr><td>Email / social preview</td><td><code>1200×630px</code></td><td>Simplified: title + date + CTA only, no photos</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Do / Don't */}
      <Section tint>
        <h2 className="display sec">Do / Don't</h2>
        <div className="ds-dodont">
          <div className="ds-do">
            <h4>Do</h4>
            <ul>
              <li>5px ink outer frame with 14px hard shadow on every poster</li>
              <li>Bricolage Grotesque 800 at 100px+ for titles</li>
              <li>Hard shadows with zero blur, always right + down</li>
              <li>At least one sticker that overhangs a border or frame</li>
              <li>Short punchy body copy (2–3 lines max)</li>
              <li>Deliberate element placement (absolute positioning, not flow)</li>
              <li>Yellow CTA button as the last visual element</li>
              <li>Real event photos only</li>
            </ul>
          </div>
          <div className="ds-dont">
            <h4>Don't</h4>
            <ul>
              <li>Soft/blurred shadows — ever</li>
              <li>Hairline borders (minimum 2px, almost always 3px+)</li>
              <li>Gradient backgrounds or gradient overlays on photos</li>
              <li>Glassmorphism, backdrop-filter, or translucent-blur effects</li>
              <li>Body text longer than 3 lines</li>
              <li>More than 3 stickers on one poster</li>
              <li>Rotation beyond ±8°</li>
              <li>AI-generated imagery or stock photos</li>
              <li>Mixing light and dark mode elements on the same canvas</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ───────────────────────────────────────
   Imagery > Gallery
   ─────────────────────────────────────── */

const FILTERS = [
  { id: "all", label: "All" },
  { id: "community-nights", label: "Community Nights" },
  { id: "special-guest-nights", label: "Special Guest Nights" },
  { id: "headshots", label: "Headshots" },
  { id: "workshops", label: "Workshops" },
  { id: "game-nights", label: "Game Nights" },
  { id: "challenges", label: "Challenges" },
  { id: "partnerships", label: "Partnerships" },
];

const ALL_IMAGES: (ImageEntry & { category: Category })[] = CATEGORIES.flatMap((cat) =>
  cat.images.map((img) => ({ ...img, category: cat }))
);

function imageMatchesFilter(img: ImageEntry & { category: Category }, filterId: string): boolean {
  if (filterId === "all") return true;
  // match by explicit filterTags
  if (img.filterTags?.includes(filterId)) return true;
  // match by category id
  if (img.category.id === filterId) return true;
  // match by subcategory (lowercased, hyphenated)
  if (img.subcategory) {
    const slug = img.subcategory.toLowerCase().replace(/\s+/g, "-");
    if (slug === filterId) return true;
  }
  return false;
}

function ImageryGallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = ALL_IMAGES.filter((img) => imageMatchesFilter(img, activeFilter));

  return (
    <div className="tab-content">
      <Section tint>
        {/* Filter bar */}
        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-chip${activeFilter === f.id ? " active" : ""}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
              {f.id !== "all" && (
                <span className="filter-chip-count">
                  {ALL_IMAGES.filter((img) => imageMatchesFilter(img, f.id)).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Image grid */}
        {filtered.length > 0 ? (
          <div className="imagery-grid">
            {filtered.map((img) => (
              <div key={img.src} className="imagery-item-wrapper">
                <a href={img.src} target="_blank" rel="noopener noreferrer" className="imagery-item">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </a>
                <div className="imagery-item-meta">
                  <span className="imagery-item-subcat">{img.category.label}</span>
                  <span className="imagery-item-filename" title={fileName(img.src)}>
                    {fileName(img.src)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="lead" style={{ textAlign: "center", padding: "40px 0", opacity: 0.6 }}>
            No images for this filter yet.
          </p>
        )}
      </Section>

      {/* Upload instructions */}
      <Section>
        <div style={{ textAlign: "center" }}>
          <Kicker as="p">Adding images</Kicker>
          <h2 className="display sec" style={{ marginBottom: 12 }}>How to add new imagery</h2>
          <p className="lead" style={{ maxWidth: 520, margin: "0 auto" }}>
            Drop your event images into{" "}
            <code style={{ background: "var(--yellow)", padding: "2px 8px", borderRadius: 6, fontWeight: 800 }}>
              public/library/
            </code>{" "}
            and add them to the{" "}
            <code style={{ background: "var(--cream-2)", padding: "2px 8px", borderRadius: 6, fontWeight: 800 }}>
              CATEGORIES
            </code>{" "}
            array in{" "}
            <code style={{ background: "var(--cream-2)", padding: "2px 8px", borderRadius: 6, fontWeight: 800 }}>
              src/Imagery.tsx
            </code>.
          </p>
        </div>
      </Section>
    </div>
  );
}

/* ───────────────────────────────────────
   Main page
   ─────────────────────────────────────── */

export default function Imagery() {
  const [showFloat, setShowFloat] = useState(false);
  const [topTab, setTopTab] = useState<TopTab>("website");
  const [websiteSubTab, setWebsiteSubTab] = useState<SubTab>("design-system");
  const [imagerySubTab, setImagerySubTab] = useState<SubTab>("gallery");

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isWebsite = topTab === "website";

  return (
    <>
      <NavBar />

      <main>
        {/* Hero */}
        <section className="ds-hero">
          <div className="wrap">
            <Tag variant="default" size="md" className="kicker">Design System</Tag>
            <h1 className="display" style={{ fontSize: "clamp(36px,6vw,72px)" }}>
              {isWebsite ? (
                <>Website<span style={{ color: "var(--purple)" }}> foundation.</span></>
              ) : (
                <>Event<span style={{ color: "var(--purple)" }}> imagery.</span></>
              )}
            </h1>
            <p>
              {isWebsite
                ? "Every color, shadow, border, font, and spacing value in one place — the complete UX Chats design system."
                : "Poster-scale design tokens, components, composition patterns, and the event graphic gallery."}
            </p>
          </div>
        </section>

        {/* Top-level tabs */}
        <nav className="top-tabs">
          <button
            className={`top-tab${topTab === "website" ? " active" : ""}`}
            onClick={() => setTopTab("website")}
          >
            Website
          </button>
          <button
            className={`top-tab${topTab === "imagery" ? " active" : ""}`}
            onClick={() => setTopTab("imagery")}
          >
            Imagery
          </button>
        </nav>

        {/* Sub-tabs */}
        <nav className="sub-tabs" style={{ marginBottom: 0 }}>
          {isWebsite ? (
            <button
              className={`sub-tab${websiteSubTab === "design-system" ? " active" : ""}`}
              onClick={() => setWebsiteSubTab("design-system")}
            >
              Design System
            </button>
          ) : (
            <>
              <button
                className={`sub-tab${imagerySubTab === "design-system" ? " active" : ""}`}
                onClick={() => setImagerySubTab("design-system")}
              >
                Design System
              </button>
              <button
                className={`sub-tab${imagerySubTab === "gallery" ? " active" : ""}`}
                onClick={() => setImagerySubTab("gallery")}
              >
                Gallery
              </button>
            </>
          )}
        </nav>

        {/* Content */}
        {topTab === "website" && websiteSubTab === "design-system" && <WebsiteDesignSystem />}
        {topTab === "imagery" && imagerySubTab === "design-system" && <ImageryDesignSystem />}
        {topTab === "imagery" && imagerySubTab === "gallery" && <ImageryGallery />}
      </main>

      <Footer />

      <div className={`float-join${showFloat ? " show" : ""}`}>
        <Button as="a" href="https://discord.com/invite/RamJrPZpYd" variant="yellow" target="_blank" rel="noopener">
          Join Discord
        </Button>
      </div>
    </>
  );
}
