import { useEffect, useState } from "react";
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

export function NavBar({ discordHref = "https://discord.com/invite/RamJrPZpYd" }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  // Close the mobile menu on Escape or a tap outside the nav/menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Element;
      if (!target.closest(".nav-menu") && !target.closest(".nav-toggle")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

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

  // For nav items whose target is the top of a page (the logo → the "Be raw.
  // Be real. Belong." hero on "/"; Become a Guest → the "Want to be a special
  // guest?" hero on "/become-a-guest"). When already on that page, scroll up
  // smoothly. Otherwise let the <Link> navigate normally — <ScrollToTop> in the
  // router resets scroll to the top after the new page mounts.
  const handleTopNav = (path: string) => (e: React.MouseEvent) => {
    closeMenu();
    if (window.location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="logo" to="/" onClick={handleTopNav("/")}>
            <span className="mark"><img src="/img/logo.png" alt="UX Chats logo" /></span>
            The UX Chats
          </Link>
          <nav className="nav-links">
            <button className="lk" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", color: "inherit" }} onClick={() => handleHashNav("#host")}>Your Hosts</button>
            <Link className="lk" to="/become-a-guest" onClick={handleTopNav("/become-a-guest")}>Become a Guest</Link>
            <a className="lk" href={discordHref} target="_blank" rel="noopener">Discord</a>
            <Button as="a" href="https://luma.com/TheUXChats" variant="primary" target="_blank" rel="noopener">
              Events →
            </Button>
          </nav>
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen((p) => !p)}
          >
            <span className="bar"></span>
          </button>
        </div>
      </header>

      <div id="nav-menu" className={`nav-menu${menuOpen ? " open" : ""}`}>
        <a href="#host" onClick={(e) => { e.preventDefault(); handleHashNav("#host"); }}>Your Hosts</a>
        <Link to="/become-a-guest" onClick={handleTopNav("/become-a-guest")}>Become a Guest</Link>
        <a href={discordHref} target="_blank" rel="noopener" onClick={closeMenu}>Discord</a>
        <a className="nav-join" href="https://luma.com/TheUXChats" target="_blank" rel="noopener" onClick={closeMenu}>
          Events →
        </a>
      </div>
    </>
  );
}
