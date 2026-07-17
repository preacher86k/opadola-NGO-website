import { NextRequest, NextResponse } from "next/server";
import { pgQuery } from "@/lib/db";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

async function verifyWithPaystack(reference: string): Promise<{ status: string; amount: number } | null> {
  if (!PAYSTACK_SECRET) return null;

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });
    const data = await res.json();

    if (data.status && data.data) {
      return {
        status: data.data.status,
        amount: data.data.amount / 100,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ success: false, error: "No reference provided" }, { status: 400 });
  }

  try {
    // If DB is available, check and update locally
    let dbAvailable = true;
    let donation: Record<string, unknown> | null = null;

    try {
      const result = await pgQuery(
        'SELECT id, name, email, amount, reference, status, "createdAt" FROM "Donation" WHERE reference = $1 LIMIT 1',
        [reference]
      );
      donation = result.rows[0] || null;
    } catch {
      dbAvailable = false;
    }

    // Verify with Paystack directly (works without webhook)
    const paystackResult = await verifyWithPaystack(reference);

    if (paystackResult && paystackResult.status === "success") {
      if (dbAvailable && donation) {
        await pgQuery(
          'UPDATE "Donation" SET status = $1, "updatedAt" = NOW() WHERE reference = $2 AND status != $1',
          ["success", reference]
        ).catch(() => {});
      }

      if (donation) {
        donation.status = "success";
        donation.amount = paystackResult.amount;
      } else {
        donation = {
          id: "pending",
          name: null,
          email: null,
          amount: paystackResult.amount,
          reference,
          status: "success",
          createdAt: new Date().toISOString(),
        };
      }
    }

    if (!donation) {
      return NextResponse.json({ success: false, error: "Donation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: donation });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
