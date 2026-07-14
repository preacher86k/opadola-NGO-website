"use server";

import { z } from "zod";
import { pgQuery } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export interface ContactResult {
  success: boolean;
  error?: string;
  data?: { id: string };
}

export async function createContact(
  formData: FormData
): Promise<ContactResult> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: (formData.get("subject") as string) || undefined,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return {
      success: false,
      error: firstError?.message || "Invalid input",
    };
  }

  try {
    const result = await pgQuery<{ id: string }>(
      `INSERT INTO "Contact" (name, email, subject, message, status)
       VALUES ($1, $2, $3, $4, 'new')
       RETURNING id`,
      [parsed.data.name, parsed.data.email, parsed.data.subject || null, parsed.data.message]
    );

    return { success: true, data: { id: result.rows[0].id } };
  } catch (error) {
    console.error("Contact creation error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
