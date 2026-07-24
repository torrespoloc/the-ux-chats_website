import { Button } from "./Button";

export interface HeroProps {
  discordHref?: string;
}

export function Hero({ discordHref = "https://discord.com/invite/RamJrPZpYd" }: HeroProps) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="badge">
            <span className="dot"></span> A casual UX community
          </span>
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
            <Button as="a" href="https://luma.com/TheUXChats" variant="primary" size="lg" target="_blank" rel="noopener">
              See the events →
            </Button>
            <Button as="a" href={discordHref} variant="yellow" target="_blank" rel="noopener">
              Join Discord
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="call">
            <div className="call-bar">
              <span className="dots"><i></i><i></i><i></i></span>
              <span className="t">UX Chat · Thursdays 6PM PST</span>
              <span className="live"><span className="b"></span> Live</span>
            </div>
            <div className="call-grid">
              <div className="tile"><img src="/img/call-jacki.png" alt="" /><span className="name">Jacki</span></div>
              <div className="tile"><img src="/img/call-maya.png" alt="" /><span className="name">Maya</span></div>
              <div className="tile"><img src="/img/call-devon.png" alt="" /><span className="name">Devon</span></div>
              <div className="tile join">
                <span><span className="plus">+</span><span className="jt">your seat →</span></span>
              </div>
            </div>
          </div>
          <div className="sticker st-1">no ties<br />allowed</div>
          <div className="sticker st-2">say hi<br />👋</div>
        </div>
      </div>
    </section>
  );
}
