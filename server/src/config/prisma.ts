import type { Env } from "./env.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export async function configurePrisma(env: Env) {
  if (!prisma) {
    const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
    prisma = new PrismaClient({ adapter });
  }

  // test reachability and open connection | TODO: ensure proper check
  await prisma.$connect();
}

export function getPrisma() {
  if (!prisma) {
    throw new Error("Prisma client not initialized.");
  }
  return prisma;
}
