import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/lib/auth";
import { pgQuery } from "@/lib/db";

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const admin = await verifyToken(token);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }

    let dbAvailable = false;
    try {
      const result = await pgQuery<{ id: string; email: string; passwordHash: string }>(
        'SELECT id, email, "passwordHash" FROM "Admin" WHERE email = $1 LIMIT 1',
        [admin.email]
      );
      if (result.rows.length > 0) {
        dbAvailable = true;
        const dbAdmin = result.rows[0];
        const valid = await bcrypt.compare(currentPassword, dbAdmin.passwordHash);
        if (!valid) {
          return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 401 });
        }
        const newHash = await bcrypt.hash(newPassword, 12);
        await pgQuery('UPDATE "Admin" SET "passwordHash" = $1 WHERE id = $2', [newHash, dbAdmin.id]);
        return NextResponse.json({ success: true, data: { message: "Password updated successfully" } });
      }
    } catch {
      console.error("DB unavailable for password change");
    }

    if (!dbAvailable) {
      const envAdminEmail = process.env.ADMIN_EMAIL;
      const envAdminPassword = process.env.ADMIN_PASSWORD;
      if (currentPassword !== envAdminPassword || admin.email !== envAdminEmail) {
        return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 401 });
      }
      return NextResponse.json(
        { success: false, error: "Database is offline. Password cannot be changed until the database is reconnected." },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
