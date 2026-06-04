import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Tag, Footer } from "./components/ui";
import "./App.css";

export default function BecomeAGuest() {
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
            <Link className="lk" to="/#about">What we do</Link>
            <Link className="lk" to="/#events">Events</Link>
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
        <Link to="/#about" onClick={closeMenu}>What we do</Link>
        <Link to="/#events" onClick={closeMenu}>Events</Link>
        <Link to="/become-a-guest" onClick={closeMenu}>Become a Guest</Link>
        <a className="nav-join" href="https://discord.gg/bBbDbZbQ9" target="_blank" rel="noopener" onClick={closeMenu}>
          Join Discord →
        </a>
      </div>

      <main>
        {/* ── HERO ── */}
        <section className="guest-hero">
          <div className="wrap">
            <div className="guest-badge">
              <Tag variant="pink" size="md">Special Guest Nights</Tag>
            </div>
            <h1 className="display guest-title">
              Want to be a<br />
              <span className="hl">special guest?</span>
            </h1>
            <p className="guest-sub">
              No panels. No sales pitches. Just you, a topic you're passionate about, and a room
              of warm, curious designers who actually want to hear what you have to say.
            </p>

            <div className="guest-cta-row">
              <Button as="a" href="https://luma.com/TheUXChats" variant="yellow" size="lg" target="_blank" rel="noopener">
                Propose a talk →
              </Button>
              <Button as="a" href="/" variant="line" size="lg">
                Back to home
              </Button>
            </div>
          </div>
        </section>

        {/* ── WHAT IT'S LIKE ── */}
        <section className="guest-details" style={{ background: "var(--cream-2)" }}>
          <div className="wrap">
            <h2 className="display sec" style={{ textAlign: "center" }}>What to expect.</h2>
            <div className="guest-cards">
              <div className="card guest-card">
                <Tag shape="square" variant="sky">🎙️ ~40 min talk + Q&amp;A</Tag>
                <p>Share your expertise — design stories, tools you love, lessons learned. Then open it up for questions from the community.</p>
              </div>
              <div className="card guest-card">
                <Tag shape="square" variant="pink">💬 Casual conversation</Tag>
                <p>After the talk, stick around for casual discussion. No networking pressure — just genuine conversation.</p>
              </div>
              <div className="card guest-card">
                <Tag shape="square" variant="yellow">🌍 Remote &amp; recorded</Tag>
                <p>Present from anywhere. Talks are recorded (with your permission) so the community can watch later.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── IDEAS ── */}
        <section className="guest-ideas">
          <div className="wrap" style={{ textAlign: "center" }}>
            <h2 className="display sec">Topic ideas.</h2>
            <p className="guest-sub" style={{ maxWidth: 640, margin: "0 auto 40px" }}>
              Don't have a fully baked talk? That's fine. Here are things past guests
              have done:
            </p>
            <div className="tags-row" style={{ justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
              <Tag variant="sky">Design systems at scale</Tag>
              <Tag variant="yellow">Career pivots</Tag>
              <Tag variant="pink">UX research stories</Tag>
              <Tag variant="sky">AI × design</Tag>
              <Tag variant="yellow">Accessibility deep dives</Tag>
              <Tag variant="pink">Failures &amp; learnings</Tag>
              <Tag variant="sky">Design ops</Tag>
              <Tag variant="yellow">Tools &amp; workflows</Tag>
              <Tag variant="pink">Case studies</Tag>
              <Tag variant="sky">Anything you're curious about</Tag>
            </div>
          </div>
        </section>

        {/* ── FORM ── */}
        <section className="guest-form-section">
          <div className="wrap">
            <h2 className="display sec" style={{ textAlign: "center" }}>Tell us about you</h2>
            <p className="guest-sub" style={{ textAlign: "center", maxWidth: 520 }}>
              Fill this out and we'll be in touch. Takes about 5 minutes.
            </p>
            <div className="guest-form-card">
              <form action="https://formspree.io/f/mdavogvj" method="POST">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="form-group">
                    <label htmlFor="first_name">Name</label>
                    <input type="text" id="first_name" name="first_name" required placeholder="Your first name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last name</label>
                    <input type="text" id="last_name" name="last_name" required placeholder="Your last name" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn</label>
                  <input type="text" id="linkedin" name="linkedin" placeholder="Your LinkedIn URL" />
                </div>
                <div className="form-group">
                  <label htmlFor="portfolio">Portfolio/website link (if you have one)</label>
                  <input type="text" id="portfolio" name="portfolio" placeholder="https://yoursite.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="topics">What topics would you like to discuss?</label>
                  <textarea id="topics" name="topics" placeholder="What UX topics are you passionate about?" rows={4} />
                </div>
                <div className="form-group">
                  <label htmlFor="reason">Why do you want to be a special guest?</label>
                  <textarea id="reason" name="reason" placeholder="Tell us what makes you excited to be on the show" rows={4} />
                </div>
                <p className="form-note">
                  📅 <strong>Note:</strong> Check the events scheduled on Luma:{" "}
                  <a href="https://luma.com/TheUXChats?k=c" target="_blank" rel="noopener">luma.com/TheUXChats</a>
                </p>
                <Button as="button" type="submit" variant="yellow" size="lg" className="form-submit">
                  Send it →
                </Button>
                <p className="form-disclaimer">We'll get back to you within a week. No spam, ever.</p>
              </form>
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
