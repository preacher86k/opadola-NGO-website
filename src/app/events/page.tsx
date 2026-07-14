import Link from "next/link";
import { getPageMedia, mediaTitle } from "@/lib/media";

export const metadata = {
  title: "Events & Impact",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const eventMedia = await getPageMedia("opadola/events", 9);

  return (
    <>
      {/* Hero Section */}
      <section className="events-hero">
        <div className="events-hero-content">
          <span className="events-hero-badge">Events & Impact</span>
          <h1 className="events-hero-title">Every Project, A Testament to Our Commitment</h1>
          <p className="events-hero-subtitle">From medical outreach to educational empowerment, every project is a testament to our commitment to care without borders.</p>
          <div className="events-hero-cta">
            <a href="#projects" className="btn btn-white btn-lg">Our Projects</a>
            <a href="#impact" className="btn btn-white btn-lg">Our Impact</a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="events-projects">
        <div className="events-projects-header">
          <span className="events-projects-label">Featured Projects</span>
          <h2 className="events-projects-title">Our Key Initiatives</h2>
          <p className="events-projects-text">
            From medical outreach to educational empowerment, every project is a testament to our commitment to care without borders.
          </p>
        </div>

        <div className="events-projects-grid">
          <article className="project-card">
            <div className="project-card-image">
              <img src="/images/gallery/IMG_1928.JPG" alt="Medical Outreach 2026" loading="lazy" />
              <div className="project-card-overlay"></div>
              <span className="project-card-badge">Ongoing</span>
            </div>
            <div className="project-card-content">
              <span className="project-card-category">Medical Support</span>
              <h3 className="project-card-title">Medical Outreach 2026</h3>
              <p className="project-card-text">Our flagship project providing free, quality healthcare for senior citizens in rural communities.</p>
              <div className="project-card-meta">
                <span className="project-card-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  March — June 2026
                </span>
                <span className="project-card-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Abuja, Nigeria
                </span>
              </div>
            </div>
          </article>

          <article className="project-card">
            <div className="project-card-image">
              <img src="/images/gallery/IMG_1939.JPG" alt="Educational Support Initiative" loading="lazy" />
              <div className="project-card-overlay"></div>
              <span className="project-card-badge project-card-badge-completed">Completed</span>
            </div>
            <div className="project-card-content">
              <span className="project-card-category">Education</span>
              <h3 className="project-card-title">Educational Support Initiative</h3>
              <p className="project-card-text">A partnership providing laptops to the Computer Science Department to bridge the digital divide.</p>
              <div className="project-card-meta">
                <span className="project-card-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  Gateway ICT Polytechnic
                </span>
                <span className="project-card-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Saapade, Ogun State
                </span>
              </div>
            </div>
          </article>

          <article className="project-card">
            <div className="project-card-image">
              <img src="/images/gallery/IMG_1927.JPG" alt="Community Development Program" loading="lazy" />
              <div className="project-card-overlay"></div>
              <span className="project-card-badge">Ongoing</span>
            </div>
            <div className="project-card-content">
              <span className="project-card-category">Community</span>
              <h3 className="project-card-title">Community Development Program</h3>
              <p className="project-card-text">Comprehensive community development initiatives focused on sustainable growth and empowerment.</p>
              <div className="project-card-meta">
                <span className="project-card-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  2025 — Present
                </span>
                <span className="project-card-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Isara, Ogun State
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-upcoming">
        <div className="events-upcoming-header">
          <span className="events-upcoming-label">Upcoming Events</span>
          <h2 className="events-upcoming-title">Join Our Next Initiative</h2>
          <p className="events-upcoming-text">
            Be part of our upcoming events and help us create lasting change in communities.
          </p>
        </div>

        <div className="events-upcoming-grid">
          <div className="event-card">
            <div className="event-card-date">
              <span className="event-card-date-month">Aug</span>
              <span className="event-card-date-day">15</span>
            </div>
            <div className="event-card-content">
              <span className="event-card-category">Medical</span>
              <h3 className="event-card-title">Community Health Screening</h3>
              <p className="event-card-text">Free health screening for senior citizens in Isara community.</p>
              <a href="#" className="event-card-link">
                Learn More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </div>
          </div>

          <div className="event-card">
            <div className="event-card-date">
              <span className="event-card-date-month">Sep</span>
              <span className="event-card-date-day">20</span>
            </div>
            <div className="event-card-content">
              <span className="event-card-category">Education</span>
              <h3 className="event-card-title">Back to School Drive</h3>
              <p className="event-card-text">Providing educational materials to children in underserved communities.</p>
              <a href="#" className="event-card-link">
                Learn More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {eventMedia.length > 0 && (
        <section className="page-media-showcase" aria-labelledby="events-media-heading">
          <div className="page-media-header">
            <span className="page-media-label">Latest Event Media</span>
            <h2 id="events-media-heading" className="page-media-title">Fresh Moments From Our Events</h2>
            <p className="page-media-text">Photos uploaded from the admin media library for the Events page.</p>
          </div>
          <div className="page-media-grid">
            {eventMedia.map((item) => (
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

      {/* Impact Section */}
      <section id="impact" className="events-impact">
        <div className="events-impact-content">
          <span className="events-impact-label">Our Impact</span>
          <h2 className="events-impact-title">Making a Difference Together</h2>
          <p className="events-impact-text">
            Since our founding, we have worked tirelessly to create lasting change in communities across Nigeria.
          </p>

          <div className="events-impact-grid">
            <div className="events-impact-card">
              <div className="events-impact-number"><span className="events-impact-value" data-target="500">0</span><span className="events-impact-suffix">+</span></div>
              <p className="events-impact-label">Lives Touched</p>
            </div>
            <div className="events-impact-card">
              <div className="events-impact-number"><span className="events-impact-value" data-target="4">0</span></div>
              <p className="events-impact-label">Core Programs</p>
            </div>
            <div className="events-impact-card">
              <div className="events-impact-number"><span className="events-impact-value" data-target="10">0</span><span className="events-impact-suffix">+</span></div>
              <p className="events-impact-label">Communities Served</p>
            </div>
            <div className="events-impact-card">
              <div className="events-impact-number"><span className="events-impact-value" data-target="2">0</span><span className="events-impact-suffix">+</span></div>
              <p className="events-impact-label">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="events-cta">
        <div className="events-cta-grid">
          <div className="events-cta-card">
            <div className="events-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3 className="events-cta-title">Donate Now</h3>
            <p className="events-cta-text">Your generosity helps us continue our mission of restoring dignity and hope.</p>
            <Link href="/donate" className="events-cta-btn">Donate</Link>
          </div>

          <div className="events-cta-card">
            <div className="events-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="events-cta-title">Volunteer With Us</h3>
            <p className="events-cta-text">Join our team of dedicated volunteers making a difference in communities.</p>
            <Link href="/volunteer" className="events-cta-btn">Volunteer</Link>
          </div>

          <div className="events-cta-card">
            <div className="events-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="events-cta-title">Contact Us</h3>
            <p className="events-cta-text">Have questions? We&apos;d love to hear from you.</p>
            <Link href="/contact" className="events-cta-btn">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
