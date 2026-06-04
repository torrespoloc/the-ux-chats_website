import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Tag } from "./components/ui";
import "./App.css";

const MARQUEE_ITEMS = [
  "real talk", "game night", "no gatekeeping", "craft night",
  "vent & celebrate", "mentors",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFloat, setShowFloat] = useState(false);

  // Floating join button visibility
  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── NAV ── */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="logo" href="#top">
            <span className="mark"><img src="/img/logo.png" alt="UX Chats logo" /></span>
            UX Chats
          </a>
          <nav className="nav-links">
            <a className="lk" href="#about">What we do</a>
            <a className="lk" href="#events">Events</a>
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
        <a href="#about" onClick={closeMenu}>What we do</a>
        <a href="#events" onClick={closeMenu}>Events</a>
        <Link to="/become-a-guest" onClick={closeMenu}>Become a Guest</Link>
        <a className="nav-join" href="https://discord.gg/bBbDbZbQ9" target="_blank" rel="noopener" onClick={closeMenu}>
          Join Discord →
        </a>
      </div>

      <main id="top">
        {/* ── HERO ── */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="badge"><span className="dot"></span> A casual UX community</span>
              <h1 className="display hero-title">
                Be <span className="pop">raw.</span><br />
                Be real.<br />
                <span className="hl">Belong.</span>
              </h1>
              <p className="hero-sub">
                No formal attire. No stiff intros. Just designers having honest
                conversations, playing dumb-fun games, and growing together.
              </p>
              <div className="hero-cta">
                <Button as="a" href="https://discord.gg/bBbDbZbQ9" variant="yellow" size="lg" target="_blank" rel="noopener">
                  Join the Discord →
                </Button>
                <span className="sched"><span className="blip"></span> Every other Wednesday · 5:00 PM PST</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="call">
                <div className="call-bar">
                  <span className="dots"><i></i><i></i><i></i></span>
                  <span className="t">UX Chat · Wednesdays 5PM PST</span>
                  <span className="live"><span className="b"></span> Live</span>
                </div>
                <div className="call-grid">
                  <div className="tile"><img src="/img/call-jacki.png" alt="" /><span className="name">Jacki</span></div>
                  <div className="tile"><img src="/img/call-maya.png" alt="" /><span className="name">Maya</span></div>
                  <div className="tile"><img src="/img/call-devon.png" alt="" /><span className="name">Devon</span></div>
                  <div className="tile join"><span><span className="plus">+</span><span className="jt">your seat →</span></span></div>
                </div>
              </div>
              <div className="sticker st-1">no ties<br />allowed</div>
              <div className="sticker st-2">say hi<br />👋</div>
              <div className="sticker st-3">free to join</div>
            </div>
          </div>
        </section>
      </main>

      {/* ── MARQUEE ── */}
      <div className="marquee">
        <div className="track">
          {MARQUEE_ITEMS.map((item) => <span key={item}>{item}</span>)}
          {MARQUEE_ITEMS.map((item) => <span key={item + "-dup"}>{item}</span>)}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="wrap about-grid">
          <div className="reveal">
            <span className="kicker">What is UX Chats</span>
            <h2 className="display sec">A place to take<br />the tie off.</h2>
            <p className="lead">
              We're a global crew of UX folks who meet to talk shop the way you
              actually talk — venting, celebrating wins, swapping losses, and
              learning the stuff that never makes the LinkedIn carousel.
            </p>
            <div className="tags-row">
              <Tag>Students breaking in</Tag>
              <Tag variant="yellow">Mid-level designers</Tag>
              <Tag variant="sky">Seniors &amp; mentors</Tag>
              <Tag variant="pink">Career switchers</Tag>
              <Tag variant="yellow">Anyone curious</Tag>
            </div>
          </div>
          <div className="collage reveal">
            <div className="polaroid pol-1"><img src="/img/polaroid-game-night.png" alt="Game night" /><div className="cap">game night</div></div>
            <div className="polaroid pol-2"><img src="/img/polaroid-the-crew.png" alt="The crew" /><div className="cap">the crew</div></div>
            <div className="polaroid pol-3"><img src="/img/polaroid-real-talk.png" alt="Real talk" /><div className="cap">real talk</div></div>
          </div>
        </div>
      </section>

      {/* ── HOSTS ── */}
      <section className="host" id="host">
        <div className="wrap">
          <div className="host-head reveal">
            <span className="kicker">Meet your hosts</span>
            <h2 className="display sec">Two humans who<br />hate stiff intros.</h2>
          </div>
          <div className="founders">

            <div className="founder reveal">
              <div className="host-photo">
                <img src="/img/host-jacki.png" alt="Jacki, founder of UX Chats" />
                <div className="cap">Jacki<small>Founder · your host</small></div>
              </div>
              <div className="host-body">
                <h3 className="display" style={{ fontSize: "clamp(30px,4vw,46px)" }}>Hey, I'm Jacki 👋</h3>
                <p>A few years ago I was an architecture student making a big leap into UX. Like most career switchers, I had no clue what I was doing — so I started talking to people. A <em>lot</em> of people. Those conversations gave me energy, clarity, and human connection.</p>
                <p>So I posted on LinkedIn: <em>let's get together, share where we are, vent, laugh, and connect.</em> I figured maybe 4 or 5 friends would show up.</p>
                <div className="host-quote"><div className="big">30 strangers showed up.</div><div className="sm">And it was magic. That was the first UX Chat.</div></div>
                <div className="host-tags">
                  <Tag variant="sky">Architecture → UX</Tag>
                  <Tag variant="pink">Cal alum 🐻</Tag>
                  <Tag variant="yellow">Product Designer in SF</Tag>
                  <Tag variant="sky">From Venezuela 🇻🇪</Tag>
                  <Tag variant="pink">TED speaker ×2</Tag>
                  <Tag variant="yellow">Pickleball (competitively)</Tag>
                  <Tag variant="sky">Painter</Tag>
                </div>
              </div>
            </div>

            <div className="founder rev reveal">
              <div className="host-photo">
                <img src="/img/host-romit.jpg" alt="Romit, co-founder of UX Chats" />
                <div className="cap">Romit<small>Co-founder</small></div>
              </div>
              <div className="host-body">
                <h3 className="display" style={{ fontSize: "clamp(30px,4vw,46px)" }}>Hey, I'm Romit 👋</h3>
                <p>I've been in UX for a decade. Started as a founding designer, built products at healthcare SaaS companies, published research, and somewhere along the way realized the design community was full of brilliant people who rarely got to just… talk.</p>
                <p>Jacki was already creating that space. I joined her to help it grow.</p>
                <div className="host-quote"><div className="big">UX Chats is what I wish had existed when I started.</div></div>
                <p>No panels. No personal-brand pitching. Just designers at every stage of their journey getting together every two weeks to share where they are, laugh a little, and actually connect.</p>
                <div className="host-tags">
                  <Tag variant="sky">CS background</Tag>
                  <Tag variant="pink">Healthcare SaaS</Tag>
                  <Tag variant="yellow">Published at ACM &amp; IEEE</Tag>
                  <Tag variant="sky">Founding designer energy</Tag>
                  <Tag variant="pink">Based in NJ</Tag>
                </div>
              </div>
            </div>

          </div>
          <p className="philosophy" style={{ margin: "60px auto 0" }}>
            Come as you are. <span className="hl">Leave your LinkedIn voice at the door.</span>
          </p>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section className="events-section" id="events">
        <div className="wrap">
          <div className="reveal">
            <span className="kicker">Upcoming</span>
            <h2 className="display sec">Next up.</h2>
          </div>

          <div className="next-up-wrap reveal">
            <span className="next-up-sticker">Next up →</span>
            <div className="next-up-card">
              <div className="next-up-date">
                <span className="month">Jun</span>
                <span className="day">03</span>
                <span className="time">5:00 PM PST</span>
              </div>
              <div className="next-up-body">
                <span className="next-up-tag">Special Guest Night · Online</span>
                <h3>How to Use Claude Code to Design Multiple Products</h3>
                <p className="desc">With co-founder <strong>Romit</strong> — a hands-on look at how designers use Claude Code, Granola &amp; Vercel to think, design, build, and ship multiple products without feeling overwhelmed. ~40-min talk, then open Q&amp;A and casual discussion.</p>
                <div className="next-up-meta">
                  <span>🕐 5:00 PM PST</span>
                  <span>💬 In our Discord</span>
                  <span>⏱ 1.5 hours</span>
                  <span>👥 29 going</span>
                </div>
                <div className="next-up-actions">
                  <Button as="a" href="https://luma.com/zjbt9cxo" variant="yellow" target="_blank" rel="noopener">Register on Luma →</Button>
                  <Button as="a" href="https://luma.com/TheUXChats" variant="line" target="_blank" rel="noopener">See all events</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ marginTop: 20 }}>
            <span className="kicker">The Events</span>
            <h2 className="display sec">Two kinds of night.</h2>
          </div>

          <div className="cards reveal">
            <div className="card p">
              <div className="icon">✦</div>
              <h3>Special Guest Nights</h3>
              <p>UX mentors, psychologists, and creative minds share what you won't find on ChatGPT. Real insight, real talk, zero fluff.</p>
              <div className="tags">
                <Tag size="sm">Mentors</Tag>
                <Tag size="sm" variant="yellow">Q&amp;A</Tag>
                <Tag size="sm" variant="pink">Real stories</Tag>
              </div>
            </div>
            <div className="card">
              <div className="icon">🎮</div>
              <h3>Community Nights</h3>
              <p>Game Night, Convo Night, Craft Night and more. Interactive UX games and challenges that spark creativity — and a lot of laughter.</p>
              <div className="tags">
                <Tag size="sm" variant="sky">Games</Tag>
                <Tag size="sm" variant="yellow">Convos</Tag>
                <Tag size="sm" variant="pink">Craft</Tag>
              </div>
            </div>
          </div>

          <div className="games reveal">
            <div className="game"><div className="em">🤔</div><h4>UX "Guess Who?"</h4><p>Guess the UX person, tool, or feature through clues. (Yes, we did liquid glass already.)</p></div>
            <div className="game"><div className="em">🎨</div><h4>UX Pictionary</h4><p>2 teams. 1 canvas. Draw and pray your teammates can guess.</p></div>
            <div className="game"><div className="em">⚡</div><h4>UX Stories</h4><p>Build a connect-the-story while solving a UX problem. This gets HILARIOUS.</p></div>
          </div>
        </div>
      </section>

      {/* ── CREW ── */}
      <section className="crew">
        <div className="wrap">
          <div className="head reveal">
            <span className="kicker">The faces</span>
            <h2 className="display sec" style={{ fontSize: "clamp(32px,4.5vw,52px)" }}>Real people. Real fun.</h2>
          </div>
          <div className="crew-shot reveal">
            <span className="tape"></span>
            <div className="frame">
              <img src="/img/community-call.png" alt="A recent UX Chats video call — smiling faces covered in playful doodles" />
              <div className="cap">a recent chat · doodles encouraged</div>
            </div>
            <span className="stk s1">this is us!</span>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band" id="join">
        <div className="wrap reveal">
          <h2>Come hang out<br />in the <span className="y">Discord.</span></h2>
          <p>Curious, creative, and wonderfully casual UX people are already in there. Pull up a chair.</p>
          <div className="cta-actions">
            <Button as="a" href="https://discord.gg/bBbDbZbQ9" variant="yellow" size="lg" target="_blank" rel="noopener">
              Join the Discord →
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="wrap">
          <span className="foot-brand"><img src="/img/logo.png" alt="UX Chats" /> UX Chats © 2025 — take off your tie and be yourself.</span>
          <span>@uxchats</span>
        </div>
      </footer>

      {/* ── FLOATING JOIN ── */}
      <div className={`float-join${showFloat ? " show" : ""}`}>
        <Button as="a" href="https://discord.gg/bBbDbZbQ9" variant="yellow" target="_blank" rel="noopener">
          Join Discord
        </Button>
      </div>
    </>
  );
}

export default App;
