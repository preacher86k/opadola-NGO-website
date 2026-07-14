"use server";

import { z } from "zod";
import { pgQuery } from "@/lib/db";
import { sendContactAutoReply, sendContactAdminNotification } from "@/lib/email";

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
      `INSERT INTO "Contact" (id, name, email, subject, message, "createdAt")
       VALUES (gen_random_uuid()::text, $1, $2, $3, $4, NOW())
       RETURNING id`,
      [parsed.data.name, parsed.data.email, parsed.data.subject || null, parsed.data.message]
    );

    const id = result.rows[0]?.id || "submitted";

    // Send auto-reply + admin notification (fire-and-forget)
    await Promise.allSettled([
      sendContactAutoReply({ name: parsed.data.name, email: parsed.data.email, subject: parsed.data.subject }),
      sendContactAdminNotification({ name: parsed.data.name, email: parsed.data.email, subject: parsed.data.subject, message: parsed.data.message }),
    ]);

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Contact creation error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
