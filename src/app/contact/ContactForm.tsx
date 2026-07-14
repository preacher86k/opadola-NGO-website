"use client";

import { useState } from "react";
import { createContact } from "./actions";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await createContact(formData);

    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form-wrapper" style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" width="64" height="64">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l3 3 5-5" />
          </svg>
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h3)", color: "var(--color-primary-900)", marginBottom: "0.75rem" }}>Message Sent!</h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Thank you for reaching out. We&apos;ll get back to you promptly.</p>
        <button onClick={() => setStatus("idle")} className="btn btn-primary">Send Another Message</button>
      </div>
    );
  }

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" data-validate onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">Full Name *</label>
          <input type="text" id="contact-name" name="name" className="form-input" placeholder="Your full name" required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">Email Address *</label>
          <input type="email" id="contact-email" name="email" className="form-input" placeholder="your@email.com" required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-subject">Subject</label>
          <input type="text" id="contact-subject" name="subject" className="form-input" placeholder="How can we help?" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-message">Message *</label>
          <textarea id="contact-message" name="message" className="form-input form-textarea" placeholder="Your message..." required></textarea>
        </div>

        <div className="form-group" style={{ display: "none" }}>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" && (
          <div style={{ padding: "0.75rem 1rem", background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.3)", borderRadius: "var(--radius-md)", color: "#dc3545", fontSize: "var(--text-sm)", marginBottom: "0.5rem" }}>
            {errorMessage}
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }} disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
