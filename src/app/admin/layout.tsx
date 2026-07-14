import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "240px", background: "var(--bg-secondary)", borderRight: "1px solid var(--border-light)", padding: "1.5rem 0", flexShrink: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 1.5rem 1.5rem", borderBottom: "1px solid var(--border-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-primary)" }}>OCI Admin</h2>
        </div>
        <nav style={{ padding: "1rem 0", flex: 1 }}>
          <Link href="/admin" style={{ display: "block", padding: "0.75rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)", textDecoration: "none" }}>Dashboard</Link>
          <Link href="/admin/volunteers" style={{ display: "block", padding: "0.75rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)", textDecoration: "none" }}>Volunteers</Link>
          <Link href="/admin/contacts" style={{ display: "block", padding: "0.75rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)", textDecoration: "none" }}>Contacts</Link>
          <Link href="/admin/donations" style={{ display: "block", padding: "0.75rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)", textDecoration: "none" }}>Donations</Link>
          <Link href="/admin/media" style={{ display: "block", padding: "0.75rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-primary)", textDecoration: "none" }}>Media</Link>
        </nav>
        <LogoutButton />
      </aside>
      <main style={{ flex: 1, padding: "2rem", background: "var(--bg-primary)" }}>
        {children}
      </main>
    </div>
  );
}
