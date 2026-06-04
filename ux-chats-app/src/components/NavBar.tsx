import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export interface NavBarProps {
  /** Optional override for the Discord invite link */
  discordHref?: string;
}

export function NavBar({ discordHref = "https://discord.gg/bBbDbZbQ9" }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="logo" to="/">
            <span className="mark"><img src="/img/logo.png" alt="UX Chats logo" /></span>
            The UX Chats
          </Link>
          <nav className="nav-links">
            <Link className="lk" to="/#host">Your Hosts</Link>
            <Link className="lk" to="/#event-formats">Events</Link>
            <Link className="lk" to="/become-a-guest">Become a Guest</Link>
            <Button as="a" href={discordHref} variant="primary" target="_blank" rel="noopener">
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
        <Link to="/#host" onClick={closeMenu}>Your Hosts</Link>
        <Link to="/#event-formats" onClick={closeMenu}>Events</Link>
        <Link to="/become-a-guest" onClick={closeMenu}>Become a Guest</Link>
        <a className="nav-join" href={discordHref} target="_blank" rel="noopener" onClick={closeMenu}>
          Join Discord →
        </a>
      </div>
    </>
  );
}
