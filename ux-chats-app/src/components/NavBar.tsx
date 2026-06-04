import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export interface NavBarProps {
  /** Optional override for the Discord invite link */
  discordHref?: string;
}

export function NavBar({ discordHref = "https://discord.gg/bBbDbZbQ9" }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  const handleHashNav = (hash: string) => {
    closeMenu();
    // If already on home page, scroll directly.
    // Otherwise navigate first (the App useEffect picks up the hash on mount).
    if (window.location.pathname === "/") {
      scrollToHash(hash);
    } else {
      navigate("/" + hash);
    }
  };

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="logo" to="/">
            <span className="mark"><img src="/img/logo.png" alt="UX Chats logo" /></span>
            The UX Chats
          </Link>
          <nav className="nav-links">
            <button className="lk" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit" }} onClick={() => handleHashNav("#host")}>Your Hosts</button>
            <button className="lk" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit" }} onClick={() => handleHashNav("#event-formats")}>Events</button>
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
        <a href="#host" onClick={(e) => { e.preventDefault(); handleHashNav("#host"); }}>Your Hosts</a>
        <a href="#event-formats" onClick={(e) => { e.preventDefault(); handleHashNav("#event-formats"); }}>Events</a>
        <Link to="/become-a-guest" onClick={closeMenu}>Become a Guest</Link>
        <a className="nav-join" href={discordHref} target="_blank" rel="noopener" onClick={closeMenu}>
          Join Discord →
        </a>
      </div>
    </>
  );
}
