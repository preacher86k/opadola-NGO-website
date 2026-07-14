import { NextRequest, NextResponse } from "next/server";
import { pgQuery } from "@/lib/db";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function generateReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `OCI-${timestamp}-${random}`.toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, amount } = body;

    if (!amount || typeof amount !== "number" || amount < 100 || amount > 100000000) {
      return NextResponse.json(
        { success: false, error: "Invalid amount" },
        { status: 400 }
      );
    }

    const reference = generateReference();
    const donorName = name || "Anonymous";
    const donorEmail = email || "anonymous@opadola.org";

    // Save pending donation to DB
    try {
      await pgQuery(
        'INSERT INTO "Donation" (id, name, email, amount, reference, status, "createdAt", "updatedAt") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, NOW(), NOW())',
        [donorName, donorEmail, amount, reference, "pending"]
      );
    } catch (dbErr) {
      console.error("DB write failed:", dbErr);
      return NextResponse.json(
        { success: false, error: "Failed to record donation" },
        { status: 500 }
      );
    }

    // Initialize Paystack transaction
    if (!PAYSTACK_SECRET) {
      return NextResponse.json(
        { success: false, error: "Payment system not configured" },
        { status: 503 }
      );
    }

    const callbackUrl = `${APP_URL}/donate/success?reference=${reference}`;

    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: donorEmail,
        amount: amount * 100,
        reference,
        callback_url: callbackUrl,
        metadata: {
          name: donorName,
          donation_type: "general",
        },
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      return NextResponse.json(
        { success: false, error: paystackData.message || "Payment initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        authorization_url: paystackData.data.authorization_url,
        reference,
      },
    });
  } catch (error) {
    console.error("Donation init error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
