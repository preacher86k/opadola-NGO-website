import Link from "next/link";
import PulsingBorder from "@/components/ui/PulsingBorder";
import SpinImage from "@/components/ui/SpinImage";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            name: "Opadola Care Initiative",
            url: "https://opadola.org",
            logo: "https://opadola.org/images/logo.gif",
            description:
              "Providing Support for the most Vulnerable in the society — the elderly, children, and communities in need across Nigeria.",
            foundingDate: "2024",
            address: {
              "@type": "PostalAddress",
              streetAddress: "120 Ola Mummy Junction, along Odemo Road Isara",
              addressLocality: "Ogun State",
              addressCountry: "NG",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+2349163876000",
              contactType: "customer service",
            },
            sameAs: ["https://x.com/opadolaci"],
          }),
        }}
      />

      {/* ============================================
           1. HERO SECTION
           ============================================ */}
      <section className="hero" id="home" aria-label="Hero section">
        <div className="hero-atmosphere" aria-hidden="true">
          <div className="atmo-gradient-green" />
          <div className="atmo-gradient-blue" />
          <div className="atmo-heart-glow" />
          <div className="atmo-headline-glow" />
          <div className="atmo-env-blue" />
          <div className="atmo-bloom" />
          <div className="atmo-shape atmo-shape-1" />
          <div className="atmo-shape atmo-shape-2" />
          <div className="atmo-vignette" />
        </div>

        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title reveal">
                Building <span className="text-green">Hope.</span><br />
                Transforming <span className="text-green">Lives.</span><br />
                Creating Legacy.
              </h1>

              <p className="hero-description reveal">
                We empower vulnerable communities through compassionate care, sustainable programs, and lasting impact.
              </p>

              <div className="hero-actions reveal">
                <Link href="/donate" className="btn btn-primary btn-lg">
                  Donate Now
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </Link>
                <Link href="/programs" className="btn btn-outline btn-lg">
                  Explore Our Work
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="hero-visual reveal-right">
              <div className="hero-image-wrapper">
                <img
                  src="/images/gallery/IMG_1939.JPG"
                  alt="Opadola Care Initiative community outreach program"
                  loading="eager"
                  className="hero-image"
                />

                <div className="hero-decorations" aria-hidden="true">
                  <svg className="hero-curve" viewBox="0 0 200 200" fill="none">
                    <path d="M10 190 Q100 10 190 100" stroke="#0A5C36" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  </svg>
                  <div className="hero-sparkle hero-sparkle-1">
                    <svg viewBox="0 0 24 24" fill="#0A5C36">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                  </div>
                  <div className="hero-sparkle hero-sparkle-2">
                    <svg viewBox="0 0 24 24" fill="#C9963B">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="hero-callout reveal">
                <span className="hero-callout-text">
                  Our journey of hope<br />starts with you
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           2. STATS STRIP
            ============================================ */}
      <section className="stats-strip" aria-label="Impact statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item reveal">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="stat-number">
                <span className="stat-value" data-target="2">0</span><span className="stat-suffix">+</span>
              </div>
              <div className="stat-label">Years of Service</div>
            </div>

            <div className="stat-item reveal">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="stat-number">
                <span className="stat-value" data-target="500">0</span><span className="stat-suffix">+</span>
              </div>
              <div className="stat-label">Lives Impacted</div>
            </div>

            <div className="stat-item reveal">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="stat-number">
                <span className="stat-value" data-target="25">0</span><span className="stat-suffix">+</span>
              </div>
              <div className="stat-label">Projects Completed</div>
            </div>

            <div className="stat-item reveal">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-number">
                <span className="stat-value" data-target="10">0</span><span className="stat-suffix"></span>
              </div>
              <div className="stat-label">Communities Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           3. PROGRAMS SECTION
           ============================================ */}
      <section className="programs" id="programs" aria-labelledby="programs-heading">
        <div className="container">
          <div className="programs-header reveal">
            <span className="programs-caption">TOGETHER, WE&apos;RE MAKING AN IMPACT</span>
            <h2 id="programs-heading" className="programs-title">Programs That Create Lasting Change</h2>
          </div>

          <div className="programs-grid">
            <PulsingBorder borderRadius={20} as="article" className="program-card reveal">
              <div className="program-card-image">
                <img src="/images/gallery/IMG_1941.JPG" alt="Education and empowerment programs" loading="lazy" />
              </div>
              <div className="program-card-content">
                <div className="program-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 className="program-card-title">Education</h3>
                <p className="program-card-text">Empowering minds for a brighter future.</p>
                <Link href="/programs" className="program-card-link">
                  Learn More
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </PulsingBorder>

            <PulsingBorder borderRadius={20} as="article" className="program-card reveal">
              <div className="program-card-image">
                <img src="/images/gallery/IMG_1780.JPG" alt="Medical outreach providing care" loading="lazy" />
              </div>
              <div className="program-card-content">
                <div className="program-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="program-card-title">Healthcare</h3>
                <p className="program-card-text">Improving health, transforming lives.</p>
                <Link href="/programs" className="program-card-link">
                  Learn More
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </PulsingBorder>

            <PulsingBorder borderRadius={20} as="article" className="program-card reveal">
              <div className="program-card-image">
                <img src="/images/gallery/IMG_1295.jpg" alt="Community support distribution" loading="lazy" />
              </div>
              <div className="program-card-content">
                <div className="program-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="program-card-title">Child &amp; Youth</h3>
                <p className="program-card-text">Nurturing today&apos;s children for tomorrow.</p>
                <Link href="/programs" className="program-card-link">
                  Learn More
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </PulsingBorder>

            <PulsingBorder borderRadius={20} as="article" className="program-card reveal">
              <div className="program-card-image">
                <img src="/images/gallery/IMG_1083%20copy.jpg" alt="Community development" loading="lazy" />
              </div>
              <div className="program-card-content">
                <div className="program-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3 className="program-card-title">Community Development</h3>
                <p className="program-card-text">Building stronger, sustainable communities.</p>
                <Link href="/programs" className="program-card-link">
                  Learn More
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </PulsingBorder>
          </div>
        </div>
      </section>

      {/* ============================================
           4. IMPACT SECTION
           ============================================ */}
      <section className="impact-section" id="impact" aria-labelledby="impact-heading">
        <div className="container">
          <div className="impact-grid">
            <div className="impact-left reveal-left">
              <span className="impact-label">OUR IMPACT</span>
              <h2 id="impact-heading" className="impact-title">
                Real People.<br />
                Real Stories.<br />
                Real Change.
              </h2>
              <Link href="/events" className="impact-link">
                View Our Impact
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="impact-values reveal-right">
              <PulsingBorder borderRadius={20} className="impact-value">
                <div className="impact-value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="impact-value-title">Compassion</h3>
                <p className="impact-value-text">We serve with love and empathy.</p>
              </PulsingBorder>

              <PulsingBorder borderRadius={20} className="impact-value">
                <div className="impact-value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="impact-value-title">Empowerment</h3>
                <p className="impact-value-text">We equip individuals to thrive.</p>
              </PulsingBorder>

              <PulsingBorder borderRadius={20} className="impact-value">
                <div className="impact-value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="impact-value-title">Sustainability</h3>
                <p className="impact-value-text">We create solutions that last.</p>
              </PulsingBorder>

              <PulsingBorder borderRadius={20} className="impact-value">
                <div className="impact-value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="impact-value-title">Transparency</h3>
                <p className="impact-value-text">We build trust through accountability.</p>
              </PulsingBorder>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           5. TESTIMONIAL SECTION
           ============================================ */}
      <section className="testimonial-section" aria-label="Testimonial">
        <div className="container">
          <div className="testimonial-inner">
            <div className="testimonial-content reveal-left">
              <div className="testimonial-quote-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote className="testimonial-text">
                Opadola Care Initiative gave us hope when we had none. Today, our community is stronger, healthier, and full of promise.
              </blockquote>
              <p className="testimonial-author">— Aisha G., Community Member</p>
            </div>

            <div className="testimonial-decorations reveal-right" aria-hidden="true">
              <div className="testimonial-curve">
                <svg viewBox="0 0 400 300" fill="none">
                  <path d="M50 250 Q200 50 350 150" stroke="#0A5C36" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
                  <path d="M80 280 Q220 80 380 180" stroke="#0A5C36" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
                  <circle cx="350" cy="150" r="4" fill="#C9963B" opacity="0.4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           6. COMMUNITY IMPACT SHOWCASE
           ============================================ */}
      <section className="community-showcase" aria-labelledby="community-heading">
        <div className="container">
          <div className="community-header reveal">
            <span className="community-caption">SEE OUR IMPACT IN ACTION</span>
            <h2 id="community-heading" className="community-title">Communities Transformed</h2>
            <p className="community-subtitle">Every photo tells a story of hope, resilience, and change.</p>
          </div>

          <div className="community-spin-wrap">
            <SpinImage
              images={[
                { src: "/images/gallery/IMG_1927.JPG" },
                { src: "/images/gallery/IMG_1928.JPG" },
                { src: "/images/gallery/IMG_1936.JPG" },
                { src: "/images/gallery/IMG_1923.JPG" },
                { src: "/images/gallery/IMG_1926.JPG" },
                { src: "/images/gallery/IMG_1774.JPG" },
                { src: "/images/gallery/IMG_1916.JPG" },
              ]}
              imageWidth={150}
              imageHeight={150}
              direction="anticlockwise"
              path="straight"
              xCurve={63}
              yCurve={-47}
              speed={2}
              rounded={7}
              orbitUnit="%"
              orbitWidthPct={60}
            />
          </div>
        </div>
      </section>

      {/* ============================================
           7. VIDEO SHOWCASE
           ============================================ */}
      <section className="video-section" aria-labelledby="video-heading">
        <div className="container">
          <div className="video-content reveal">
            <span className="video-caption">WATCH OUR STORY</span>
            <h2 id="video-heading" className="video-title">See the Impact of Your Support</h2>
            <p className="video-subtitle">
              From medical outreaches to educational programs, see how Opadola Care Initiative
              is transforming communities across Nigeria.
            </p>
          </div>

          <PulsingBorder borderRadius={20} className="video-wrapper reveal-scale">
            <div className="video-container">
              <video
                className="video-player"
                controls
                playsInline
                preload="metadata"
                poster="/images/gallery/IMG_1927.JPG"
                aria-label="Opadola Care Initiative impact video"
              >
                <source src="/images/gallery/VIDEO-2026-07-03-12-43-45.mp4" type="video/mp4" />
              </video>
            </div>
          </PulsingBorder>
        </div>
      </section>

      {/* ============================================
           8. TESTIMONY GRID — Auto Horizontal Carousel
           ============================================ */}
      <section className="testimony-carousel-section" aria-labelledby="testimony-heading">
        <div className="container">
          <div className="testimony-header reveal">
            <span className="testimony-caption">VOICES OF HOPE</span>
            <h2 id="testimony-heading" className="testimony-title">What People Say About Us</h2>
          </div>

          <div className="testimony-carousel-wrap" role="region" aria-label="Testimonials carousel" tabIndex={0}>
            <div className="testimony-carousel-track">
              <article className="testimony-carousel-card">
                <div className="testimony-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="testimony-text">
                  &ldquo;The medical outreach saved my mother&apos;s life. She had been struggling with access to healthcare for years. Opadola Care gave us hope when we had none.&rdquo;
                </blockquote>
                <div className="testimony-author">
                  <div className="testimony-author-info">
                    <span className="testimony-name">Blessing O.</span>
                    <span className="testimony-role">Community Member, Kogi State</span>
                  </div>
                </div>
              </article>

              <article className="testimony-carousel-card">
                <div className="testimony-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="testimony-text">
                  &ldquo;Thanks to their education program, my children can now attend school. The empowerment training also helped me start a small business to support my family.&rdquo;
                </blockquote>
                <div className="testimony-author">
                  <div className="testimony-author-info">
                    <span className="testimony-name">Amina T.</span>
                    <span className="testimony-role">Beneficiary, Ogun State</span>
                  </div>
                </div>
              </article>

              <article className="testimony-carousel-card">
                <div className="testimony-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="testimony-text">
                  &ldquo;Volunteering with OCI has been the most rewarding experience. Seeing the smiles on people&apos;s faces during our outreach events makes every effort worthwhile.&rdquo;
                </blockquote>
                <div className="testimony-author">
                  <div className="testimony-author-info">
                    <span className="testimony-name">Emeka N.</span>
                    <span className="testimony-role">Volunteer, Lagos State</span>
                  </div>
                </div>
              </article>

              {/* Duplicate for seamless loop */}
              <article className="testimony-carousel-card" aria-hidden="true">
                <div className="testimony-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="testimony-text">
                  &ldquo;The medical outreach saved my mother&apos;s life. She had been struggling with access to healthcare for years. Opadola Care gave us hope when we had none.&rdquo;
                </blockquote>
                <div className="testimony-author">
                  <div className="testimony-author-info">
                    <span className="testimony-name">Blessing O.</span>
                    <span className="testimony-role">Community Member, Kogi State</span>
                  </div>
                </div>
              </article>

              <article className="testimony-carousel-card" aria-hidden="true">
                <div className="testimony-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="testimony-text">
                  &ldquo;Thanks to their education program, my children can now attend school. The empowerment training also helped me start a small business to support my family.&rdquo;
                </blockquote>
                <div className="testimony-author">
                  <div className="testimony-author-info">
                    <span className="testimony-name">Amina T.</span>
                    <span className="testimony-role">Beneficiary, Ogun State</span>
                  </div>
                </div>
              </article>

              <article className="testimony-carousel-card" aria-hidden="true">
                <div className="testimony-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="testimony-text">
                  &ldquo;Volunteering with OCI has been the most rewarding experience. Seeing the smiles on people&apos;s faces during our outreach events makes every effort worthwhile.&rdquo;
                </blockquote>
                <div className="testimony-author">
                  <div className="testimony-author-info">
                    <span className="testimony-name">Emeka N.</span>
                    <span className="testimony-role">Volunteer, Lagos State</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           9. CTA + NEWSLETTER SECTION
           ============================================ */}
      <section className="cta-section" aria-label="Call to action and newsletter">
        <div className="container">
          <PulsingBorder borderRadius={32} className="cta-container reveal">
            <div className="cta-glow" aria-hidden="true" />

            <div className="cta-left">
              <h2 className="cta-left-title">Be The Reason Someone Believes In Tomorrow</h2>
              <p className="cta-left-text">Your support today can transform lives and build a better future.</p>
              <Link href="/donate" className="btn btn-lg">
                Donate Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
            </div>

            <div className="cta-right">
              <h3 className="cta-right-title">Stay Connected</h3>
              <p className="cta-right-text">Get the latest updates on our work and how you can make a difference.</p>
              <form className="newsletter-form" data-validate aria-label="Newsletter subscription">
                <label htmlFor="cta-email" className="visually-hidden">Email address</label>
                <input type="email" id="cta-email" className="newsletter-input" placeholder="Enter your email" required />
                <button type="submit" className="newsletter-submit" aria-label="Subscribe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </PulsingBorder>
        </div>
      </section>
    </>
  );
}
