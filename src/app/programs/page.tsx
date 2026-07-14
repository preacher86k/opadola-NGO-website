import Link from "next/link";
import { getPageMedia, mediaTitle } from "@/lib/media";

export const metadata = {
  title: "Programs",
};

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const programMedia = await getPageMedia("opadola/programs", 8);

  return (
    <>
      {/* Hero Section */}
      <section className="programs-hero">
        <div className="programs-hero-content">
          <span className="programs-hero-badge">Our Programs</span>
          <h1 className="programs-hero-title">
            Transforming Lives Through Compassionate Action
          </h1>
          <p className="programs-hero-subtitle">
            Our work is guided by compassion, accountability, collaboration,
            and respect. We listen to local needs, work with trusted partners,
            and develop practical solutions for lasting impact.
          </p>
          <div className="programs-hero-cta">
            <a href="#programs" className="btn btn-white btn-lg">
              Our Programs
            </a>
            <a href="#approach" className="btn btn-white btn-lg">
              Our Approach
            </a>
          </div>
        </div>
      </section>

      {/* Programs Grid Section */}
      <section id="programs" className="programs-grid">
        <div className="programs-grid-header">
          <span className="programs-grid-label">What We Do</span>
          <h2 className="programs-grid-title">Our Core Programs</h2>
          <p className="programs-grid-text">
            We focus on four key areas to create lasting change in communities
            across Nigeria.
          </p>
        </div>

        <div className="programs-grid-cards">
          <article className="program-card">
            <div className="program-card-image">
              <img
                src="/images/gallery/IMG_1920.JPG"
                alt="Children's education support"
                loading="lazy"
              />
              <div className="program-card-overlay"></div>
              <div className="program-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <div className="program-card-content">
              <span className="program-card-category">Program 01</span>
              <h3 className="program-card-title">
                Children&apos;s Rights & Support Services
              </h3>
              <p className="program-card-text">
                We advocate for children&apos;s rights and promote their
                wellbeing, education, and development through community
                engagement, educational assistance, child protection, and access
                to essential services.
              </p>
              <button
                className="program-card-link"
                data-program-modal="children"
                type="button"
              >
                Learn More
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </article>

          <article className="program-card">
            <div className="program-card-image">
              <img
                src="/images/gallery/IMG_1916.JPG"
                alt="Senior care support"
                loading="lazy"
              />
              <div className="program-card-overlay"></div>
              <div className="program-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
            <div className="program-card-content">
              <span className="program-card-category">Program 02</span>
              <h3 className="program-card-title">
                Senior Care & Empowerment
              </h3>
              <p className="program-card-text">
                Medical outreach, wellness support, social inclusion, and
                practical assistance focused on elderly individuals in
                underserved communities.
              </p>
              <button
                className="program-card-link"
                data-program-modal="seniors"
                type="button"
              >
                Learn More
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </article>

          <article className="program-card">
            <div className="program-card-image">
              <img
                src="/images/gallery/IMG_1774.JPG"
                alt="Poverty relief efforts"
                loading="lazy"
              />
              <div className="program-card-overlay"></div>
              <div className="program-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
            </div>
            <div className="program-card-content">
              <span className="program-card-category">Program 03</span>
              <h3 className="program-card-title">Poverty Relief</h3>
              <p className="program-card-text">
                Emergency assistance, livelihood support, skills development,
                and community-based empowerment initiatives for sustainable
                pathways out of poverty.
              </p>
              <button
                className="program-card-link"
                data-program-modal="poverty"
                type="button"
              >
                Learn More
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </article>

          <article className="program-card">
            <div className="program-card-image">
              <img
                src="/images/gallery/IMG_1928.JPG"
                alt="Medical outreach"
                loading="lazy"
              />
              <div className="program-card-overlay"></div>
              <div className="program-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
            </div>
            <div className="program-card-content">
              <span className="program-card-category">Program 04</span>
              <h3 className="program-card-title">
                Medical Support for the Less Privileged
              </h3>
              <p className="program-card-text">
                Free medical outreaches, health screenings, referrals, and
                health education ensuring vulnerable individuals receive timely
                care regardless of financial circumstances.
              </p>
              <button
                className="program-card-link"
                data-program-modal="medical"
                type="button"
              >
                Learn More
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </article>
        </div>
      </section>

      {programMedia.length > 0 && (
        <section className="page-media-showcase" aria-labelledby="programs-media-heading">
          <div className="page-media-header">
            <span className="page-media-label">Latest Program Media</span>
            <h2 id="programs-media-heading" className="page-media-title">New Program Moments</h2>
            <p className="page-media-text">Photos uploaded from the admin media library for the Programs page.</p>
          </div>
          <div className="page-media-grid">
            {programMedia.map((item) => (
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

      {/* Approach Section */}
      <section id="approach" className="programs-approach">
        <div className="programs-approach-grid">
          <div className="programs-approach-content">
            <span className="programs-approach-label">Our Approach</span>
            <h2 className="programs-approach-title">How We Work</h2>
            <p className="programs-approach-text">
              Our approach is rooted in listening to communities, partnering
              with trusted local organizations, and creating sustainable
              solutions that create lasting impact.
            </p>
            <p className="programs-approach-text">
              We believe in empowering communities rather than creating
              dependency. Every program is designed with sustainability at its
              core.
            </p>

            <div className="programs-approach-features">
              <div className="programs-approach-feature">
                <div className="programs-approach-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="programs-approach-feature-text">
                  Listen First
                </span>
              </div>
              <div className="programs-approach-feature">
                <div className="programs-approach-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
                <span className="programs-approach-feature-text">
                  Partner Together
                </span>
              </div>
              <div className="programs-approach-feature">
                <div className="programs-approach-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <span className="programs-approach-feature-text">
                  Create Impact
                </span>
              </div>
              <div className="programs-approach-feature">
                <div className="programs-approach-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M2 12h20"></path>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <span className="programs-approach-feature-text">
                  Sustainability Focus
                </span>
              </div>
            </div>
          </div>

          <div className="programs-approach-image">
            <img
              src="/images/gallery/IMG_1927.JPG"
              alt="Community gathering"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="programs-impact">
        <div className="programs-impact-content">
          <span className="programs-impact-label">Our Impact</span>
          <h2 className="programs-impact-title">
            Making a Difference Together
          </h2>
          <p className="programs-impact-text">
            Since our founding, we have worked tirelessly to create lasting
            change in communities across Nigeria.
          </p>

          <div className="programs-impact-grid">
            <div className="programs-impact-card">
              <div className="programs-impact-number"><span className="programs-impact-value" data-target="500">0</span><span className="programs-impact-suffix">+</span></div>
              <p className="programs-impact-label">Lives Touched</p>
            </div>
            <div className="programs-impact-card">
              <div className="programs-impact-number"><span className="programs-impact-value" data-target="4">0</span></div>
              <p className="programs-impact-label">Core Programs</p>
            </div>
            <div className="programs-impact-card">
              <div className="programs-impact-number"><span className="programs-impact-value" data-target="10">0</span><span className="programs-impact-suffix">+</span></div>
              <p className="programs-impact-label">Communities Served</p>
            </div>
            <div className="programs-impact-card">
              <div className="programs-impact-number"><span className="programs-impact-value" data-target="2">0</span><span className="programs-impact-suffix">+</span></div>
              <p className="programs-impact-label">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="programs-cta">
        <div className="programs-cta-grid">
          <div className="programs-cta-card">
            <div className="programs-cta-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3 className="programs-cta-title">Donate Now</h3>
            <p className="programs-cta-text">
              Your generosity helps us continue our mission of restoring dignity
              and hope.
            </p>
            <Link href="/donate" className="programs-cta-btn">
              Donate
            </Link>
          </div>

          <div className="programs-cta-card">
            <div className="programs-cta-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="programs-cta-title">Volunteer With Us</h3>
            <p className="programs-cta-text">
              Join our team of dedicated volunteers making a difference in
              communities.
            </p>
            <Link href="/volunteer" className="programs-cta-btn">
              Volunteer
            </Link>
          </div>

          <div className="programs-cta-card">
            <div className="programs-cta-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="programs-cta-title">Contact Us</h3>
            <p className="programs-cta-text">
              Have questions? We&apos;d love to hear from you.
            </p>
            <Link href="/contact" className="programs-cta-btn">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Program Modals */}
      <div className="program-modals" aria-hidden="true">
        {/* Children&apos;s Rights Modal */}
        <div
          className="program-modal"
          id="modal-children"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-children-title"
        >
          <div className="program-modal-overlay" tabIndex={-1}></div>
          <div className="program-modal-container">
            <div className="program-modal-hero">
              <img
                src="/images/gallery/IMG_1920.JPG"
                alt=""
                className="program-modal-hero-img"
              />
              <div className="program-modal-hero-overlay"></div>
              <span className="program-modal-badge">Program 01</span>
              <button className="program-modal-close" aria-label="Close modal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="program-modal-body">
              <h2
                className="program-modal-title"
                id="modal-children-title"
              >
                Children&apos;s Rights & Support Services
              </h2>
              <p className="program-modal-subtitle">
                Advocating for children&apos;s rights and promoting their
                wellbeing, education, and development through community
                engagement and protection services.
              </p>
              <div className="program-modal-content">
                <div className="program-modal-text">
                  <p>
                    Our Children&apos;s Rights & Support Services program is
                    dedicated to ensuring that every child in our communities has
                    access to education, protection, and the support they need to
                    reach their full potential.
                  </p>
                  <p>
                    We work with families, schools, and community leaders to
                    create environments where children can learn, grow, and
                    thrive. From providing school supplies to advocating for child
                    protection policies, we are committed to building a brighter
                    future for the next generation.
                  </p>
                  <h3>Our Focus Areas</h3>
                  <ul className="program-modal-list">
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Educational assistance and school supplies
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Child protection and advocacy
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Access to essential health services
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Community engagement and family support
                    </li>
                  </ul>
                </div>
                <div className="program-modal-image">
                  <img
                    src="/images/gallery/IMG_1920.JPG"
                    alt="Children's education support"
                  />
                </div>
              </div>
              <div className="program-modal-cta">
                <Link
                  href="/donate"
                  className="btn btn-primary btn-lg"
                >
                  Donate to This Program
                </Link>
                <button
                  className="btn btn-outline btn-lg program-modal-close-btn"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Senior Care Modal */}
        <div
          className="program-modal"
          id="modal-seniors"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-seniors-title"
        >
          <div className="program-modal-overlay" tabIndex={-1}></div>
          <div className="program-modal-container">
            <div className="program-modal-hero">
              <img
                src="/images/gallery/IMG_1916.JPG"
                alt=""
                className="program-modal-hero-img"
              />
              <div className="program-modal-hero-overlay"></div>
              <span className="program-modal-badge">Program 02</span>
              <button className="program-modal-close" aria-label="Close modal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="program-modal-body">
              <h2 className="program-modal-title" id="modal-seniors-title">
                Senior Care & Empowerment
              </h2>
              <p className="program-modal-subtitle">
                Medical outreach, wellness support, social inclusion, and
                practical assistance for elderly individuals in underserved
                communities.
              </p>
              <div className="program-modal-content">
                <div className="program-modal-text">
                  <p>
                    Our Senior Care & Empowerment program ensures that elderly
                    individuals in underserved communities receive the medical
                    attention, social support, and practical assistance they
                    deserve.
                  </p>
                  <p>
                    We organize regular medical outreach camps specifically
                    designed for seniors, providing free health screenings,
                    medications, and wellness education. Beyond healthcare, we
                    facilitate social activities and community engagement to
                    combat isolation and promote mental wellbeing.
                  </p>
                  <h3>Our Services</h3>
                  <ul className="program-modal-list">
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Free medical check-ups and health screenings
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Wellness and nutrition education
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Social activities and community engagement
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Practical support and emergency assistance
                    </li>
                  </ul>
                </div>
                <div className="program-modal-image">
                  <img
                    src="/images/gallery/IMG_1916.JPG"
                    alt="Elderly care support"
                  />
                </div>
              </div>
              <div className="program-modal-cta">
                <Link
                  href="/donate"
                  className="btn btn-primary btn-lg"
                >
                  Donate to This Program
                </Link>
                <button
                  className="btn btn-outline btn-lg program-modal-close-btn"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Poverty Relief Modal */}
        <div
          className="program-modal"
          id="modal-poverty"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-poverty-title"
        >
          <div className="program-modal-overlay" tabIndex={-1}></div>
          <div className="program-modal-container">
            <div className="program-modal-hero">
              <img
                src="/images/gallery/IMG_1774.JPG"
                alt=""
                className="program-modal-hero-img"
              />
              <div className="program-modal-hero-overlay"></div>
              <span className="program-modal-badge">Program 03</span>
              <button className="program-modal-close" aria-label="Close modal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="program-modal-body">
              <h2 className="program-modal-title" id="modal-poverty-title">
                Poverty Relief
              </h2>
              <p className="program-modal-subtitle">
                Emergency assistance, livelihood support, and skills
                development for sustainable pathways out of poverty.
              </p>
              <div className="program-modal-content">
                <div className="program-modal-text">
                  <p>
                    Our Poverty Relief program provides emergency assistance and
                    sustainable solutions to help families break free from the
                    cycle of poverty. We believe in empowering people with the
                    tools they need to build better lives.
                  </p>
                  <p>
                    From emergency food relief to long-term skills training, our
                    approach addresses both immediate needs and root causes. We
                    work with communities to identify sustainable livelihood
                    opportunities and provide the support needed to make them
                    reality.
                  </p>
                  <h3>Our Approach</h3>
                  <ul className="program-modal-list">
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Emergency food and supply distribution
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Skills training and livelihood support
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Micro-enterprise development support
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Community-based empowerment initiatives
                    </li>
                  </ul>
                </div>
                <div className="program-modal-image">
                  <img
                    src="/images/gallery/IMG_1774.JPG"
                    alt="Poverty relief efforts"
                  />
                </div>
              </div>
              <div className="program-modal-cta">
                <Link
                  href="/donate"
                  className="btn btn-primary btn-lg"
                >
                  Donate to This Program
                </Link>
                <button
                  className="btn btn-outline btn-lg program-modal-close-btn"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Support Modal */}
        <div
          className="program-modal"
          id="modal-medical"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-medical-title"
        >
          <div className="program-modal-overlay" tabIndex={-1}></div>
          <div className="program-modal-container">
            <div className="program-modal-hero">
              <img
                src="/images/gallery/IMG_1928.JPG"
                alt=""
                className="program-modal-hero-img"
              />
              <div className="program-modal-hero-overlay"></div>
              <span className="program-modal-badge">Program 04</span>
              <button className="program-modal-close" aria-label="Close modal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="program-modal-body">
              <h2 className="program-modal-title" id="modal-medical-title">
                Medical Support for the Less Privileged
              </h2>
              <p className="program-modal-subtitle">
                Free medical outreaches, health screenings, and health
                education ensuring vulnerable individuals receive timely care.
              </p>
              <div className="program-modal-content">
                <div className="program-modal-text">
                  <p>
                    Access to healthcare shouldn&apos;t depend on income. Our
                    Medical Support program provides free medical outreaches,
                    health screenings, and essential medications to vulnerable
                    individuals across Nigeria.
                  </p>
                  <p>
                    We organize regular medical camps staffed by volunteer
                    healthcare professionals, providing everything from basic
                    health screenings to referrals for specialized care. Our
                    health education initiatives empower communities to take
                    charge of their own wellbeing.
                  </p>
                  <h3>Our Services</h3>
                  <ul className="program-modal-list">
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Free medical outreaches and health camps
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Health screenings (BP, diabetes, malaria)
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Free essential medications
                    </li>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Health education and disease prevention
                    </li>
                  </ul>
                </div>
                <div className="program-modal-image">
                  <img
                    src="/images/gallery/IMG_1928.JPG"
                    alt="Medical outreach"
                  />
                </div>
              </div>
              <div className="program-modal-cta">
                <Link
                  href="/donate"
                  className="btn btn-primary btn-lg"
                >
                  Donate to This Program
                </Link>
                <button
                  className="btn btn-outline btn-lg program-modal-close-btn"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
