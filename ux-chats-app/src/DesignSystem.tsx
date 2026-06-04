import { useState, useEffect } from "react";
import {
  Button, Tag, Footer, NavBar, Marquee,
  Badge, Sticker, Card, Kicker, Polaroid, Heading, Text,
  EventCard, TestimonialCard, TestimonialForm,
} from "./components";
import "./App.css";

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
  mobile:  [4, 12, 20, 28, 36, 44, 52, 60],
};

export default function DesignSystem() {
  const [showFloat, setShowFloat] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <NavBar />

      <main>
        {/* ── HERO ── */}
        <section className="ds-hero">
          <div className="wrap">
            <Tag variant="default" size="md" className="kicker">Design System</Tag>
            <h1 className="display" style={{ fontSize: "clamp(36px,6vw,72px)" }}>
              Visual design<span style={{ color: "var(--purple)" }}> tokens.</span>
            </h1>
            <p>
              Every color, shadow, border, font, and spacing value in one place.
              Edit <code style={{ background: "var(--yellow)", padding: "2px 8px", borderRadius: 6, fontWeight: 800 }}>tokens.css</code>{" "}
              and this page updates instantly via hot reload.
            </p>
          </div>
        </section>

        {/* ── COLORS ── */}
        <section className="ds-section" style={{ background: "var(--cream-2)" }}>
          <div className="wrap">
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
          </div>
        </section>

        {/* ── BORDERS & SHADOWS ── */}
        <section className="ds-section">
          <div className="wrap">
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
                  <div className="preview" style={{ background: "var(--cream)", borderRadius: 12 }}><div style={{ width: "80%", height: "100%", margin: "0 auto", background: "#fff", borderRadius: 10, boxShadow: s.css as string }} /></div>
                  <div className="caption">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TYPOGRAPHY ── */}
        <section className="ds-section" style={{ background: "var(--cream-2)" }}>
          <div className="wrap">
            <h2 className="display sec">Typography</h2>
            <div className="ds-type-grid">
              {/* Bricolage Grotesque */}
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

              {/* Hanken Grotesk */}
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
          </div>
        </section>

        {/* ── ATOMIC DESIGN: ATOMS ── */}
        <section className="ds-section">
          <div className="wrap">
            <h2 className="display sec">Atomic design</h2>
            <p className="lead" style={{ maxWidth: 600, marginBottom: 32 }}>
              Our component hierarchy, from smallest building blocks to composed layout molecules.
            </p>

            <h3 className="display" style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 24 }}>Atoms</h3>
            <div className="ds-recipes">
              {/* Badge */}
              <div className="ds-recipe">
                <h3 className="display">&lt;Badge /&gt;</h3>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <Badge>Design System</Badge>
                  <Badge>Free to join</Badge>
                  <Badge>A casual community</Badge>
                </div>
                <p className="ds-meta">Green dot + label · inline badge atom</p>
              </div>

              {/* Kicker */}
              <div className="ds-recipe">
                <h3 className="display">&lt;Kicker /&gt;</h3>
                <Kicker>Section eyebrow label</Kicker>
                <Kicker as="p" style={{ marginTop: 8 }}>Uppercase · letter-spaced · purple</Kicker>
                <p className="ds-meta">Configurable <code>as</code> element</p>
              </div>

              {/* Sticker */}
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

              {/* Card */}
              <div className="ds-recipe">
                <h3 className="display">&lt;Card /&gt;</h3>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                  <Card><h4 className="display" style={{ fontSize: 16 }}>Default</h4><p>White bg, hard shadow</p></Card>
                  <Card variant="purple"><h4 className="display" style={{ fontSize: 16 }}>Purple</h4><p>Purple fill, cream text</p></Card>
                </div>
                <p className="ds-meta">2 variants · configurable <code>as</code> element</p>
              </div>

              {/* Polaroid */}
              <div className="ds-recipe">
                <h3 className="display">&lt;Polaroid /&gt;</h3>
                <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
                  <Polaroid src="/img/host-jacki.png" alt="Demo" caption="Jacki" rotate={-2} />
                  <Polaroid src="/img/host-romit.jpg" alt="Demo" caption="Romit" rotate={3} />
                </div>
                <p className="ds-meta">White frame · thick outline · random or explicit tilt</p>
              </div>

              {/* Heading */}
              <div className="ds-recipe">
                <h3 className="display">&lt;Heading /&gt;</h3>
                <Heading level="h4" style={{ fontSize: 18 }}>Heading level 1</Heading>
                <Heading level="h2" style={{ fontSize: 22 }}>Heading level 2 (.display)</Heading>
                <Heading level="h3" style={{ fontSize: 18, marginTop: 8 }} display={false}>Heading level 3 (plain)</Heading>
                <p className="ds-meta">Configurable level · display font toggle · inline style passthrough</p>
              </div>

              {/* Text */}
              <div className="ds-recipe">
                <h3 className="display">&lt;Text /&gt;</h3>
                <Text>Default paragraph text.</Text>
                <Text as="span" className="lead">Rendered as a span · </Text>
                <Text as="small" style={{ opacity: 0.65 }}>Small secondary.</Text>
                <p className="ds-meta">Configurable <code>as</code> element · style and className passthrough</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ATOMIC DESIGN: MOLECULES ── */}
        <section className="ds-section" style={{ background: "var(--cream-2)" }}>
          <div className="wrap">
            <h3 className="display" style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 24 }}>Molecules</h3>
            <div className="ds-recipes">
              {/* Marquee */}
              <div className="ds-recipe">
                <h3 className="display">&lt;Marquee /&gt;</h3>
                <Marquee items={["real talk", "game night", "craft night"]} />
                <p className="ds-meta">Purple scrolling band · infinite loop · items as <code>string[]</code></p>
              </div>

              {/* NavBar */}
              <div className="ds-recipe">
                <h3 className="display">&lt;NavBar /&gt;</h3>
                <p>Sticky header with logo wordmark, nav links, Join Discord button, and mobile hamburger menu.</p>
                <p className="ds-meta">Self-contained mobile state · props: discordHref (optional)</p>
              </div>

              {/* Hero */}
              <div className="ds-recipe">
                <h3 className="display">&lt;Hero /&gt;</h3>
                <p>Full hero section: badge, "Be raw. Be real. Belong." headline, CTA + schedule, call window with face tiles, and positioned stickers.</p>
                <p className="ds-meta">Props: discordHref (optional) · see <a href="/" style={{ textDecoration: "underline", fontWeight: 800 }}>homepage</a></p>
              </div>

              {/* CTABand */}
              <div className="ds-recipe">
                <h3 className="display">&lt;CTABand /&gt;</h3>
                <p>Dark CTA band with "Come hang out in the Discord." heading and yellow join button. Rendered as part of Footer.</p>
                <p className="ds-meta">Props: discordHref (optional)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ORGANISMS ── */}
        <section className="ds-section" style={{ background: "var(--cream-2)" }}>
          <div className="wrap">
            <h3 className="display" style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 24 }}>Organisms</h3>

            <div className="ds-organism">
              <h3 className="display">&lt;EventCard variant="upcoming" /&gt;</h3>
              <EventCard
                variant="upcoming"
                data={{
                  month: "Jun",
                  day: "17",
                  time: "5:00 PM PST",
                  tag: "Community Night · Online",
                  tagVariant: "sky",
                  entryTag: "paid event",
                  title: "The UX Chats",
                  description: "Games, conversations, and great company — our regular community night open to all.",
                  meta: [
                    { icon: "🕐", text: "5:00 PM PST" },
                    { icon: "💬", text: "In our Discord" },
                    { icon: "⏱", text: "1.5 hours" },
                  ],
                  buttons: [
                    { label: "Register on Luma →", href: "https://luma.com/TheUXChats", variant: "yellow" as const },
                  ],
                }}
              />
              <p className="ds-meta">Compound card: date block · tag · title · meta · action buttons</p>
            </div>

            <div className="ds-organism">
              <h3 className="display">&lt;EventCard variant="past" /&gt;</h3>
              <EventCard
                variant="past"
                data={{
                  month: "Jun",
                  day: "03",
                  time: "5:00 PM PST",
                  tag: "Special Guest Night · Online",
                  entryTag: "free entry",
                  title: "How to Use Claude Code to Design Multiple Products",
                  description: "Hands-on look at designing with AI tools — ~40-min talk + open Q&A.",
                  meta: [
                    { icon: "🕐", text: "5:00 PM PST" },
                    { icon: "👥", text: "29 attended" },
                  ],
                  buttons: [
                    { label: "See all events", href: "https://luma.com/TheUXChats", variant: "line" as const },
                  ],
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
                    name: "Jordan",
                    role: "Product Designer",
                    platform: "discord",
                    avatar: "J",
                    avatarColor: "purple",
                    sticker: { label: "✦ fave", color: "yellow" },
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
          </div>
        </section>

        {/* ── BUTTON & TAG DEMOS ── */}
        <section className="ds-section">
          <div className="wrap">
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
          </div>
        </section>

        {/* ── SPACING REFERENCE ── */}
        <section className="ds-section" style={{ background: "var(--cream-2)" }}>
          <div className="wrap">
            <h2 className="display sec">Spacing scale</h2>
            <p style={{ marginBottom: 16, fontWeight: 500, opacity: 0.8, maxWidth: 560 }}>
              8&nbsp;pt grid for desktop / tablet · 4&nbsp;pt supplement for mobile.
              All values in <strong>px</strong>.
            </p>

            <h3 className="display" style={{ fontSize: "clamp(18px, 2.2vw, 22px)", marginBottom: 16 }}>Desktop &amp; tablet <span style={{ opacity: .45, fontWeight: 500, fontFamily: '"Hanken Grotesk"', fontSize: 14 }}>8&nbsp;pt grid</span></h3>
            <div className="ds-spacing">
              {SPACING_SCALE.desktop.map((n) => (
                <div className="ds-space" key={`d-${n}`}>
                  <div className="bar" style={{ width: n > 80 ? 64 : n }} />
                  <span className="label">{n}px</span>
                </div>
              ))}
            </div>

            <h3 className="display" style={{ fontSize: "clamp(18px, 2.2vw, 22px)", marginTop: 36, marginBottom: 16 }}>Mobile supplement <span style={{ opacity: .45, fontWeight: 500, fontFamily: '"Hanken Grotesk"', fontSize: 14 }}>4&nbsp;pt grid</span></h3>
            <div className="ds-spacing">
              {SPACING_SCALE.mobile.map((n) => (
                <div className="ds-space" key={`m-${n}`}>
                  <div className="bar" style={{ width: n > 60 ? 60 : n < 8 ? 8 : n }} />
                  <span className="label">{n}px</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── UTILITY CLASSES ── */}
        <section className="ds-section">
          <div className="wrap">
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
          </div>
        </section>
      </main>

      <Footer />

      {/* ── FLOATING JOIN ── */}
      <div className={`float-join${showFloat ? " show" : ""}`}>
        <Button as="a" href="https://discord.gg/bBbDbZbQ9" variant="yellow" target="_blank" rel="noopener">
          Join Discord
        </Button>
      </div>
    </>
  );
}
