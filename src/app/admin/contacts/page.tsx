import { pgQuery } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default async function AdminContacts() {
  let contacts: Contact[] = [];

  try {
    const result = await pgQuery<Contact>(
      'SELECT id, name, email, subject, message, "createdAt" FROM "Contact" ORDER BY "createdAt" DESC'
    );
    contacts = result.rows;
  } catch (e) {
    console.error("Contacts query error:", e);
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "2rem" }}>Contact Messages</h1>

      <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Name</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Email</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Subject</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{c.email}</td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)" }}>{c.subject}</td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts.length === 0 && <p style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>No messages yet.</p>}
      </div>
    </div>
  );
}
