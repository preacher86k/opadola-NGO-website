import { NextRequest, NextResponse } from "next/server";
import { pgQuery } from "@/lib/db";
import { sendContactAutoReply, sendContactAdminNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot spam protection
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message must be 10-5000 characters" },
        { status: 400 }
      );
    }

    await pgQuery(
      'INSERT INTO "Contact" (id, name, email, subject, message, "createdAt") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, NOW())',
      [name, email, subject || null, message]
    );

    // Send auto-reply to the person + admin notification (fire-and-forget)
    await Promise.allSettled([
      sendContactAutoReply({ name, email, subject }),
      sendContactAdminNotification({ name, email, subject, message }),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
