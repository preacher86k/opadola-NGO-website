import { pgQuery } from "@/lib/db";

export interface PageMediaItem {
  id: string;
  publicId: string;
  url: string;
  folder: string;
}

export async function getPageMedia(folder: string, limit = 12): Promise<PageMediaItem[]> {
  try {
    const result = await pgQuery<PageMediaItem>(
      'SELECT id, "publicId", url, folder FROM "Media" WHERE folder LIKE $1 ORDER BY "createdAt" DESC LIMIT $2',
      [`${folder}%`, limit]
    );

    return result.rows;
  } catch (error) {
    console.error(`Media fetch failed for ${folder}:`, error);
    return [];
  }
}

export function mediaTitle(publicId: string): string {
  const filename = publicId.split("/").pop() || "Media item";
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}
