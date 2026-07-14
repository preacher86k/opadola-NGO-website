import { pgQuery } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: string;
}

export default async function AdminVolunteers() {
  let volunteers: Volunteer[] = [];

  try {
    const result = await pgQuery<Volunteer>(
      'SELECT id, "fullName", email, status, "createdAt" FROM "Volunteer" ORDER BY "createdAt" DESC'
    );
    volunteers = result.rows;
  } catch (e) {
    console.error("Volunteers query error:", e);
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "2rem" }}>Volunteers</h1>

      <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Name</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Email</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Status</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((v) => (
              <tr key={v.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", fontWeight: 500 }}>{v.fullName}</td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{v.email}</td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <span style={{ padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 600, background: v.status === "approved" ? "var(--color-primary-100)" : v.status === "pending" ? "#fef3c7" : "#fee2e2", color: v.status === "approved" ? "var(--color-primary-700)" : v.status === "pending" ? "#92400e" : "#991b1b" }}>{v.status}</span>
                </td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{new Date(v.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {volunteers.length === 0 && <p style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>No volunteers yet.</p>}
      </div>
    </div>
  );
}
