import Link from "next/link";
import { getPageMedia, mediaTitle } from "@/lib/media";

export const metadata = {
  title: "Our Team",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const teamMedia = await getPageMedia("opadola/team", 8);

  return (
    <>
      {/* Hero Section */}
      <section className="team-hero" data-animate="fade-in">
        <div className="team-hero-content">
          <span className="team-hero-badge">Our Team</span>
          <h1 className="team-hero-title">The Hearts Behind the Mission</h1>
          <p className="team-hero-subtitle">Meet the dedicated individuals who guide, govern, and give their hearts to Opadola Care Initiative.</p>
          <div className="team-hero-cta">
            <a href="#founder" className="btn btn-white btn-lg">Our Founder</a>
            <a href="#board" className="btn btn-white btn-lg">Board of Trustees</a>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="team-founder">
        <div className="team-founder-grid">
          <div className="team-founder-content reveal-right">
            <span className="team-founder-label">Founder</span>
            <h2 className="team-founder-title">Kayode Olufemi O.</h2>
            <p className="team-founder-role">Founder & Executive Director</p>
            <p className="team-founder-text">
              Humanitarian and community leader committed to leading free medical care for elderly and educational support for children in underserved communities across Nigeria.
            </p>
            <p className="team-founder-text">
              Kayode&apos;s vision for OCI stems from a deeply personal dream — the legacy of his late father, a man who believed that kindness knows no borders. Today, that vision lives on through the work of OCI.
            </p>
            <div className="team-founder-social">
              <a href="https://www.linkedin.com/in/kayode-opadola-o-3a5b36b9" className="team-founder-social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/kayodeoci" className="team-founder-social-link" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>

          <div className="team-founder-image-wrapper reveal-left">
            <div className="team-founder-image">
              <img src="/images/team/ceo.JPG" alt="Kayode Olufemi O." loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Board Section */}
      <section id="board" className="team-board">
        <div className="team-board-header" data-animate="fade-in">
          <span className="team-board-label">Board of Trustees</span>
          <h2 className="team-board-title">Our Leadership Team</h2>
          <p className="team-board-text">
            Meet the dedicated individuals who guide and govern our organization.
          </p>
        </div>

        <div className="team-board-grid stagger-children">
          <div className="team-member-card team-member-card-reveal">
            <div className="team-member-image">
              <img src="/images/team/joy2.JPG" alt="Afolashade Joy Jubrilla" loading="lazy" />
              <div className="team-member-overlay">
                <a href="https://www.linkedin.com/in/afolashadejubrilla" className="team-member-social" target="_blank" rel="noopener" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div className="team-member-content">
              <h3 className="team-member-name">Afolashade Joy Jubrilla</h3>
              <p className="team-member-title">Head of Partnerships | Emergency Response Volunteer</p>
              <p className="team-member-bio">Governance and development strategist with expertise in strategic partnerships, institutional governance, and stakeholder engagement.</p>
            </div>
          </div>

          <div className="team-member-card">
            <div className="team-member-image">
              <img src="/images/team/adaobi.JPG" alt="Adaobi Umo-Etuk" loading="lazy" />
              <div className="team-member-overlay">
                <a href="https://www.linkedin.com/in/adaobi-yvonne-umo-etuk-92318172" className="team-member-social" target="_blank" rel="noopener" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div className="team-member-content">
              <h3 className="team-member-name">Adaobi Umo-Etuk</h3>
              <p className="team-member-title">Secretary</p>
              <p className="team-member-bio">Nigerian banking and compliance professional with expertise in regulatory compliance, governance, and organizational integrity.</p>
            </div>
          </div>

          <div className="team-member-card">
            <div className="team-member-image">
              <img src="/images/team/adesanya.JPG" alt="Adesanya Oluwasegun Emmanuel" loading="lazy" />
              <div className="team-member-overlay">
                <a href="https://linkedin.com" className="team-member-social" target="_blank" rel="noopener" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div className="team-member-content">
              <h3 className="team-member-name">Adesanya Oluwasegun Emmanuel</h3>
              <p className="team-member-title">Team Lead | Humanitarian Project Assistant</p>
              <p className="team-member-bio">Nigerian public servant and community development advocate dedicated to supporting humanitarian projects and community empowerment.</p>
            </div>
          </div>

          <div className="team-member-card">
            <div className="team-member-image">
              <img src="/images/team/michael pedro.JPG" alt="Michael Pedro" loading="lazy" />
              <div className="team-member-overlay">
                <a href="https://www.linkedin.com/in/michael-pedro-6865202b" className="team-member-social" target="_blank" rel="noopener" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div className="team-member-content">
              <h3 className="team-member-name">Michael Pedro</h3>
              <p className="team-member-title">Program Support Volunteer | Humanitarian Project Assistant</p>
              <p className="team-member-bio">Public health and project management professional with 15+ years in health information systems, M&E, and programme implementation.</p>
            </div>
          </div>
        </div>
      </section>

      {teamMedia.length > 0 && (
        <section className="page-media-showcase" aria-labelledby="team-media-heading">
          <div className="page-media-header">
            <span className="page-media-label">Latest Team Media</span>
            <h2 id="team-media-heading" className="page-media-title">New Moments From Our Team</h2>
            <p className="page-media-text">Photos uploaded from the admin media library for the Team page.</p>
          </div>
          <div className="page-media-grid">
            {teamMedia.map((item) => (
              <article className="page-media-card" key={item.id}>
                <img src={item.url} alt={mediaTitle(item.publicId)} loading="lazy" />
                <div className="page-media-overlay">
                  <span>{mediaTitle(item.publicId)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="team-values">
        <div className="team-values-header" data-animate="fade-in">
          <span className="team-values-label">Our Culture</span>
          <h2 className="team-values-title">What Drives Us</h2>
          <p className="team-values-text">
            Our team is united by shared values that guide everything we do.
          </p>
        </div>

        <div className="team-values-grid stagger-children">
          <div className="team-value-card">
            <div className="team-value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3 className="team-value-title">Passion</h3>
            <p className="team-value-text">We are driven by a deep commitment to making a difference in the lives of vulnerable individuals.</p>
          </div>

          <div className="team-value-card">
            <div className="team-value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="team-value-title">Collaboration</h3>
            <p className="team-value-text">We work together as a team and with communities to create sustainable solutions.</p>
          </div>

          <div className="team-value-card">
            <div className="team-value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="team-value-title">Integrity</h3>
            <p className="team-value-text">We act with honesty and transparency in everything we do.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="team-cta" data-animate="fade-in">
        <div className="team-cta-content">
          <span className="team-cta-label">Join Us</span>
          <h2 className="team-cta-title">Want to Join Our Team?</h2>
          <p className="team-cta-text">
            We&apos;re always looking for passionate individuals who share our commitment to making a difference.
          </p>
          <div className="team-cta-buttons">
            <Link href="/volunteer" className="btn btn-white btn-lg">Become a Volunteer</Link>
            <Link href="/contact" className="btn btn-white btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
