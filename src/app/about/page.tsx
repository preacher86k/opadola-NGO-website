import Link from "next/link";

export const metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. CINEMATIC HERO — Full Bleed */}
      <section className="ab-hero" aria-label="About hero">
        <div className="ab-hero-media">
          <img src="/images/gallery/IMG_1921.JPG" alt="" className="ab-hero-img" />
          <div className="ab-hero-gradient"></div>
        </div>
        <div className="ab-hero-content">
          <div className="ab-hero-eyebrow">
            <span className="ab-hero-line" aria-hidden="true"></span>
            <span className="ab-hero-tag">About Us</span>
            <span className="ab-hero-line" aria-hidden="true"></span>
          </div>
          <h1 className="ab-hero-title">
            Where Compassion
            <br />
            Becomes Lasting Change
          </h1>
          <p className="ab-hero-sub">
            We exist to restore dignity, expand opportunity, and strengthen
            communities — one life at a time.
          </p>
          <div className="ab-hero-actions">
            <a href="#story" className="ab-btn ab-btn-white">
              Our Story
            </a>
            <a href="#mission" className="ab-btn ab-btn-ghost">
              Our Mission
            </a>
          </div>
        </div>
        <div className="ab-hero-scroll" aria-hidden="true">
          <span className="ab-hero-scroll-text">Scroll</span>
          <span className="ab-hero-scroll-line"></span>
        </div>
      </section>

      {/* 2. EDITORIAL STORY — Asymmetric Layout */}
      <section id="story" className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-story-opening">
            <div className="ab-story-label">Our Story</div>
            <h2 className="ab-story-headline">
              Born from a
              <br />
              Legacy of Love
            </h2>
            <div className="ab-story-intro">
              <p className="ab-story-lead">
                Opadola Care Initiative was born from a deeply personal dream —
                the vision and legacy of our founder&apos;s late father, a man
                who believed that kindness knows no borders.
              </p>
              <p className="ab-story-body">
                After his passing, family members, seasoned professionals,
                passionate volunteers, and committed partners came together —
                not to mourn, but to mission.
              </p>
            </div>
          </div>

          <div className="ab-story-hero-image">
            <img
              src="/images/gallery/IMG_1927.JPG"
              alt="Community gathering at Opadola Care Initiative"
            />
            <div className="ab-story-caption">
              <span className="ab-story-caption-year">2024</span>
              <span className="ab-story-caption-text">
                The beginning of something beautiful
              </span>
            </div>
          </div>

          <div className="ab-story-columns">
            <div className="ab-story-col ab-story-col-text">
              <h3 className="ab-story-subhead">Growing Together</h3>
              <p>
                We launched our four core programs — Children&apos;s Rights,
                Senior Care, Poverty Relief, and Medical Support — reaching
                hundreds of families across Ogun State and beyond.
              </p>
              <p>
                Our volunteer network grew to include passionate individuals from
                all walks of life, united by a shared purpose.
              </p>
            </div>
            <div className="ab-story-col ab-story-col-image">
              <img
                src="/images/gallery/IMG_1936.JPG"
                alt="Programs launching across communities"
              />
            </div>
          </div>

          <div className="ab-story-closing">
            <div className="ab-story-closing-inner">
              <p className="ab-story-quote">
                Today, Opadola Care Initiative stands as a living tribute to
                that vision — an organization built not just on programs and
                projects, but on the unwavering belief that every person
                deserves to be seen, to be valued, and to be helped.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IMPACT NUMBERS — Animated Counters */}
      <section className="ab-impact">
        <div className="ab-impact-inner">
          <div className="ab-impact-item">
            <span className="ab-impact-number" data-target="2">
              0
            </span>
            <span className="ab-impact-suffix">+</span>
            <span className="ab-impact-label">Years of Service</span>
          </div>
          <div className="ab-impact-divider" aria-hidden="true"></div>
          <div className="ab-impact-item">
            <span className="ab-impact-number" data-target="500">
              0
            </span>
            <span className="ab-impact-suffix">+</span>
            <span className="ab-impact-label">Lives Touched</span>
          </div>
          <div className="ab-impact-divider" aria-hidden="true"></div>
          <div className="ab-impact-item">
            <span className="ab-impact-number" data-target="4">
              0
            </span>
            <span className="ab-impact-suffix"></span>
            <span className="ab-impact-label">Core Programs</span>
          </div>
          <div className="ab-impact-divider" aria-hidden="true"></div>
          <div className="ab-impact-item">
            <span className="ab-impact-number" data-target="10">
              0
            </span>
            <span className="ab-impact-suffix">+</span>
            <span className="ab-impact-label">Communities Served</span>
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION — Split Layout */}
      <section id="mission" className="ab-vision">
        <div className="ab-vision-inner">
          <div className="ab-vision-block ab-vision-mission">
            <div className="ab-vision-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v8M8 12h8"></path>
              </svg>
            </div>
            <div className="ab-vision-content">
              <span className="ab-vision-label">Our Mission</span>
              <h3 className="ab-vision-text">
                To restore dignity, expand opportunity, and strengthen
                communities through practical, sustainable, and people-centered
                solutions.
              </h3>
            </div>
          </div>

          <div className="ab-vision-block ab-vision-vision">
            <div className="ab-vision-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div className="ab-vision-content">
              <span className="ab-vision-label">Our Vision</span>
              <h3 className="ab-vision-text">
                A world where every person — regardless of age, religion, status,
                or circumstance — is seen, valued, and helped.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES — Visual Grid */}
      <section id="values" className="ab-values">
        <div className="ab-values-inner">
          <div className="ab-values-header">
            <span className="ab-values-label">Core Values</span>
            <h2 className="ab-values-title">
              The Principles That Guide Us
            </h2>
          </div>

          <div className="ab-values-grid">
            <div className="ab-value-card">
              <div className="ab-value-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="ab-value-name">Integrity</h3>
              <p className="ab-value-desc">
                Acting with honesty, accountability, and strong moral principles
                in everything we do.
              </p>
            </div>

            <div className="ab-value-card">
              <div className="ab-value-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="ab-value-name">Compassion</h3>
              <p className="ab-value-desc">
                Leading with empathy and kindness, putting people first in every
                decision we make.
              </p>
            </div>

            <div className="ab-value-card">
              <div className="ab-value-icon">
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
              <h3 className="ab-value-name">Empowerment</h3>
              <p className="ab-value-desc">
                Not just giving, but equipping people with tools and education
                to thrive independently.
              </p>
            </div>

            <div className="ab-value-card">
              <div className="ab-value-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
              </div>
              <h3 className="ab-value-name">Accountability</h3>
              <p className="ab-value-desc">
                Every donation, partnership, and volunteer hour stewarded with
                transparency.
              </p>
            </div>

            <div className="ab-value-card">
              <div className="ab-value-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="M2 12h20"></path>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 className="ab-value-name">Sustainability</h3>
              <p className="ab-value-desc">
                Building people up so they can thrive on their own, creating
                lasting change.
              </p>
            </div>

            <div className="ab-value-card">
              <div className="ab-value-icon">
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
              <h3 className="ab-value-name">Community</h3>
              <p className="ab-value-desc">
                Working together with communities to create sustainable solutions
                that endure.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* 7. WHY WE EXIST — Quote Statement */}
      <section className="ab-why">
        <div className="ab-why-media">
          <img
            src="/images/gallery/IMG_1926.JPG"
            alt=""
            className="ab-why-img"
          />
          <div className="ab-why-gradient"></div>
        </div>
        <div className="ab-why-content">
          <div className="ab-why-mark" aria-hidden="true">
            &ldquo;
          </div>
          <blockquote className="ab-why-quote">
            Every person, regardless of age, religion, status, or circumstance,
            deserves to be seen, to be valued, and to be helped. That belief is
            why Opadola exists.
          </blockquote>
          <cite className="ab-why-author">
            — The Vision of Our Founder
          </cite>
        </div>
      </section>

      {/* 8. CALL TO ACTION — Conversion Cards */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <div className="ab-cta-header">
            <span className="ab-cta-label">Get Involved</span>
            <h2 className="ab-cta-title">Be Part of the Change</h2>
          </div>

          <div className="ab-cta-grid">
            <Link href="/volunteer" className="ab-cta-card">
              <div className="ab-cta-icon">
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
              <h3 className="ab-cta-heading">Volunteer</h3>
              <p className="ab-cta-desc">
                Join our team of dedicated volunteers making a real difference
                in communities.
              </p>
              <span className="ab-cta-arrow">
                Learn More
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>

            <Link href="/donate" className="ab-cta-card ab-cta-featured">
              <div className="ab-cta-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="ab-cta-heading">Donate</h3>
              <p className="ab-cta-desc">
                Your generosity helps us continue our mission of restoring dignity
                and hope.
              </p>
              <span className="ab-cta-arrow">
                Donate Now
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>

            <Link href="/contact" className="ab-cta-card">
              <div className="ab-cta-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="ab-cta-heading">Contact</h3>
              <p className="ab-cta-desc">
                Have questions? We&apos;d love to hear from you and explore how
                we can work together.
              </p>
              <span className="ab-cta-arrow">
                Get in Touch
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
