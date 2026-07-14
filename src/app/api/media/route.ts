import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { pgQuery } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "opadola/general";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File too large (max 10MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { public_id: string; secure_url: string });
        }
      );
      uploadStream.end(buffer);
    });

    await pgQuery(
      'INSERT INTO "Media" (id, "publicId", url, folder, "createdAt") VALUES (gen_random_uuid()::text, $1, $2, $3, NOW())',
      [result.public_id, result.secure_url, folder]
    );

    return NextResponse.json({
      success: true,
      data: { publicId: result.public_id, url: result.secure_url },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const folder = request.nextUrl.searchParams.get("folder");

    let sql = 'SELECT id, "publicId", url, folder, "uploadedBy", "createdAt" FROM "Media"';
    const params: string[] = [];

    if (folder) {
      sql += " WHERE folder = $1";
      params.push(folder);
    }

    sql += ' ORDER BY "createdAt" DESC';

    const result = await pgQuery(sql, params);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Media list error:", error);
    return NextResponse.json({ success: false, error: "Failed to list media" }, { status: 500 });
  }
}
