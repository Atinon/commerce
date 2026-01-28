import type { Env } from "./env.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Declared but initialized in configurePrisma(env)
// Technically can be undefined,
// but if not properly instantiated during server startup,
// that's a serious issue itself.
// Might rework later.
export let prisma: PrismaClient;

export async function configurePrisma(env: Env) {
  if (!prisma) {
    const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
    prisma = new PrismaClient({ adapter });
  }

  // test reachability and open connection | TODO: ensure proper check
  await prisma.$connect();
}
