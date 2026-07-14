import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-hero-badge">Contact Us</span>
          <h1 className="contact-hero-title">Let&apos;s Connect</h1>
          <p className="contact-hero-subtitle">We&apos;d love to hear from you. Whether you have a question, want to partner, or simply want to learn more — reach out.</p>
          <div className="contact-hero-cta">
            <a href="#contact-form" className="btn btn-white btn-lg">Send Message</a>
            <a href="#info" className="btn btn-white btn-lg">Contact Info</a>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section id="info" className="contact-info">
        <div className="contact-info-header">
          <span className="contact-info-label">Contact Information</span>
          <h2 className="contact-info-title">Get in Touch</h2>
          <p className="contact-info-text">
            We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>

        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="contact-info-title">Office Address</h3>
            <p className="contact-info-text">120 Ola Mummy Junction, along Odemo Road Isara, Ogun State, Nigeria</p>
            <a href="#" className="contact-info-link">
              Get Directions
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className="contact-info-title">Phone</h3>
            <p className="contact-info-text">+234 916 387 6000</p>
            <a href="tel:+2349163876000" className="contact-info-link">
              Call Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 className="contact-info-title">Email</h3>
            <p className="contact-info-text">info@opadola.org</p>
            <a href="mailto:info@opadola.org" className="contact-info-link">
              Send Email
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </div>
            <h3 className="contact-info-title">Social Media</h3>
            <p className="contact-info-text">Follow us on X/Twitter</p>
            <a href="https://x.com/opadolaci" className="contact-info-link" target="_blank" rel="noopener">
              @opadolaci
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="contact-form" className="contact-form-section">
        <div className="contact-form-grid">
          <div className="contact-form-content">
            <span className="contact-form-label">Send a Message</span>
            <h2 className="contact-form-title">We&apos;d Love to Hear From You</h2>
            <p className="contact-form-text">
              Whether you have a question about our programs, want to explore partnership opportunities, or simply want to connect — please fill out the form and we&apos;ll get back to you promptly.
            </p>

            <div className="contact-form-details">
              <div className="contact-form-detail">
                <div className="contact-form-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <span className="contact-form-detail-text">+234 916 387 6000</span>
              </div>
              <div className="contact-form-detail">
                <div className="contact-form-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span className="contact-form-detail-text">info@opadola.org</span>
              </div>
              <div className="contact-form-detail">
                <div className="contact-form-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <span className="contact-form-detail-text">Ogun State, Nigeria</span>
              </div>
              <div className="contact-form-detail">
                <div className="contact-form-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <span className="contact-form-detail-text">Mon - Fri, 9am - 5pm</span>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <div className="contact-map-header">
          <span className="contact-map-label">Our Location</span>
          <h2 className="contact-map-title">Find Us</h2>
          <p className="contact-map-text">
            We&apos;re located in Isara, Ogun State, Nigeria. Visit us or reach out through any of our contact channels.
          </p>
        </div>

        <div className="contact-map-container">
          <div className="contact-map-wrapper">
            <div className="contact-map-placeholder">
              <div className="contact-map-placeholder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="contact-map-placeholder-title">Map Integration</h3>
              <p className="contact-map-placeholder-text">Google Maps or Mapbox will be integrated here</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="contact-faq-header">
          <span className="contact-faq-label">FAQ</span>
          <h2 className="contact-faq-title">Frequently Asked Questions</h2>
          <p className="contact-faq-text">
            Find answers to common questions about our programs and how you can get involved.
          </p>
        </div>

        <div className="contact-faq-grid">
          <div className="contact-faq-item">
            <h3 className="contact-faq-question">How can I volunteer with OCI?</h3>
            <p className="contact-faq-answer">Visit our Volunteer page to fill out an application form. Our team will review your application and reach out within 5 business days.</p>
          </div>

          <div className="contact-faq-item">
            <h3 className="contact-faq-question">How can I donate to OCI?</h3>
            <p className="contact-faq-answer">You can donate through our Donate page using various payment methods. We accept bank transfers, online payments, and in-kind donations.</p>
          </div>

          <div className="contact-faq-item">
            <h3 className="contact-faq-question">What programs does OCI offer?</h3>
            <p className="contact-faq-answer">We focus on four core areas: Children&apos;s Rights, Senior Care, Poverty Relief, and Medical Support. Each program is designed to create lasting impact.</p>
          </div>

          <div className="contact-faq-item">
            <h3 className="contact-faq-question">How can I partner with OCI?</h3>
            <p className="contact-faq-answer">We welcome partnerships with organizations that share our vision. Contact us through the form above or email info@opadola.org to discuss collaboration opportunities.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="contact-cta-content">
          <span className="contact-cta-label">Join Us</span>
          <h2 className="contact-cta-title">Ready to Make a Difference?</h2>
          <p className="contact-cta-text">
            Join our team of dedicated volunteers and help us create lasting change in communities across Nigeria.
          </p>
          <div className="contact-cta-buttons">
            <Link href="/volunteer" className="btn btn-white btn-lg">Volunteer</Link>
            <Link href="/donate" className="btn btn-white btn-lg">Donate</Link>
          </div>
        </div>
      </section>
    </>
  );
}
