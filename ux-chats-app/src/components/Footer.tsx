import { Button } from "./Button";

export function Footer() {
  return (
    <>
      <section className="cta-band" id="join" data-surface="dark">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2>Come hang out<br />in the <span className="y">Discord.</span></h2>
          <p>Curious, creative, and wonderfully casual UX people are already in there. Pull up a chair.</p>
          <div className="cta-actions">
            <Button as="a" href="https://discord.gg/bBbDbZbQ9" variant="yellow" size="lg" target="_blank" rel="noopener">
              Join the Discord →
            </Button>
          </div>
        </div>
      </section>
      <footer data-surface="dark">
        <div className="wrap">
          <span className="foot-brand"><img src="/img/logo.png" alt="UX Chats" /> UX Chats &copy; 2026 — take off your tie and be yourself.</span>
          <span>@uxchats</span>
        </div>
      </footer>
      <div className="cursor-bar">
        <span className="cb-item">⟨/⟩ the-ux-chats_website</span>
        <span className="cb-item">main</span>
        <span className="cb-item" title="UX Chats community landing page">UX Chats · React + Vite + Tailwind</span>
      </div>
    </>
  );
}
