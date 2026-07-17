import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Client } from "pg";
import { createToken } from "@/lib/auth";

async function findAdminByEmail(email: string) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 2000,
  });

  try {
    await client.connect();
    const result = await client.query(
      'SELECT id, email, name, "passwordHash", role FROM "Admin" WHERE email = $1 LIMIT 1',
      [email]
    );
    return result.rows[0] || null;
  } finally {
    await client.end().catch(() => {});
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    let admin;
    try {
      admin = await findAdminByEmail(email);
    } catch (dbError) {
      console.error("DB connection error, falling back to env vars:", dbError);
    }

    if (!admin) {
      // Fallback: check against env vars
      const envAdminEmail = process.env.ADMIN_EMAIL;
      const envAdminPassword = process.env.ADMIN_PASSWORD;
      if (email === envAdminEmail && password === envAdminPassword) {
        admin = { id: "env-admin", email, name: "Admin", role: "admin" };
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }
    }

    const token = await createToken(admin);

    const response = NextResponse.json({
      success: true,
      data: { name: admin.name, email: admin.email, role: admin.role },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
