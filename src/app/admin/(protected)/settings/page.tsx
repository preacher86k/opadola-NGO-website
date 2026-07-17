"use client";

import { useState } from "react";

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to update password");
        setLoading(false);
        return;
      }

      setSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "2rem" }}>Settings</h1>

      <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", padding: "2rem", maxWidth: "480px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--color-primary-900)", marginBottom: "1.5rem" }}>Change Password</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="currentPassword" style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, marginBottom: "0.5rem" }}>Current Password</label>
            <input
              id="currentPassword"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
            />
          </div>

          <div>
            <label htmlFor="newPassword" style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, marginBottom: "0.5rem" }}>New Password</label>
            <input
              id="newPassword"
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, marginBottom: "0.5rem" }}>Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
            />
          </div>

          {error && (
            <div style={{ padding: "0.75rem 1rem", background: "rgba(220,53,69,0.1)", border: "1px solid rgba(220,53,69,0.3)", borderRadius: "var(--radius-md)", color: "#dc3545", fontSize: "var(--text-sm)" }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ padding: "0.75rem 1rem", background: "rgba(40,167,69,0.1)", border: "1px solid rgba(40,167,69,0.3)", borderRadius: "var(--radius-md)", color: "#28a745", fontSize: "var(--text-sm)" }}>
              {success}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", alignSelf: "flex-start" }} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
