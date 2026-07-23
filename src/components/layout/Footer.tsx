import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <img src="/images/footer-logo.png" alt="" className="footer-logo-img" width={56} height={56} />
              <div className="logo-text-group">
                <span className="logo-brand">OPADOLA CARE INITIATIVES</span>
                <span className="logo-tagline">charity beyond boarders</span>
              </div>
            </Link>
            <p className="footer-description">
              Providing support for the most vulnerable in society — the elderly, children, and communities in need across Nigeria.
            </p>
            <div className="footer-social">
              <a href="https://x.com/opadolaci" className="footer-social-link" aria-label="X/Twitter" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" width="20" height="20">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/programs" className="footer-link">Programs</Link></li>
              <li><Link href="/events" className="footer-link">Impact</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Get Involved</h3>
            <ul className="footer-links">
              <li><Link href="/volunteer" className="footer-link">Volunteer</Link></li>
              <li><Link href="/donate" className="footer-link">Donate</Link></li>
              <li><Link href="/volunteer" className="footer-link">Partner With Us</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Contact Us</h3>
            <ul className="footer-links">
              <li>
                <span className="footer-link footer-link-address">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Ogun State, Nigeria
                </span>
              </li>
              <li>
                <a href="mailto:info@opadola.org" className="footer-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  info@opadola.org
                </a>
              </li>
              <li>
                <a href="tel:+2349163876000" className="footer-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +234 916 387 6000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Opadola Care Initiative. All rights reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <a href="#" className="footer-legal-link">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
