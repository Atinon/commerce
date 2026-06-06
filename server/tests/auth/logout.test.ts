import { createTestApp } from "../helpers/app.js";
import type { Express } from "express";
import { clearUsers, disconnectDatabase } from "../helpers/database.js";
import request from "supertest";
import { makeRegisterData } from "../helpers/user.js";
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from "../helpers/routes.js";

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

describe(`POST ${LOGOUT_URL}`, () => {
  it("log out authenticated user", async () => {
    const registerData = makeRegisterData();
    const agent = request.agent(app);
    await agent.post(REGISTER_URL).send(registerData);
    await agent.post(LOGIN_URL).send(registerData);
    const response = await agent.post(LOGOUT_URL);
    expect(response.status).toBe(200);
  });

  it("return 401 for unauthenticated request", async () => {
    const response = await request(app).post(LOGOUT_URL);
    expect(response.status).toBe(401);
  });
});
