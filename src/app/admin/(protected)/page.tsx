import { pgQuery } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let volunteerCount = 0;
  let contactCount = 0;
  let totalDonations = 0;
  let pendingCount = 0;
  let recentDonations: { id: string; name: string | null; email: string | null; amount: number; status: string; createdAt: string }[] = [];

  try {
    const [vc, cc, da, pd, rd] = await Promise.all([
      pgQuery<{ count: string }>('SELECT COUNT(*) as count FROM "Volunteer"'),
      pgQuery<{ count: string }>('SELECT COUNT(*) as count FROM "Contact"'),
      pgQuery<{ sum: string | null }>('SELECT COALESCE(SUM(amount), 0) as sum FROM "Donation" WHERE status = $1', ["success"]),
      pgQuery<{ count: string }>('SELECT COUNT(*) as count FROM "Volunteer" WHERE status = $1', ["pending"]),
      pgQuery<{ id: string; name: string | null; email: string | null; amount: number; status: string; createdAt: string }>(
        'SELECT id, name, email, amount, status, "createdAt" FROM "Donation" ORDER BY "createdAt" DESC LIMIT 5'
      ),
    ]);

    volunteerCount = parseInt(vc.rows[0]?.count || "0", 10);
    contactCount = parseInt(cc.rows[0]?.count || "0", 10);
    totalDonations = parseInt(da.rows[0]?.sum || "0", 10);
    pendingCount = parseInt(pd.rows[0]?.count || "0", 10);
    recentDonations = rd.rows;
  } catch (e) {
    console.error("Dashboard query error:", e);
  }

  const stats = [
    { label: "Volunteers", value: volunteerCount, href: "/admin/volunteers" },
    { label: "Total Donations", value: `\u20A6${totalDonations.toLocaleString()}`, href: "/admin/donations" },
    { label: "Messages", value: contactCount, href: "/admin/contacts" },
    { label: "Pending Reviews", value: pendingCount, href: "/admin/volunteers" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "2rem" }}>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        {stats.map((stat) => (
          <a key={stat.label} href={stat.href} style={{ padding: "1.5rem", background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", textDecoration: "none", transition: "transform 0.2s" }}>
            <div style={{ fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-primary)" }}>{stat.value}</div>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{stat.label}</div>
          </a>
        ))}
      </div>

      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "1rem" }}>Recent Activity</h2>

      <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
        {recentDonations.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>No recent donations yet.</p>
        ) : (
          recentDonations.map((d) => (
            <div key={d.id} style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: "var(--text-sm)" }}>{d.name || "Anonymous"}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>{d.email || "No email"}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 600, color: "var(--color-primary)" }}>&#8358;{d.amount.toLocaleString()}</div>
                <div style={{ fontSize: "var(--text-xs)", color: d.status === "success" ? "green" : "var(--text-secondary)" }}>{d.status}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}