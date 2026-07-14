import { NextRequest, NextResponse } from "next/server";
import { pgQuery } from "@/lib/db";
import { sendVolunteerConfirmation, sendAdminVolunteerNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, city, state, country, skills, interestArea, availability, motivation } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Full name and email are required" },
        { status: 400 }
      );
    }

    await pgQuery(
      `INSERT INTO "Volunteer" (id, "fullName", email, phone, city, state, country, skills, "interestArea", availability, motivation, status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())`,
      [fullName, email, phone || null, city || null, state || null, country || null, skills || null, interestArea || null, availability || null, motivation || null, "pending"]
    );

    // Send confirmation + admin notification (fire-and-forget)
    await Promise.allSettled([
      sendVolunteerConfirmation({ name: fullName, email }),
      sendAdminVolunteerNotification({ name: fullName, email, interestArea }),
    ]);

    return NextResponse.json({ success: true, data: { id: "submitted" } }, { status: 201 });
  } catch (error) {
    console.error("Volunteer API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
