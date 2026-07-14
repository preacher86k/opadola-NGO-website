"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label htmlFor="email" style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, marginBottom: "0.5rem" }}>Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
        />
      </div>
      <div>
        <label htmlFor="password" style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, marginBottom: "0.5rem" }}>Password</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
        />
      </div>

      {error && (
        <div style={{ padding: "0.75rem 1rem", background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.3)", borderRadius: "var(--radius-md)", color: "#dc3545", fontSize: "var(--text-sm)" }}>
          {error}
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }} disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
