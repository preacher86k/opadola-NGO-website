import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { pgQuery } from "@/lib/db";

export async function DELETE(request: NextRequest) {
  try {
    const { id, publicId } = await request.json();

    if (!id || !publicId) {
      return NextResponse.json({ success: false, error: "id and publicId required" }, { status: 400 });
    }

    const resourceType = publicId.includes("/raw/") ? "raw" : "image";
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    await pgQuery('DELETE FROM "Media" WHERE id = $1', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}
