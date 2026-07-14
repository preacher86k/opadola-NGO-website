"use server";

import { pgQuery } from "@/lib/db";
import { sendVolunteerConfirmation, sendAdminVolunteerNotification } from "@/lib/email";

export interface VolunteerResult {
  success: boolean;
  error?: string;
  data?: { id: string };
}

export async function createVolunteer(
  formData: FormData
): Promise<VolunteerResult> {
  const rawData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || null,
    city: (formData.get("city") as string) || null,
    state: (formData.get("state") as string) || null,
    country: (formData.get("country") as string) || null,
    skills: (formData.get("skills") as string) || null,
    interestArea: (formData.get("interestArea") as string) || null,
    availability: (formData.get("availability") as string) || null,
    motivation: (formData.get("motivation") as string) || null,
  };

  if (!rawData.fullName || rawData.fullName.length < 2) {
    return { success: false, error: "Name must be at least 2 characters" };
  }

  if (!rawData.email || !rawData.email.includes("@")) {
    return { success: false, error: "Please enter a valid email address" };
  }

  try {
    const result = await pgQuery<{ id: string }>(
      `INSERT INTO "Volunteer" (id, "fullName", email, phone, city, state, country, skills, "interestArea", availability, motivation, status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW()) RETURNING id`,
      [rawData.fullName, rawData.email, rawData.phone, rawData.city, rawData.state, rawData.country, rawData.skills, rawData.interestArea, rawData.availability, rawData.motivation, "pending"]
    );

    const id = result.rows[0]?.id || "submitted";

    // Send emails (fire-and-forget)
    await Promise.allSettled([
      sendVolunteerConfirmation({ name: rawData.fullName, email: rawData.email }),
      sendAdminVolunteerNotification({ name: rawData.fullName, email: rawData.email, interestArea: rawData.interestArea || undefined }),
    ]);

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Volunteer creation error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
