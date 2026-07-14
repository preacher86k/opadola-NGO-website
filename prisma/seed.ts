import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create default admin
  const adminEmail = process.env.ADMIN_EMAIL || "admin@opadola.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me-in-production";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash,
      role: "admin",
    },
  });

  console.log(`Admin created: ${admin.email}`);

  // Create sample volunteer
  await prisma.volunteer.upsert({
    where: { id: "sample-volunteer" },
    update: {},
    create: {
      id: "sample-volunteer",
      fullName: "Sample Volunteer",
      email: "volunteer@example.com",
      phone: "+234 800 000 0000",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      skills: "Teaching, Community Outreach",
      interestArea: "Children's Education",
      availability: "Weekends",
      motivation: "I want to help children in need.",
      status: "approved",
    },
  });

  console.log("Sample data seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
