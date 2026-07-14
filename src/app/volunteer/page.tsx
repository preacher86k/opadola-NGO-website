import Link from "next/link";
import VolunteerForm from "./VolunteerForm";

export const metadata = {
  title: "Volunteer",
};

export default function VolunteerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="volunteer-hero">
        <div className="volunteer-hero-content">
          <span className="volunteer-hero-badge">Volunteer</span>
          <h1 className="volunteer-hero-title">Be the Change. Volunteer With Us.</h1>
          <p className="volunteer-hero-subtitle">Volunteers are the heartbeat of our mission. When you volunteer with OCI, you&apos;re not just helping — you&apos;re becoming part of a family that believes in dignity, compassion, and real change.</p>
          <div className="volunteer-hero-cta">
            <a href="#apply" className="btn btn-white btn-lg">Apply Now</a>
            <a href="#opportunities" className="btn btn-white btn-lg">View Opportunities</a>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="volunteer-why">
        <div className="volunteer-why-header">
          <span className="volunteer-why-label">Why Volunteer</span>
          <h2 className="volunteer-why-title">The Benefits of Joining Us</h2>
          <p className="volunteer-why-text">
            Volunteering with OCI offers numerous benefits while making a real difference in communities.
          </p>
        </div>

        <div className="volunteer-why-grid">
          <div className="volunteer-why-card">
            <div className="volunteer-why-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="volunteer-why-title">Real Impact</h3>
            <p className="volunteer-why-text">Make a direct contribution to outreach programs that change lives in communities across Nigeria.</p>
          </div>

          <div className="volunteer-why-card">
            <div className="volunteer-why-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <h3 className="volunteer-why-title">Grow Your Skills</h3>
            <p className="volunteer-why-text">Gain real-world experience, develop empathy, and build leadership skills through meaningful work.</p>
          </div>

          <div className="volunteer-why-card">
            <div className="volunteer-why-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15l-2 5l9-13h-5l2-5l-9 13h5z"></path>
              </svg>
            </div>
            <h3 className="volunteer-why-title">Certificate & Recognition</h3>
            <p className="volunteer-why-text">Receive an official OCI Volunteer Certificate, formal recognition, and reference letters.</p>
          </div>

          <div className="volunteer-why-card">
            <div className="volunteer-why-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="volunteer-why-title">Networking</h3>
            <p className="volunteer-why-text">Connect with like-minded individuals and professionals passionate about humanitarian work.</p>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities" className="volunteer-opportunities">
        <div className="volunteer-opportunities-header">
          <span className="volunteer-opportunities-label">Volunteer Opportunities</span>
          <h2 className="volunteer-opportunities-title">Find Your Place in Our Mission</h2>
          <p className="volunteer-opportunities-text">
            We have various volunteer roles to match your skills and interests.
          </p>
        </div>

        <div className="volunteer-opportunities-grid">
          <div className="volunteer-opportunity-card">
            <div className="volunteer-opportunity-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="volunteer-opportunity-content">
              <h3 className="volunteer-opportunity-title">Field Outreach Volunteer</h3>
              <p className="volunteer-opportunity-text">Be on the ground during outreach events, distributing food, clothing, and medical supplies to communities in need.</p>
            </div>
          </div>

          <div className="volunteer-opportunity-card">
            <div className="volunteer-opportunity-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="volunteer-opportunity-content">
              <h3 className="volunteer-opportunity-title">Medical Support Volunteer</h3>
              <p className="volunteer-opportunity-text">Support free medical outreach days with basic screenings, health education, and referrals for senior citizens.</p>
            </div>
          </div>

          <div className="volunteer-opportunity-card">
            <div className="volunteer-opportunity-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div className="volunteer-opportunity-content">
              <h3 className="volunteer-opportunity-title">Admin & Operations</h3>
              <p className="volunteer-opportunity-text">Behind-the-scenes support: data entry, coordination, scheduling, report writing, and donor communication.</p>
            </div>
          </div>

          <div className="volunteer-opportunity-card">
            <div className="volunteer-opportunity-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </div>
            <div className="volunteer-opportunity-content">
              <h3 className="volunteer-opportunity-title">Communications & Social Media</h3>
              <p className="volunteer-opportunity-text">Create content, take photos, manage social media, and share our stories with the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section — Auto Horizontal Carousel */}
      <section className="volunteer-stories">
        <div className="volunteer-stories-header">
          <span className="volunteer-stories-label">Volunteer Stories</span>
          <h2 className="volunteer-stories-title">Hear From Our Volunteers</h2>
          <p className="volunteer-stories-text">
            Read what our volunteers have to say about their experience with OCI.
          </p>
        </div>

        <div className="volunteer-carousel-wrap" role="region" aria-label="Volunteer stories carousel" tabIndex={0}>
          <div className="volunteer-carousel-track">
            <div className="volunteer-story-card">
              <p className="volunteer-story-quote">&quot;Volunteering with OCI has been one of the most rewarding experiences of my life. Seeing the smiles on the faces of the elderly we serve makes it all worthwhile.&quot;</p>
              <div className="volunteer-story-author">
                <div className="volunteer-story-author-image">
                  <img src="/images/gallery/volunteer5.PNG" alt="Grace Emmanuel" />
                </div>
                <div>
                  <p className="volunteer-story-author-name">Grace Emmanuel</p>
                  <p className="volunteer-story-author-role">Medical Support Volunteer</p>
                </div>
              </div>
            </div>

            <div className="volunteer-story-card">
              <p className="volunteer-story-quote">&quot;I joined OCI as a communications volunteer and have learned so much about storytelling and content creation while making a real difference.&quot;</p>
              <div className="volunteer-story-author">
                <div className="volunteer-story-author-image">
                  <img src="/images/gallery/vounteer2.png" alt="Chukwuemeka O." />
                </div>
                <div>
                  <p className="volunteer-story-author-name">Chukwuemeka O.</p>
                  <p className="volunteer-story-author-role">Communications Volunteer</p>
                </div>
              </div>
            </div>

            <div className="volunteer-story-card">
              <p className="volunteer-story-quote">&quot;The field outreach programs are incredibly well organized. It&apos;s amazing to see how much impact we can make in just one day of service.&quot;</p>
              <div className="volunteer-story-author">
                <div className="volunteer-story-author-image">
                  <img src="/images/gallery/volunteer6.PNG" alt="Esther Kabiru" />
                </div>
                <div>
                  <p className="volunteer-story-author-name">Esther Kabiru</p>
                  <p className="volunteer-story-author-role">Field Outreach Volunteer</p>
                </div>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="volunteer-story-card" aria-hidden="true">
              <p className="volunteer-story-quote">&quot;Volunteering with OCI has been one of the most rewarding experiences of my life. Seeing the smiles on the faces of the elderly we serve makes it all worthwhile.&quot;</p>
              <div className="volunteer-story-author">
                <div className="volunteer-story-author-image">
                  <img src="/images/gallery/volunteer5.PNG" alt="Grace Emmanuel" />
                </div>
                <div>
                  <p className="volunteer-story-author-name">Grace Emmanuel</p>
                  <p className="volunteer-story-author-role">Medical Support Volunteer</p>
                </div>
              </div>
            </div>

            <div className="volunteer-story-card" aria-hidden="true">
              <p className="volunteer-story-quote">&quot;I joined OCI as a communications volunteer and have learned so much about storytelling and content creation while making a real difference.&quot;</p>
              <div className="volunteer-story-author">
                <div className="volunteer-story-author-image">
                  <img src="/images/gallery/vounteer2.png" alt="Chukwuemeka O." />
                </div>
                <div>
                  <p className="volunteer-story-author-name">Chukwuemeka O.</p>
                  <p className="volunteer-story-author-role">Communications Volunteer</p>
                </div>
              </div>
            </div>

            <div className="volunteer-story-card" aria-hidden="true">
              <p className="volunteer-story-quote">&quot;The field outreach programs are incredibly well organized. It&apos;s amazing to see how much impact we can make in just one day of service.&quot;</p>
              <div className="volunteer-story-author">
                <div className="volunteer-story-author-image">
                  <img src="/images/gallery/volunteer6.PNG" alt="Esther Kabiru" />
                </div>
                <div>
                  <p className="volunteer-story-author-name">Esther Kabiru</p>
                  <p className="volunteer-story-author-role">Field Outreach Volunteer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="apply" className="volunteer-form">
        <div className="volunteer-form-grid">
          <div className="volunteer-form-content">
            <span className="volunteer-form-label">Apply Now</span>
            <h2 className="volunteer-form-title">Ready to Make a Difference?</h2>
            <p className="volunteer-form-text">
              Fill out the form and our team will get in touch with you within 5 business days. We can&apos;t wait to welcome you to the OCI family.
            </p>

            <div className="volunteer-form-benefits">
              <div className="volunteer-form-benefit">
                <div className="volunteer-form-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="volunteer-form-benefit-text">Must be 18+</span>
              </div>
              <div className="volunteer-form-benefit">
                <div className="volunteer-form-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="volunteer-form-benefit-text">Based in Nigeria</span>
              </div>
              <div className="volunteer-form-benefit">
                <div className="volunteer-form-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="volunteer-form-benefit-text">Commit to one event/quarter</span>
              </div>
              <div className="volunteer-form-benefit">
                <div className="volunteer-form-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="volunteer-form-benefit-text">Passion for service</span>
              </div>
            </div>
          </div>

            <VolunteerForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="volunteer-cta-section">
        <div className="volunteer-cta-content">
          <span className="volunteer-cta-label">Join Us</span>
          <h2 className="volunteer-cta-title">Ready to Make a Difference?</h2>
          <p className="volunteer-cta-text">
            Join our team of dedicated volunteers and help us create lasting change in communities across Nigeria.
          </p>
          <div className="volunteer-cta-buttons">
            <a href="#apply" className="btn btn-white btn-lg">Apply Now</a>
            <Link href="/contact" className="btn btn-white btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
