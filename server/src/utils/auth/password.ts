// might change to argon2id further on

import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // default bcrypt recommended value

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  plainTextPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
}

export const fallbackHash = bcrypt.hashSync("invalidpassword", SALT_ROUNDS);
