"use client";

import { useState } from "react";
import { createVolunteer } from "./actions";

export default function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await createVolunteer(formData);

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
      <div className="volunteer-form-wrapper" style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" width="64" height="64">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l3 3 5-5" />
          </svg>
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h3)", color: "var(--color-primary-900)", marginBottom: "0.75rem" }}>Application Submitted!</h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Thank you for your interest in volunteering. Our team will reach out within 5 business days.</p>
        <button onClick={() => setStatus("idle")} className="btn btn-primary">Submit Another Application</button>
      </div>
    );
  }

  return (
    <div className="volunteer-form-wrapper">
      <form className="contact-form" data-validate onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="vol-name">Full Name *</label>
          <input type="text" id="vol-name" name="fullName" className="form-input" placeholder="Your full name" required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vol-email">Email Address *</label>
          <input type="email" id="vol-email" name="email" className="form-input" placeholder="your@email.com" required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vol-phone">Phone Number</label>
          <input type="tel" id="vol-phone" name="phone" className="form-input" placeholder="+234 xxx xxx xxxx" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vol-city">City</label>
          <input type="text" id="vol-city" name="city" className="form-input" placeholder="Your city" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vol-role">Preferred Role *</label>
          <select id="vol-role" name="interestArea" className="form-input form-select" required>
            <option value="">Select a role</option>
            <option value="field">Field Outreach Volunteer</option>
            <option value="medical">Medical Support Volunteer</option>
            <option value="admin">Admin & Operations</option>
            <option value="comms">Communications & Social Media</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vol-availability">Availability</label>
          <select id="vol-availability" name="availability" className="form-input form-select">
            <option value="">Select availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vol-motivation">Why do you want to volunteer? *</label>
          <textarea id="vol-motivation" name="motivation" className="form-input form-textarea" placeholder="Tell us about yourself and why you want to join OCI..." required></textarea>
        </div>

        {status === "error" && (
          <div style={{ padding: "0.75rem 1rem", background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.3)", borderRadius: "var(--radius-md)", color: "#dc3545", fontSize: "var(--text-sm)", marginBottom: "0.5rem" }}>
            {errorMessage}
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }} disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
