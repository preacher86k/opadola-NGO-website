import { NextRequest, NextResponse } from "next/server";
import { pgQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ success: false, error: "No reference provided" }, { status: 400 });
  }

  try {
    const result = await pgQuery(
      'SELECT id, name, email, amount, reference, status, "createdAt" FROM "Donation" WHERE reference = $1 LIMIT 1',
      [reference]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Donation not found" }, { status: 404 });
    }

    const donation = result.rows[0];
    return NextResponse.json({ success: true, data: donation });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
