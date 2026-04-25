import request from "supertest";
import app from "../index.js";

describe("API Test", () => {
  it("should return 200 from /api", async () => {
    const res = await request(app).get("/api");

    expect(res.statusCode).toBe(200);
  });
});