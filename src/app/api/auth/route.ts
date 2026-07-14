import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Client } from "pg";

const SESSION_SECRET = process.env.ADMIN_PASSWORD || "opadola-admin-secret";

async function createToken(admin: { id: string; email: string; role: string }): Promise<string> {
  const payload = JSON.stringify({
    id: admin.id,
    email: admin.email,
    role: admin.role,
    exp: Date.now() + 24 * 60 * 60 * 1000,
  });
  const encoded = btoa(payload);

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encoded));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${encoded}.${signatureHex}`;
}

async function findAdminByEmail(email: string) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 8000,
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
      console.error("DB connection error:", dbError);
      return NextResponse.json(
        { success: false, error: "Database unavailable. Please try again." },
        { status: 503 }
      );
    }

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
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
