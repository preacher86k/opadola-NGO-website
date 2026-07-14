"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" }).catch(() => {});
    window.location.href = "/admin/login";
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        display: "block",
        width: "100%",
        padding: "0.75rem 1.5rem",
        fontSize: "var(--text-sm)",
        color: "var(--color-error, #dc3545)",
        textDecoration: "none",
        background: "none",
        border: "none",
        textAlign: "left",
        cursor: "pointer",
        borderTop: "1px solid var(--border-light)",
        marginTop: "auto",
      }}
    >
      Logout
    </button>
  );
}
