"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastScroll = 0;
    const header = document.querySelector(".header");
    if (!header) return;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add("header-solid");
        header.classList.remove("header-transparent");
      } else {
        header.classList.remove("header-solid");
        header.classList.add("header-transparent");
      }
      lastScroll = currentScroll;
    };

    if (window.pageYOffset > 50) {
      header.classList.add("header-solid");
    } else {
      header.classList.add("header-transparent");
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.setAttribute("data-menu-open", "true");
    } else {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-menu-open");
      setActiveSubmenu(null);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeSubmenu) {
          setActiveSubmenu(null);
        } else {
          setMenuOpen(false);
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen, activeSubmenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const panel = document.querySelector(".mobile-nav-panel");
    if (!panel) return;
    const focusableEls = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusableEls.length === 0) return;
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    setTimeout(() => closeBtnRef.current?.focus(), 100);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen, activeSubmenu]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setActiveSubmenu(null);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="header" role="banner">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="Opadola Care Initiative - Home">
            <img src="/images/header-logo.gif" alt="" className="logo-img" width={56} height={56} />
            <div className="logo-text-group">
              <span className="logo-brand">OPADOLA CARE INITIATIVES</span>
              <span className="logo-tagline">charity beyond boarders</span>
            </div>
          </Link>

          <nav className="nav" role="navigation" aria-label="Main navigation">
            <div className="nav-links">
              <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
              <div className="nav-dropdown" onMouseEnter={() => setActiveSubmenu("about")} onMouseLeave={() => setActiveSubmenu(null)}>
                <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>About Us</Link>
                <div className="nav-dropdown-menu">
                  <Link href="/team" className="nav-dropdown-link">Team</Link>
                  <Link href="/events" className="nav-dropdown-link">Events</Link>
                </div>
              </div>
              <div className="nav-dropdown" onMouseEnter={() => setActiveSubmenu("programs")} onMouseLeave={() => setActiveSubmenu(null)}>
                <Link href="/programs" className={`nav-link ${pathname?.startsWith("/programs") ? "active" : ""}`}>Programs</Link>
                <div className="nav-dropdown-menu">
                  <Link href="/volunteer" className="nav-dropdown-link">Volunteer</Link>
                </div>
              </div>
              <Link href="/gallery" className={`nav-link ${isActive("/gallery") ? "active" : ""}`}>Gallery</Link>
              <Link href="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>Contact</Link>
            </div>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle" aria-label="Toggle dark mode" type="button" onClick={() => {
              const current = document.documentElement.getAttribute("data-theme");
              const next = current === "dark" ? "light" : "dark";
              document.documentElement.setAttribute("data-theme", next);
              localStorage.setItem("theme", next);
            }}>
              <svg className="theme-toggle-icon light-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg className="theme-toggle-icon dark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <Link href="/donate" className="nav-donate">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16} aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Donate
            </Link>
            <button className={`menu-toggle ${menuOpen ? "menu-active" : ""}`} aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              <span className="menu-toggle-line" />
              <span className="menu-toggle-line" />
              <span className="menu-toggle-line" />
            </button>
          </div>
        </div>

        <div className={`mobile-nav ${menuOpen ? "menu-active" : ""}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-nav-bg" aria-hidden="true" onClick={closeMenu} />
          <div className="mobile-nav-panel">
            <div className="mobile-nav-header">
              <div className="mobile-nav-header-left">
                <img src="/images/header-logo.gif" alt="" className="mobile-nav-logo" />
                <span className="mobile-nav-heading">
                  {activeSubmenu === "about" ? "About Us" : activeSubmenu === "programs" ? "Programs" : "Menu"}
                </span>
              </div>
              <button
                className="mobile-nav-header-btn"
                onClick={() => activeSubmenu ? setActiveSubmenu(null) : closeMenu()}
                aria-label={activeSubmenu ? "Back to main menu" : "Close menu"}
                ref={closeBtnRef}
              >
                {activeSubmenu ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M18 6 6 18" /><path d="M6 6 18 18" />
                  </svg>
                )}
              </button>
            </div>

            <div className="mobile-nav-screens">
              <div className={`mobile-nav-screen ${!activeSubmenu ? "mobile-nav-screen-active" : "mobile-nav-screen-exit"}`}>
                <div className="mobile-nav-links">
                  <Link href="/" className="mobile-nav-link" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>Home</Link>
                  <div className="mobile-nav-group-row">
                    <Link href="/about" className="mobile-nav-group-link" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>About Us</Link>
                    <button className="mobile-nav-group-chevron" onClick={() => setActiveSubmenu("about")} tabIndex={menuOpen ? 0 : -1} aria-label="About Us submenu">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                  <div className="mobile-nav-group-row">
                    <Link href="/programs" className="mobile-nav-group-link" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>Programs</Link>
                    <button className="mobile-nav-group-chevron" onClick={() => setActiveSubmenu("programs")} tabIndex={menuOpen ? 0 : -1} aria-label="Programs submenu">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                  <Link href="/gallery" className="mobile-nav-link" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>Gallery</Link>
                  <Link href="/contact" className="mobile-nav-link" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>Contact</Link>
                </div>
              </div>

              <div className={`mobile-nav-screen ${activeSubmenu === "about" ? "mobile-nav-screen-active" : "mobile-nav-screen-exit"}`}>
                <div className="mobile-nav-sublinks">
                  <p className="mobile-nav-sub-desc">Learn more about our mission and team.</p>
                  <Link href="/team" className="mobile-nav-sublink" onClick={closeMenu} tabIndex={activeSubmenu === "about" ? 0 : -1}>Our Team</Link>
                  <Link href="/events" className="mobile-nav-sublink" onClick={closeMenu} tabIndex={activeSubmenu === "about" ? 0 : -1}>Events &amp; Impact</Link>
                </div>
              </div>

              <div className={`mobile-nav-screen ${activeSubmenu === "programs" ? "mobile-nav-screen-active" : "mobile-nav-screen-exit"}`}>
                <div className="mobile-nav-sublinks">
                  <p className="mobile-nav-sub-desc">Explore our programs and how to get involved.</p>
                  <Link href="/volunteer" className="mobile-nav-sublink" onClick={closeMenu} tabIndex={activeSubmenu === "programs" ? 0 : -1}>Volunteer</Link>
                </div>
              </div>
            </div>

            <div className="mobile-nav-bottom">
              <Link href="/donate" className="mobile-nav-donate" onClick={closeMenu}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Donate Now
              </Link>
              <div className="mobile-nav-footer-row">
                <button className="mobile-nav-theme" aria-label="Toggle dark mode" type="button" onClick={() => {
                  const current = document.documentElement.getAttribute("data-theme");
                  const next = current === "dark" ? "light" : "dark";
                  document.documentElement.setAttribute("data-theme", next);
                  localStorage.setItem("theme", next);
                }}>
                  <svg className="mobile-theme-icon light-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <svg className="mobile-theme-icon dark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span className="mobile-nav-theme-label">Dark Mode</span>
                </button>
                <div className="mobile-nav-social">
                  <a href="https://x.com/opadolaci" className="mobile-nav-social-link" aria-label="X/Twitter" target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="#" className="mobile-nav-social-link" aria-label="Instagram" target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                </div>
              </div>
              <p className="mobile-nav-contact">+234 916 387 6000 · info@opadola.org</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
