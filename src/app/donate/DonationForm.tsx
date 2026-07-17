"use client";

import { useState } from "react";

const PRESET_AMOUNTS = [25000, 50000, 100000, 200000, 500000];

export default function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState(25000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState("");

  const amount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  function handlePresetClick(amt: number) {
    setSelectedAmount(amt);
    setCustomAmount("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!amount || amount < 100) {
      setError("Please enter a valid amount (minimum ₦100).");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: anonymous ? "Anonymous" : name,
          email,
          amount,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Failed to initialize payment.");
        setStatus("idle");
        return;
      }

      window.location.href = data.data.authorization_url;
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  function formatNaira(n: number) {
    return new Intl.NumberFormat("en-NG").format(n);
  }

  return (
    <div className="dt-form-card">
      <form id="donationForm" className="dt-form" data-validate onSubmit={handleSubmit}>
        <h3 className="dt-form-card-title">Select Donation Amount</h3>

        <div className="dt-amounts">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              className={`dt-amount${selectedAmount === amt && !customAmount ? " selected" : ""}`}
              onClick={() => handlePresetClick(amt)}
            >
              ₦{formatNaira(amt)}
            </button>
          ))}
        </div>

        <div className="dt-custom">
          <label className="dt-custom-label" htmlFor="customAmount">Or enter a custom amount</label>
          <div className="dt-custom-input-wrap">
            <span className="dt-custom-prefix">₦</span>
            <input
              type="number"
              id="customAmount"
              className="dt-custom-input"
              placeholder="0.00"
              min="100"
              step="100"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                if (e.target.value) setSelectedAmount(0);
              }}
            />
          </div>
        </div>

        <div className="dt-form-divider" aria-hidden="true"></div>

        <div className="dt-field">
          <label className="dt-field-label" htmlFor="donorName">Full Name *</label>
          <input
            type="text"
            id="donorName"
            className="dt-field-input"
            placeholder="Your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="dt-field">
          <label className="dt-field-label" htmlFor="donorEmail">Email Address *</label>
          <input
            type="email"
            id="donorEmail"
            className="dt-field-input"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="dt-field">
          <label className="dt-field-label" htmlFor="donorPhone">Phone Number</label>
          <input
            type="tel"
            id="donorPhone"
            className="dt-field-input"
            placeholder="+234 xxx xxx xxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <label className="dt-check">
          <input
            type="checkbox"
            className="dt-check-input"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          <span className="dt-check-box" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="12" height="12"><path d="M20 6L9 17l-5-5"></path></svg>
          </span>
          <span className="dt-check-text">Make my donation anonymous</span>
        </label>

        {error && (
          <div style={{ padding: "0.75rem 1rem", background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.3)", borderRadius: "var(--radius-md)", color: "#dc3545", fontSize: "var(--text-sm)" }}>
            {error}
          </div>
        )}

        <button type="submit" className="dt-submit" id="submitBtn" disabled={status === "submitting"}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span className="dt-submit-text">
            {status === "submitting" ? "Processing..." : `Donate ₦${formatNaira(amount)}`}
          </span>
          <div className="dt-submit-spinner" aria-hidden="true" style={{ display: status === "submitting" ? "flex" : "none" }}>
            <div className="dt-spinner"></div>
          </div>
        </button>

        <p className="dt-form-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          Secured by Paystack. Your payment information is encrypted end-to-end.
        </p>
      </form>
    </div>
  );
}
