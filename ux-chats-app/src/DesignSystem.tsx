import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Tag, Footer } from "./components";
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

const SPACING = [4, 6, 8, 12, 14, 16, 20, 22, 24, 26, 28, 32, 36, 38, 40, 46, 48, 56, 60, 80, 90];

export default function DesignSystem() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const [showFloat, setShowFloat] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="logo" to="/">
            <span className="mark"><img src="/img/logo.png" alt="UX Chats logo" /></span>
            UX Chats
          </Link>
          <nav className="nav-links">
            <Link className="lk" to="/">Home</Link>
            <Link className="lk" to="/become-a-guest">Become a Guest</Link>
            <Button as="a" href="https://discord.gg/bBbDbZbQ9" variant="primary" target="_blank" rel="noopener">
              Join Discord
            </Button>
          </nav>
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((p) => !p)}
          >
            <span className="bar"></span>
          </button>
        </div>
      </header>

      <div className={`nav-menu${menuOpen ? " open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/become-a-guest" onClick={closeMenu}>Become a Guest</Link>
        <a className="nav-join" href="https://discord.gg/bBbDbZbQ9" target="_blank" rel="noopener" onClick={closeMenu}>
          Join Discord →
        </a>
      </div>

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
                  <div className="preview" style={{ border: b.css as any, background: "var(--cream)" }} />
                  <div className="caption">{b.desc}</div>
                </div>
              ))}
              {SHADOWS.map((s) => (
                <div className="ds-demo" key={s.name}>
                  <h4>{s.name}</h4>
                  <div className="preview" style={{ background: "var(--cream)", borderRadius: 12 }}><div style={{ width: "80%", height: "100%", margin: "0 auto", background: "#fff", borderRadius: 10, boxShadow: s.css as any }} /></div>
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
                    <span className="samp" style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: s.size as any, lineHeight: 0.92, letterSpacing: "-0.02em" }}>
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

        {/* ── COMPONENT RECIPES ── */}
        <section className="ds-section">
          <div className="wrap">
            <h2 className="display sec">Component recipes</h2>
            <div className="ds-recipes">
              {/* Button */}
              <div className="ds-recipe">
                <h3 className="display">.btn</h3>
                <div className="ds-btn-row">
                  <Button variant="yellow" size="md">Primary</Button>
                  <Button variant="primary" size="md">Secondary</Button>
                  <Button variant="line" size="md">Outline</Button>
                  <Button variant="yellow" size="lg">Large CTA</Button>
                </div>
                <p style={{ fontSize: 13, marginTop: 16, opacity: 0.65 }}>
                  Pill shape · 3px ink outline · hard offset shadow · press-translates
                </p>
              </div>

              {/* Tag */}
              <div className="ds-recipe">
                <h3 className="display">Tag</h3>
                <div className="ds-tag-row">
                  <Tag variant="yellow">Design</Tag>
                  <Tag variant="sky">Research</Tag>
                  <Tag variant="pink">Frontend</Tag>
                  <Tag variant="default">Strategy</Tag>
                </div>
                <p style={{ fontSize: 13, marginTop: 16, opacity: 0.65 }}>
                  Outlined chip with hard shadow &amp; slight random rotation
                </p>
              </div>

              {/* Sticker */}
              <div className="ds-recipe">
                <h3 className="display">Sticker</h3>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  <span className="ds-sticker-demo">free to join</span>
                  <span className="ds-sticker-demo" style={{ background: "var(--sky)", color: "var(--ink)", transform: "rotate(2deg)" }}>no ties allowed</span>
                  <span className="ds-sticker-demo" style={{ background: "var(--yellow)", color: "var(--ink)", transform: "rotate(-4deg)" }}>say hi 👋</span>
                </div>
                <p style={{ fontSize: 13, marginTop: 16, opacity: 0.65 }}>
                  Rotated outlined badge · pink/sky/yellow fill · floating keyframe
                </p>
              </div>

              {/* Card */}
              <div className="ds-recipe">
                <h3 className="display">Card</h3>
                <div className="ds-card-demo">
                  <h4 className="display" style={{ fontSize: 20 }}>Card title</h4>
                  <p>White background, thick outline, large hard shadow, rounded corners. Lifts on hover.</p>
                </div>
                <p style={{ fontSize: 13, marginTop: 16, opacity: 0.65 }}>
                  border-radius: 22px · var(--shadow-lg) · lifts on hover
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SPACING REFERENCE ── */}
        <section className="ds-section" style={{ background: "var(--cream-2)" }}>
          <div className="wrap">
            <h2 className="display sec">Spacing scale</h2>
            <p style={{ marginBottom: 32, fontWeight: 500, opacity: 0.8, maxWidth: 560 }}>
              Common px values used across the codebase for padding, margins, and gaps.
              All values in <strong>px</strong> (no rem unit in use).
            </p>
            <div className="ds-spacing">
              {SPACING.map((n) => (
                <div className="ds-space" key={n}>
                  <div className="bar" style={{ width: n > 60 ? 60 : n }} />
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
