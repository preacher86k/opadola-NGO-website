import Link from "next/link";
import DonationForm from "./DonationForm";

export const metadata = {
  title: "Donate",
};

export default function DonatePage() {
  return (
    <>
      {/* 1. HERO — Full Cinematic */}
      <section className="dt-hero" aria-label="Donate hero">
        <div className="dt-hero-media">
          <img src="/images/gallery/IMG_1921.JPG" alt="" className="dt-hero-img" />
          <div className="dt-hero-gradient"></div>
        </div>
        <div className="dt-hero-content">
          <div className="dt-hero-eyebrow">
            <span className="dt-hero-line" aria-hidden="true"></span>
            <span className="dt-hero-tag">Support Our Mission</span>
            <span className="dt-hero-line" aria-hidden="true"></span>
          </div>
          <h1 className="dt-hero-title">Your Generosity<br />Creates Lasting Change</h1>
          <p className="dt-hero-sub">Every naira you give helps us reach more families, restore dignity, and build stronger communities across Nigeria.</p>
          <div className="dt-hero-actions">
            <a href="#give" className="dt-btn dt-btn-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              Donate Now
            </a>
            <a href="#how" className="dt-btn dt-btn-ghost">See Your Impact</a>
          </div>
        </div>
        <div className="dt-hero-scroll" aria-hidden="true">
          <span className="dt-hero-scroll-text">Scroll</span>
          <span className="dt-hero-scroll-line"></span>
        </div>
      </section>

      {/* 2. TRUST BAR — Social Proof */}
      <section className="dt-trust" aria-label="Trust indicators">
        <div className="dt-trust-inner">
          <div className="dt-trust-item">
            <div className="dt-trust-num">
              <span className="dt-trust-value" data-target="500">0</span>
              <span className="dt-trust-plus">+</span>
            </div>
            <span className="dt-trust-label">Lives Touched</span>
          </div>
          <div className="dt-trust-divider" aria-hidden="true"></div>
          <div className="dt-trust-item">
            <div className="dt-trust-num">
              <span className="dt-trust-value" data-target="10">0</span>
              <span className="dt-trust-plus">+</span>
            </div>
            <span className="dt-trust-label">Communities Served</span>
          </div>
          <div className="dt-trust-divider" aria-hidden="true"></div>
          <div className="dt-trust-item">
            <div className="dt-trust-num">
              <span className="dt-trust-value" data-target="100">0</span>
              <span className="dt-trust-plus">%</span>
            </div>
            <span className="dt-trust-label">Transparent Use</span>
          </div>
          <div className="dt-trust-divider" aria-hidden="true"></div>
          <div className="dt-trust-item">
            <div className="dt-trust-num">
              <span className="dt-trust-value" data-target="4">0</span>
            </div>
            <span className="dt-trust-label">Core Programs</span>
          </div>
        </div>
      </section>

      {/* 3. IMPACT STORY — Editorial Layout */}
      <section id="how" className="dt-story">
        <div className="dt-story-inner">
          <div className="dt-story-opening">
            <span className="dt-story-label">How Your Donation Helps</span>
            <h2 className="dt-story-headline">Every Gift Tells a Story</h2>
            <p className="dt-story-lead">Behind every donation is a life changed. Here&apos;s exactly what your generosity makes possible.</p>
          </div>

          <div className="dt-impact-grid">
            {/* Impact Card 1 */}
            <div className="dt-impact-card">
              <div className="dt-impact-visual">
                <img src="/images/gallery/IMG_1914.JPG" alt="Medical outreach providing care to seniors" />
                <div className="dt-impact-amount">
                  <span className="dt-impact-currency">₦</span>25,000
                </div>
              </div>
              <div className="dt-impact-body">
                <h3 className="dt-impact-name">Medical Supplies</h3>
                <p className="dt-impact-desc">Provides basic medications and health supplies for 10 seniors during a medical outreach — restoring dignity through care.</p>
                <div className="dt-impact-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  Senior Care Program
                </div>
              </div>
            </div>

            {/* Impact Card 2 */}
            <div className="dt-impact-card">
              <div className="dt-impact-visual">
                <img src="/images/gallery/IMG_1936.JPG" alt="Children receiving educational support" />
                <div className="dt-impact-amount">
                  <span className="dt-impact-currency">₦</span>50,000
                </div>
              </div>
              <div className="dt-impact-body">
                <h3 className="dt-impact-name">Educational Support</h3>
                <p className="dt-impact-desc">Equips 5 children with school supplies and learning materials for an entire term — opening doors to brighter futures.</p>
                <div className="dt-impact-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  Children&apos;s Rights Program
                </div>
              </div>
            </div>

            {/* Impact Card 3 */}
            <div className="dt-impact-card">
              <div className="dt-impact-visual">
                <img src="/images/gallery/IMG_1926.JPG" alt="Food relief distribution to families" />
                <div className="dt-impact-amount">
                  <span className="dt-impact-currency">₦</span>100,000
                </div>
              </div>
              <div className="dt-impact-body">
                <h3 className="dt-impact-name">Food Relief</h3>
                <p className="dt-impact-desc">Delivers food boxes and essential supplies for 20 families during emergency relief — because no one should go hungry.</p>
                <div className="dt-impact-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
                  Poverty Relief Program
                </div>
              </div>
            </div>

            {/* Impact Card 4 */}
            <div className="dt-impact-card">
              <div className="dt-impact-visual">
                <img src="/images/gallery/IMG_1927.JPG" alt="Community outreach event serving 100+ people" />
                <div className="dt-impact-amount">
                  <span className="dt-impact-currency">₦</span>200,000
                </div>
              </div>
              <div className="dt-impact-body">
                <h3 className="dt-impact-name">Community Outreach</h3>
                <p className="dt-impact-desc">Sponsors a full community outreach event serving 100+ individuals — transforming entire neighbourhoods at once.</p>
                <div className="dt-impact-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  All Programs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DONATION FORM — Split Layout */}
      <section id="give" className="dt-form-section">
        <div className="dt-form-inner">
          {/* Left: Story & Trust */}
          <div className="dt-form-story">
            <span className="dt-form-label">Make Your Gift</span>
            <h2 className="dt-form-title">Every Gift Tells a Story</h2>
            <p className="dt-form-text">Choose an amount that speaks to you. Your donation goes directly to programs that restore dignity and create lasting change.</p>

            <div className="dt-form-trust">
              <div className="dt-form-trust-item">
                <div className="dt-form-trust-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <span className="dt-form-trust-title">Secure & Encrypted</span>
                  <span className="dt-form-trust-desc">Your payment is protected by Paystack</span>
                </div>
              </div>
              <div className="dt-form-trust-item">
                <div className="dt-form-trust-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg>
                </div>
                <div>
                  <span className="dt-form-trust-title">Tax-Deductible</span>
                  <span className="dt-form-trust-desc">Registered nonprofit — receipt provided</span>
                </div>
              </div>
              <div className="dt-form-trust-item">
                <div className="dt-form-trust-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <div>
                  <span className="dt-form-trust-title">100% Transparent</span>
                  <span className="dt-form-trust-desc">We report exactly how funds are used</span>
                </div>
              </div>
            </div>

            <div className="dt-form-methods">
              <span className="dt-form-methods-title">Ways to Give</span>
              <div className="dt-form-methods-list">
                <div className="dt-form-method">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  Online Payment
                </div>
                <div className="dt-form-method">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="2" y="5" width="20" height="14" rx="2"></rect><path d="M2 10h20"></path></svg>
                  Bank Transfer
                </div>
                <div className="dt-form-method">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  In-Kind Giving
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <DonationForm />
        </div>
      </section>

      {/* 6. TESTIMONIAL — Full Width Quote */}
      <section className="dt-testimonial" aria-label="Testimonial">
        <div className="dt-testimonial-media">
          <img src="/images/gallery/IMG_1914.JPG" alt="" className="dt-testimonial-img" />
          <div className="dt-testimonial-gradient"></div>
        </div>
        <div className="dt-testimonial-content">
          <div className="dt-testimonial-mark" aria-hidden="true">&ldquo;</div>
          <blockquote className="dt-testimonial-quote">
            When I received the medical supplies for my grandmother, I cried. She had been suffering for months with no way to get help. Opadola Care didn&apos;t just give us medicine — they gave us hope.
          </blockquote>
          <cite className="dt-testimonial-author">
            <span className="dt-testimonial-name">Adunni O.</span>
            <span className="dt-testimonial-role">Beneficiary, Isara Community</span>
          </cite>
        </div>
      </section>

      {/* 7. BANK TRANSFER — Details */}
      <section className="dt-bank" aria-label="Bank transfer details">
        <div className="dt-bank-inner">
          <div className="dt-bank-header">
            <span className="dt-bank-label">Bank Transfer</span>
            <h2 className="dt-bank-title">Prefer Direct Transfer?</h2>
            <p className="dt-bank-text">You can also send your donation directly to our bank account. Please include your name as the reference so we can acknowledge your gift.</p>
          </div>

          <div className="dt-bank-card">
            <div className="dt-bank-detail">
              <span className="dt-bank-key">Bank Name</span>
              <span className="dt-bank-value">Polaris Bank</span>
            </div>
            <div className="dt-bank-detail">
              <span className="dt-bank-key">Account Name</span>
              <span className="dt-bank-value">Opadola Care Initiative</span>
            </div>
            <div className="dt-bank-detail">
              <span className="dt-bank-key">Account Number</span>
              <span className="dt-bank-value dt-bank-copy" data-copy="4092082448">4092082448
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </span>
            </div>
          </div>

          <p className="dt-bank-note">After transferring, please send proof of payment to <a href="mailto:donate@opadola.org">donate@opadola.org</a> or WhatsApp <a href="https://wa.me/2349163876000">+234 916 387 6000</a></p>
        </div>
      </section>

      {/* 8. CTA — Volunteer */}
      <section className="dt-cta" aria-label="Get involved">
        <div className="dt-cta-inner">
          <div className="dt-cta-header">
            <span className="dt-cta-label">Not Just Money</span>
            <h2 className="dt-cta-title">There Are Many Ways to Help</h2>
            <p className="dt-cta-text">Can&apos;t donate right now? You can still make a huge impact by volunteering your time and skills.</p>
          </div>

          <div className="dt-cta-grid">
            <Link href="/volunteer" className="dt-cta-card">
              <div className="dt-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="dt-cta-heading">Volunteer</h3>
              <p className="dt-cta-desc">Join our team on the ground and see your impact firsthand.</p>
              <span className="dt-cta-arrow">
                Learn More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </span>
            </Link>

            <Link href="/contact" className="dt-cta-card dt-cta-featured">
              <div className="dt-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="dt-cta-heading">Partner With Us</h3>
              <p className="dt-cta-desc">Organizations and businesses — let&apos;s create lasting change together.</p>
              <span className="dt-cta-arrow">
                Get in Touch
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </span>
            </Link>

            <Link href="/programs" className="dt-cta-card">
              <div className="dt-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="dt-cta-heading">Explore Programs</h3>
              <p className="dt-cta-desc">Learn more about the specific programs your support funds.</p>
              <span className="dt-cta-arrow">
                View Programs
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
