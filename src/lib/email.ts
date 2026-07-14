import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.EMAIL_FROM || "Opadola Care <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@opadola.org";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

let resend: Resend | null = null;

function getClient(): Resend | null {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured — emails skipped");
    return null;
  }
  if (!resend) {
    resend = new Resend(RESEND_API_KEY);
  }
  return resend;
}

function formatNaira(n: number): string {
  return new Intl.NumberFormat("en-NG").format(n);
}

// ─── Donor Confirmation Email ───────────────────────────────────────────────

export async function sendDonationConfirmation(opts: {
  name: string;
  email: string;
  amount: number;
  reference: string;
}) {
  const client = getClient();
  if (!client) return;

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: opts.email,
      subject: `Thank You for Your Donation — ${opts.reference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
          <div style="background: #0A5C36; padding: 2rem; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${opts.name}!</h1>
          </div>
          <div style="background: #f8f9fa; padding: 2rem; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Your generous donation has been received and confirmed.
            </p>
            <div style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef; margin: 1.5rem 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0.5rem 0; color: #666;">Amount</td>
                  <td style="padding: 0.5rem 0; color: #0A5C36; font-weight: bold; text-align: right; font-size: 18px;">&#8358;${formatNaira(opts.amount)}</td>
                </tr>
                <tr>
                  <td style="padding: 0.5rem 0; color: #666;">Reference</td>
                  <td style="padding: 0.5rem 0; color: #333; text-align: right; font-family: monospace;">${opts.reference}</td>
                </tr>
                <tr>
                  <td style="padding: 0.5rem 0; color: #666;">Status</td>
                  <td style="padding: 0.5rem 0; color: #0A5C36; text-align: right; font-weight: 600;">Confirmed</td>
                </tr>
              </table>
            </div>
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              Your donation helps us provide medical outreach, educational support, and community development across Nigeria.
            </p>
            <div style="text-align: center; margin-top: 1.5rem;">
              <a href="${APP_URL}/programs" style="display: inline-block; background: #0A5C36; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">See Your Impact</a>
            </div>
          </div>
          <div style="text-align: center; padding: 1rem; color: #999; font-size: 12px;">
            Opadola Care Initiative · Kogi State, Nigeria · info@opadola.org
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Donation confirmation email failed:", err);
  }
}

// ─── Admin Donation Notification ────────────────────────────────────────────

export async function sendAdminDonationNotification(opts: {
  name: string;
  email: string;
  amount: number;
  reference: string;
}) {
  const client = getClient();
  if (!client) return;

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Donation: ${opts.name} donated &#8358;${formatNaira(opts.amount)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
          <h2 style="color: #0A5C36; margin-bottom: 1rem;">New Donation Received</h2>
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0.5rem 0; color: #666;">Donor</td>
                <td style="padding: 0.5rem 0; color: #333; text-align: right;">${opts.name}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #666;">Email</td>
                <td style="padding: 0.5rem 0; color: #333; text-align: right;">${opts.email}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #666;">Amount</td>
                <td style="padding: 0.5rem 0; color: #0A5C36; font-weight: bold; text-align: right; font-size: 18px;">&#8358;${formatNaira(opts.amount)}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #666;">Reference</td>
                <td style="padding: 0.5rem 0; text-align: right; font-family: monospace;">${opts.reference}</td>
              </tr>
            </table>
          </div>
          <div style="text-align: center; margin-top: 1.5rem;">
            <a href="${APP_URL}/admin/donations" style="display: inline-block; background: #0A5C36; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">View in Dashboard</a>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Admin donation notification failed:", err);
  }
}

// ─── Contact Form Auto-Reply ────────────────────────────────────────────────

export async function sendContactAutoReply(opts: {
  name: string;
  email: string;
  subject?: string;
}) {
  const client = getClient();
  if (!client) return;

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: opts.email,
      subject: `We Received Your Message — Opadola Care`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
          <div style="background: #0A5C36; padding: 2rem; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Message Received!</h1>
          </div>
          <div style="background: #f8f9fa; padding: 2rem; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Hi ${opts.name},
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Thank you for reaching out to Opadola Care Initiative. We have received your message${opts.subject ? ` regarding "<strong>${opts.subject}</strong>"` : ""} and will get back to you within 24-48 hours.
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              In the meantime, feel free to explore our programs or follow us on social media.
            </p>
            <div style="text-align: center; margin-top: 1.5rem;">
              <a href="${APP_URL}/programs" style="display: inline-block; background: #0A5C36; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Our Programs</a>
            </div>
          </div>
          <div style="text-align: center; padding: 1rem; color: #999; font-size: 12px;">
            Opadola Care Initiative · Kogi State, Nigeria · info@opadola.org
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Contact auto-reply email failed:", err);
  }
}

// ─── Contact Admin Notification ─────────────────────────────────────────────

export async function sendContactAdminNotification(opts: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const client = getClient();
  if (!client) return;

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Message from ${opts.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
          <h2 style="color: #0A5C36; margin-bottom: 1rem;">New Contact Message</h2>
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef;">
            <p><strong>From:</strong> ${opts.name} (${opts.email})</p>
            <p><strong>Subject:</strong> ${opts.subject || "No subject"}</p>
            <p style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 6px; border: 1px solid #e9ecef; line-height: 1.6;">${opts.message}</p>
          </div>
          <div style="text-align: center; margin-top: 1.5rem;">
            <a href="${APP_URL}/admin/contacts" style="display: inline-block; background: #0A5C36; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">View in Dashboard</a>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Contact admin notification failed:", err);
  }
}

// ─── Volunteer Application Confirmation ─────────────────────────────────────

export async function sendVolunteerConfirmation(opts: {
  name: string;
  email: string;
}) {
  const client = getClient();
  if (!client) return;

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: opts.email,
      subject: `Application Received — Opadola Care Volunteer`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
          <div style="background: #0A5C36; padding: 2rem; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Welcome, ${opts.name}!</h1>
          </div>
          <div style="background: #f8f9fa; padding: 2rem; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Thank you for applying to volunteer with Opadola Care Initiative!
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              We have received your application and our team will review it shortly. You will receive an email once your application has been reviewed.
            </p>
            <div style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef; margin: 1.5rem 0;">
              <p style="margin: 0; color: #666; font-size: 14px;"><strong>What happens next?</strong></p>
              <ul style="color: #333; font-size: 14px; line-height: 1.8; padding-left: 1.25rem;">
                <li>Our team reviews your application within 3-5 business days</li>
                <li>You&apos;ll receive an email with your application status</li>
                <li>If approved, you&apos;ll get details on how to get started</li>
              </ul>
            </div>
            <div style="text-align: center; margin-top: 1.5rem;">
              <a href="${APP_URL}/programs" style="display: inline-block; background: #0A5C36; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">View Our Programs</a>
            </div>
          </div>
          <div style="text-align: center; padding: 1rem; color: #999; font-size: 12px;">
            Opadola Care Initiative · Kogi State, Nigeria · info@opadola.org
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Volunteer confirmation email failed:", err);
  }
}

// ─── Volunteer Status Update ────────────────────────────────────────────────

export async function sendVolunteerStatusUpdate(opts: {
  name: string;
  email: string;
  status: "approved" | "pending" | "rejected";
}) {
  const client = getClient();
  if (!client) return;

  const statusMessages: Record<string, { title: string; body: string; color: string }> = {
    approved: {
      title: "Application Approved!",
      body: "Great news! Your volunteer application has been approved. Our team will reach out to you with next steps on how to get started.",
      color: "#0A5C36",
    },
    pending: {
      title: "Application Under Review",
      body: "Your volunteer application is still under review. We will notify you once a decision has been made. Thank you for your patience!",
      color: "#C9963B",
    },
    rejected: {
      title: "Application Update",
      body: "Thank you for your interest in volunteering with Opadola Care Initiative. Unfortunately, we are unable to move forward with your application at this time. We encourage you to apply again in the future.",
      color: "#666",
    },
  };

  const s = statusMessages[opts.status] || statusMessages.pending;

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: opts.email,
      subject: `${s.title} — Opadola Care Volunteer`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
          <div style="background: ${s.color}; padding: 2rem; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">${s.title}</h1>
          </div>
          <div style="background: #f8f9fa; padding: 2rem; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Hi ${opts.name},
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              ${s.body}
            </p>
            <div style="text-align: center; margin-top: 1.5rem;">
              <a href="${APP_URL}/programs" style="display: inline-block; background: ${s.color}; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">View Our Programs</a>
            </div>
          </div>
          <div style="text-align: center; padding: 1rem; color: #999; font-size: 12px;">
            Opadola Care Initiative · Kogi State, Nigeria · info@opadola.org
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Volunteer status email failed:", err);
  }
}

// ─── Admin Volunteer Notification ───────────────────────────────────────────

export async function sendAdminVolunteerNotification(opts: {
  name: string;
  email: string;
  interestArea?: string;
}) {
  const client = getClient();
  if (!client) return;

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Volunteer Application: ${opts.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
          <h2 style="color: #0A5C36; margin-bottom: 1rem;">New Volunteer Application</h2>
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef;">
            <p><strong>Name:</strong> ${opts.name}</p>
            <p><strong>Email:</strong> ${opts.email}</p>
            ${opts.interestArea ? `<p><strong>Interest Area:</strong> ${opts.interestArea}</p>` : ""}
          </div>
          <div style="text-align: center; margin-top: 1.5rem;">
            <a href="${APP_URL}/admin/volunteers" style="display: inline-block; background: #0A5C36; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Review Application</a>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Admin volunteer notification failed:", err);
  }
}
