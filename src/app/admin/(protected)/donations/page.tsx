import { pgQuery } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Donation {
  id: string;
  name: string | null;
  email: string | null;
  amount: number;
  status: string;
  reference: string;
  createdAt: string;
}

export default async function AdminDonations() {
  let donations: Donation[] = [];

  try {
    const result = await pgQuery<Donation>(
      'SELECT id, name, email, amount, status, reference, "createdAt" FROM "Donation" ORDER BY "createdAt" DESC'
    );
    donations = result.rows;
  } catch (e) {
    console.error("Donations query error:", e);
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "2rem" }}>Donations</h1>

      <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Name</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Email</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Amount</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Status</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Reference</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", fontWeight: 500 }}>{d.name || "Anonymous"}</td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{d.email || "—"}</td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-primary)" }}>&#8358;{d.amount.toLocaleString()}</td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <span style={{ padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 600, background: d.status === "success" ? "var(--color-primary-100)" : d.status === "pending" ? "#fef3c7" : "#fee2e2", color: d.status === "success" ? "var(--color-primary-700)" : d.status === "pending" ? "#92400e" : "#991b1b" }}>{d.status}</span>
                </td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)", fontFamily: "monospace" }}>{d.reference}</td>
                <td style={{ padding: "1rem 1.5rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{new Date(d.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {donations.length === 0 && <p style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>No donations yet.</p>}
      </div>
    </div>
  );
}