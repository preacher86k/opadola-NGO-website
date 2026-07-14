import { NextRequest, NextResponse } from "next/server";
import { pgQuery } from "@/lib/db";
import { sendVolunteerStatusUpdate } from "@/lib/email";

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "id and status required" }, { status: 400 });
    }

    if (!["approved", "pending", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    const result = await pgQuery<{ fullName: string; email: string }>(
      'UPDATE "Volunteer" SET status = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING "fullName", email',
      [status, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Volunteer not found" }, { status: 404 });
    }

    const v = result.rows[0];
    await sendVolunteerStatusUpdate({ name: v.fullName, email: v.email, status });

    return NextResponse.json({ success: true, data: { status } });
  } catch (error) {
    console.error("Volunteer status update error:", error);
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
