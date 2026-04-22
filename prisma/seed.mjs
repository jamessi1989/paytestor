// Dev seed: creates 24 KYC-verified testers across common region/language combos
// so any campaign the developer creates in dev mode can get a full 12-tester roster.
// Idempotent: uses email as a stable key, skips existing rows.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

const PERSONAS = [
  // US English — 8
  { name: "Mia Chen", region: "US", language: "en" },
  { name: "Jordan Park", region: "US", language: "en" },
  { name: "Ava Rodriguez", region: "US", language: "en" },
  { name: "Liam Patel", region: "US", language: "en" },
  { name: "Noah Kim", region: "US", language: "en" },
  { name: "Sophia Nguyen", region: "US", language: "en" },
  { name: "Ethan Alvarez", region: "US", language: "en" },
  { name: "Zoe Washington", region: "US", language: "en" },
  // UK English — 4
  { name: "Oliver Harris", region: "UK", language: "en" },
  { name: "Amelia Clarke", region: "UK", language: "en" },
  { name: "Harry Evans", region: "UK", language: "en" },
  { name: "Isla Foster", region: "UK", language: "en" },
  // Germany — 4
  { name: "Lukas Weber", region: "DE", language: "de" },
  { name: "Mia Schmidt", region: "DE", language: "de" },
  { name: "Felix Becker", region: "DE", language: "de" },
  { name: "Lena Braun", region: "DE", language: "de" },
  // France — 4
  { name: "Louis Martin", region: "FR", language: "fr" },
  { name: "Chloé Bernard", region: "FR", language: "fr" },
  { name: "Hugo Petit", region: "FR", language: "fr" },
  { name: "Emma Durand", region: "FR", language: "fr" },
  // Japan — 4
  { name: "Yuki Tanaka", region: "JP", language: "ja" },
  { name: "Haruto Sato", region: "JP", language: "ja" },
  { name: "Sakura Ito", region: "JP", language: "ja" },
  { name: "Ren Yamada", region: "JP", language: "ja" },
];

function slug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]+/g, ".")
    .replace(/^\.|\.$/g, "");
}

async function main() {
  let created = 0;
  let skipped = 0;

  for (const p of PERSONAS) {
    const email = `${slug(p.name)}.${p.region.toLowerCase()}@crewqa.test`;
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      skipped++;
      continue;
    }
    await db.user.create({
      data: {
        email,
        name: p.name,
        role: "TESTER",
        emailVerified: new Date(),
        image: `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(p.name)}`,
        tester: {
          create: {
            region: p.region,
            language: p.language,
            kycStatus: "VERIFIED",
          },
        },
      },
    });
    created++;
  }

  const total = await db.tester.count();
  console.log(
    `Seed complete — created ${created}, skipped ${skipped}. Total testers in DB: ${total}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
