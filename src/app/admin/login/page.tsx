import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function AdminLoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h3)", color: "var(--color-primary-900)" }}>Admin Portal</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>Opadola Care Initiative</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
