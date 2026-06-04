import { CTABand } from './CTABand';

export function Footer() {
  return (
    <>
      <CTABand />
      <footer data-surface="dark">
        <div className="wrap">
          <span className="foot-brand"><img src="/img/logo.png" alt="UX Chats" /> UX Chats &copy; 2026 — take off your tie and be yourself.</span>
          <span>@uxchats</span>
        </div>
      </footer>
    </>
  );
}
