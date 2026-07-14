import { NextRequest, NextResponse } from "next/server";
import { pgQuery } from "@/lib/db";
import { sendDonationConfirmation, sendAdminDonationNotification } from "@/lib/email";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const WEBHOOK_SECRET = process.env.PAYSTACK_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    if (!WEBHOOK_SECRET || WEBHOOK_SECRET === "whsec_xxxxx") {
      console.error("PAYSTACK_WEBHOOK_SECRET not configured — verifying via API instead");

      const event = JSON.parse(body);
      if (event.event === "charge.success") {
        await handleSuccessfulPayment(event);
      }
      return NextResponse.json({ received: true });
    }

    // Verify webhook signature
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    if (event.event === "charge.success") {
      await handleSuccessfulPayment(event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

async function handleSuccessfulPayment(event: { data: { reference: string; status: string; paid_at: string; channel?: string; amount?: number; currency?: string; id?: number } }) {
  const { reference, paid_at, channel } = event.data;

  // Verify payment via Paystack API
  if (!PAYSTACK_SECRET) return;

  try {
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      console.error("Payment verification failed for", reference);
      return;
    }

    await pgQuery(
      'UPDATE "Donation" SET status = $1, "paymentMethod" = $2, metadata = $3, "updatedAt" = NOW() WHERE reference = $4',
      [
        "success",
        channel || verifyData.data.channel || "paystack",
        JSON.stringify({
          paystack_id: verifyData.data.id,
          paid_at: paid_at || verifyData.data.paid_at,
          channel: verifyData.data.channel,
          currency: verifyData.data.currency,
        }),
        reference,
      ]
    );

    // Send confirmation email to donor + admin notification
    const donationResult = await pgQuery<{ name: string | null; email: string | null; amount: number }>(
      'SELECT name, email, amount FROM "Donation" WHERE reference = $1 LIMIT 1',
      [reference]
    );

    if (donationResult.rows.length > 0) {
      const d = donationResult.rows[0];
      const donorName = d.name || "Anonymous";
      const donorEmail = d.email;
      const amount = d.amount;

      if (donorEmail) {
        await sendDonationConfirmation({ name: donorName, email: donorEmail, amount, reference });
      }
      await sendAdminDonationNotification({ name: donorName, email: donorEmail || "anonymous", amount, reference });
    }

    console.log(`Donation ${reference} confirmed successfully`);
  } catch (err) {
    console.error("Webhook payment update failed:", err);
  }
}
