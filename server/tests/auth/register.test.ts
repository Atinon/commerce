import { createTestApp } from "../helpers/app.js";
import type { Express } from "express";
import request from "supertest";
import { makeRegisterData } from "../helpers/user.js";
import { clearUsers, disconnectDatabase } from "../helpers/database.js";
import { REGISTER_URL } from "../helpers/routes.js";
import { prisma } from "#config";
import { comparePassword } from "#utils/auth/password.js";

let app: Express;

beforeAll(async () => {
  app = await createTestApp();
});

beforeEach(async () => {
  await clearUsers();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe(`POST ${REGISTER_URL}`, () => {
  it("creates a user", async () => {
    const registerData = makeRegisterData();
    const response = await request(app).post(REGISTER_URL).send(registerData);
    expect(response.status).toBe(201);

    const user = await prisma.user.findUnique({
      where: {
        email: registerData.email,
      },
    });
    expect(user).not.toBeNull();
  });

  it("rejects wrong email", async () => {
    const response = await request(app)
      .post(REGISTER_URL)
      .send(makeRegisterData({ email: "notanemail" }));
    expect(response.status).toBe(400);
  });

  it("rejects duplicate email", async () => {
    const registerData = makeRegisterData();

    await request(app).post(REGISTER_URL).send(registerData);

    const response = await request(app).post(REGISTER_URL).send(registerData);

    expect(response.status).toBe(409);
  });

  it("hashes password", async () => {
    const registerData = makeRegisterData();
    const response = await request(app).post(REGISTER_URL).send(registerData);
    expect(response.status).toBe(201);

    const user = await prisma.user.findUnique({
      where: { email: registerData.email },
    });
    expect(user).not.toBeNull();

    expect(await comparePassword(registerData.password, user!.password)).toBe(
      true,
    );
  });
});
