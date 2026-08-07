import { useEffect } from "react";
import {
  Button, Tag, Footer, EventCard, TestimonialCard, TestimonialForm,
  NavBar, Marquee, Hero,
} from "./components";
import type { TestimonialCardData } from "./components";
import TESTIMONIALS_DATA from "../metadata/testimonials.json";
import "./App.css";

const MARQUEE_ITEMS = [
  "real talk", "game night", "no gatekeeping", "craft night",
  "vent & celebrate", "mentors",
];

function App() {
  // Scroll to hash section after mount (cross-page navigation)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
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

  return (
    <>
      {/* ── NAV ── */}
      <NavBar />

      <main id="top">
        {/* ── HERO ── */}
        <Hero />
      </main>

      {/* ── MARQUEE ── */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* ── EVENTS ── */}
      <section className="events-section" id="events">
        <div className="wrap">
          <div className="reveal">
            <span className="kicker">Upcoming</span>
            <h2 className="display sec">Events</h2>
          </div>

          <EventCard
            variant="upcoming"
            data={{
              month: "Aug",
              day: "13",
              time: "6:00 PM PST",
              tag: "Community Night · Online",
              tagVariant: "sky",
              entryTag: "free event",
              title: "UX Chats Community Night",
              description: <>Games, real conversation, and zero formal attire with the UX Chats crew — no talks, no agenda, just the people already in your DMs, finally getting a proper hang.</>,
              meta: [
                { icon: "🕐", text: "6:00 PM PST" },
                { icon: "🎥", text: "On Zoom" },
                { icon: "⏱", text: "1 hour" },
              ],
              buttons: [
                { label: "RSVP — Free →", href: "https://luma.com/w7eq6g30", variant: "yellow" as const },
                { label: "See all events", href: "https://luma.com/TheUXChats", variant: "line" as const },
              ],
            }}
          />

          <EventCard
            variant="upcoming"
            data={{
              month: "Aug",
              day: "27",
              time: "6:00 PM PST",
              tag: "Special Guest Night · Online",
              tagVariant: "yellow",
              entryTag: "paid event",
              title: "How to Level Up from Designer to AI Builder",
              description: <>A fireside chat + live 0-to-1 build with John Rodrigues (Design Engineer, Founder of Human AI Studio) on going from designer to AI builder.</>,
              meta: [
                { icon: "🕐", text: "6:00 PM PST" },
                { icon: "🎥", text: "On Zoom" },
                { icon: "⏱", text: "90 min" },
                { icon: "💵", text: "$25" },
              ],
              buttons: [
                { label: "RSVP — $25 →", href: "https://luma.com/s7ad35po", variant: "yellow" as const },
                { label: "See all events", href: "https://luma.com/TheUXChats", variant: "line" as const },
              ],
            }}
          />

          <EventCard
            variant="upcoming"
            data={{
              month: "Sep",
              day: "10",
              time: "6:00 PM PST",
              tag: "Community Night · Online",
              tagVariant: "sky",
              entryTag: "free event",
              title: "UX Chats Community Night",
              description: <>Pull up in your comfiest hoodie and overshare with strangers who actually get it. Games, banter, and zero small talk about the weather.</>,
              meta: [
                { icon: "🕐", text: "6:00 PM PST" },
                { icon: "🎥", text: "On Zoom" },
                { icon: "⏱", text: "1 hour" },
              ],
              buttons: [
                { label: "RSVP — Free →", href: "https://luma.com/crtz2cku", variant: "yellow" as const },
                { label: "See all events", href: "https://luma.com/TheUXChats", variant: "line" as const },
              ],
            }}
          />

          <EventCard
            variant="upcoming"
            data={{
              month: "Oct",
              day: "8",
              time: "6:00 PM PST",
              tag: "Community Night · Online",
              tagVariant: "sky",
              entryTag: "free event",
              title: "UX Chats Community Night",
              description: <>No decks, no dress code, no agenda. Just the UX Chats crew, a few ridiculous games, and an hour of actually being yourselves.</>,
              meta: [
                { icon: "🕐", text: "6:00 PM PST" },
                { icon: "🎥", text: "On Zoom" },
                { icon: "⏱", text: "1 hour" },
              ],
              buttons: [
                { label: "RSVP — Free →", href: "https://luma.com/p1dwy5lx", variant: "yellow" as const },
                { label: "See all events", href: "https://luma.com/TheUXChats", variant: "line" as const },
              ],
            }}
          />

          <EventCard
            variant="upcoming"
            data={{
              month: "Nov",
              day: "5",
              time: "6:00 PM PST",
              tag: "Community Night · Online",
              tagVariant: "sky",
              entryTag: "free event",
              title: "UX Chats Community Night",
              description: <>Bring snacks, bring chaos energy, leave the LinkedIn voice at the door. An hour of games and genuinely good conversation with your favorite internet designers.</>,
              meta: [
                { icon: "🕐", text: "6:00 PM PST" },
                { icon: "🎥", text: "On Zoom" },
                { icon: "⏱", text: "1 hour" },
              ],
              buttons: [
                { label: "RSVP — Free →", href: "https://luma.com/q33m6njl", variant: "yellow" as const },
                { label: "See all events", href: "https://luma.com/TheUXChats", variant: "line" as const },
              ],
            }}
          />

          <EventCard
            variant="upcoming"
            data={{
              month: "Dec",
              day: "3",
              time: "6:00 PM PST",
              tag: "Community Night · Online",
              tagVariant: "sky",
              entryTag: "free event",
              title: "UX Chats Community Night",
              description: <>Cozy season, cozier vibes. Games, real talk, and a room full of designers who'd rather laugh than network — no agenda required.</>,
              meta: [
                { icon: "🕐", text: "6:00 PM PST" },
                { icon: "🎥", text: "On Zoom" },
                { icon: "⏱", text: "1 hour" },
              ],
              buttons: [
                { label: "RSVP — Free →", href: "https://luma.com/wti76sty", variant: "yellow" as const },
                { label: "See all events", href: "https://luma.com/TheUXChats", variant: "line" as const },
              ],
            }}
          />

        </div>
      </section>

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

      {/* ── TWO KINDS OF NIGHTS ── */}
      <section className="events-format" id="event-formats">
        <div className="wrap">
          <div className="reveal">
            <span className="kicker">The Events</span>
            <h2 className="display sec">Two kinds of night.</h2>
          </div>

          <div className="cards reveal">
            <div className="card p">
              <div className="icon">✦</div>
              <span className="entry-tag">paid event</span>
              <h3>Special Guest Nights</h3>
              <p>UX mentors, psychologists, and creative minds share what you won't find on ChatGPT. Real insight, real talk, zero fluff. <strong>Ticketed events</strong> — a small fee helps us bring in great guests.</p>
              <div className="tags">
                <Tag size="sm">Mentors</Tag>
                <Tag size="sm" variant="yellow">Q&amp;A</Tag>
                <Tag size="sm" variant="pink">Real stories</Tag>
              </div>
            </div>
            <div className="card">
              <div className="icon">🎮</div>
              <span className="entry-tag">free event</span>
              <h3>Community Nights</h3>
              <p>Game Night, Convo Night, Craft Night and more. Interactive UX games and challenges that spark creativity — and a lot of laughter. <strong>Always free</strong> — just show up.</p>
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
                  <Tag variant="pink">TEDAI Volunteer  ×2</Tag>
                  <Tag variant="yellow">Pickleball (competitively)</Tag>
                  <Tag variant="sky">Painter</Tag>
                </div>
                <div className="host-links">
                  <Button as="a" href="https://adplist.org/mentors/jackeline-torres" variant="line" target="_blank" rel="noopener">
                    <img src="/img/mentor-logo.png" alt="ADPList" className="mentor-logo" />
                    Schedule ADPList session
                  </Button>
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


      {/* ── TESTIMONIALS ── */}
      <section className="testimonials" id="testimonials">
        <div className="wrap">
          <div className="head reveal">
            <span className="kicker">What our members say</span>
            <h2 className="display sec">From the crew.</h2>
          </div>
          <div className="testimonials-grid">
            {(TESTIMONIALS_DATA as TestimonialCardData[]).map((t, i) => (
              <TestimonialCard key={i} data={t} index={i} />
            ))}
          </div>
          <TestimonialForm />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq" id="faq">
        <div className="wrap">
          <div className="head reveal" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <h2 className="display sec">You're probably<br />wondering…</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item reveal">
              <div className="q">Do I need to be a "real" designer yet?</div>
              <div className="a">Nope. Students breaking in, career switchers, seniors, and the plain curious all show up. There's no experience check at the door.</div>
            </div>
            <div className="faq-item reveal">
              <div className="q">Wait — is it free?</div>
              <div className="a">The community and our Community Nights are free; just show up. Special Guest Nights are ticketed, and that small fee helps us keep the lights on.</div>
            </div>
            <div className="faq-item reveal">
              <div className="q">When and where do you meet?</div>
              <div className="a">Every other Thursday, 6:00 PM PST, online. Can't make it live? The Discord's always on.</div>
            </div>
            <div className="faq-item reveal">
              <div className="q">Is this just professional networking?</div>
              <div className="a">The opposite. No panels, no pitching, no LinkedIn voice — just honest conversations and fun games where we can all learn and connect.</div>
            </div>
            <div className="faq-item reveal">
              <div className="q">Okay, how do I actually join?</div>
              <div className="a">Hop into <a href="https://discord.com/invite/RamJrPZpYd" target="_blank" rel="noopener">Discord</a> — that's the front door. Say hi, and you're in. Or <a href="https://luma.com/TheUXChats" target="_blank" rel="noopener">hop into an event</a>.</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
