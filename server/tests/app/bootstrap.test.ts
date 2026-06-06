import { createTestApp } from "../helpers/app.js";

describe("test app bootstrap", () => {
  it("create the application", async () => {
    const app = await createTestApp();

    expect(app).toBeDefined();
  });
});
