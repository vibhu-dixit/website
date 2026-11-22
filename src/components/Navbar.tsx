import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Postcards", href: "#postcards" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 96);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`editorial-header ${compact ? "is-compact" : ""}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="editorial-header-inner">
        <span className="edition-label">Portfolio / 2026</span>
        <a className="masthead" href="#top" aria-label="Vibhu Dixit, back to top">Vibhu Dixit</a>
        <div className="header-actions">
          <ThemeToggleButton />
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      <nav id="site-navigation" className={`editorial-nav ${open ? "is-open" : ""}`} aria-label="Site navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
        <Link to="/edition" onClick={() => setOpen(false)}>Build an edition</Link>
      </nav>
    </header>
  );
};

export default Navbar;
