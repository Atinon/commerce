import { createTestApp } from "../helpers/app.js";
import type { Express } from "express";
import { clearUsers, disconnectDatabase } from "../helpers/database.js";
import { makeRegisterData, registerUser } from "../helpers/user.js";
import { LOGIN_URL, ACCOUNT_URL } from "../helpers/routes.js";
import request from "supertest";

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

describe(`POST ${LOGIN_URL}`, () => {
  it("logs in valid user", async () => {
    const registerData = makeRegisterData();
    await registerUser(registerData);

    const response = await request(app).post(LOGIN_URL).send(registerData);
    expect(response.status).toBe(200);
  });

  it("rejects unknown email", async () => {
    const response = await request(app).post(LOGIN_URL).send({
      email: "missing@test.com",
      password: "Valid123",
    });
    expect(response.status).toBe(401);
  });

  it("rejects wrong password", async () => {
    const registerData = makeRegisterData();
    await registerUser(registerData);

    const response = await request(app).post(LOGIN_URL).send({
      email: registerData.email,
      password: "WrongPassword123",
    });
    expect(response.status).toBe(401);
  });

  it("creates usable authenticated session", async () => {
    const registerData = makeRegisterData();
    await registerUser(registerData);

    const agent = request.agent(app);
    const loginResponse = await agent.post(LOGIN_URL).send(registerData);
    expect(loginResponse.status).toBe(200);

    const accountResponse = await agent.get(ACCOUNT_URL);
    expect(accountResponse.status).toBe(200);
  });
});
