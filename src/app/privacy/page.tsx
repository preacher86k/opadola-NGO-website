import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="privacy-hero">
        <div className="privacy-hero-content">
          <h1 className="privacy-hero-title">Privacy Policy</h1>
          <p className="privacy-hero-sub">Last updated: July 2026</p>
        </div>
      </section>

      <section className="privacy-body">
        <div className="privacy-body-inner">
          <h2>Introduction</h2>
          <p>
            Opadola Care Initiative (&ldquo;OCI,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting
            the privacy of our donors, volunteers, beneficiaries, and website visitors. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you visit our website or interact
            with our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide when you:
          </p>
          <ul>
            <li>Make a donation</li>
            <li>Sign up as a volunteer</li>
            <li>Contact us via our forms</li>
            <li>Subscribe to our newsletter</li>
            <li>Apply for assistance programs</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, postal address, and payment
            information (processed securely through Paystack).
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information including your IP
            address, browser type, operating system, referring URLs, and pages visited. We use this data to
            improve our website and understand how visitors engage with our content.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>Process donations and issue receipts</li>
            <li>Communicate about volunteer opportunities and events</li>
            <li>Respond to inquiries and provide support</li>
            <li>Improve our programs and services</li>
            <li>Send periodic updates with your consent</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>

          <h2>Payment Processing</h2>
          <p>
            All donation payments are processed through Paystack, a PCI-DSS compliant payment processor. We do
            not store credit card or bank details on our servers. Paystack handles all payment data in accordance
            with industry security standards.
          </p>

          <h2>Data Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your
            information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations (e.g., email delivery, payment processing)</li>
            <li>Legal authorities when required by law</li>
            <li>Third parties with your explicit consent</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes for which it
            was collected, or as required by applicable law. Donation records are retained for financial and tax
            reporting purposes.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <a href="mailto:info@opadola.org">info@opadola.org</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website may use cookies and similar tracking technologies to enhance your browsing experience.
            You can control cookie preferences through your browser settings. Disabling cookies may affect
            certain features of the website.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy
            practices or content of these external sites. We encourage you to review their privacy policies
            before providing any personal information.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13. We do not knowingly collect
            personal information from children. If we become aware that a child has provided us with personal
            information, we will take steps to delete it.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an
            updated revision date. We encourage you to review this policy periodically.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:info@opadola.org">info@opadola.org</a></li>
            <li>Phone: +234 916 387 6000</li>
            <li>Address: Ogun State, Nigeria</li>
          </ul>

          <div className="privacy-back">
            <Link href="/">&larr; Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
