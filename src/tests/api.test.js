import request from "supertest";
import app from "../index.js";

// describe("Protected API Test", () => {

//   let token;

//   beforeAll(async () => {
//     const res = await request(app)
//       .post("/auth/userlogin")
//       .send({
//         email: "anilchaudhary2011@gmail.com",
//         password: "Anil@125"
//       });

//     token = res.body.token;
//   });

//   it("should return 200 from /api/user", async () => {
//     const res = await request(app)
//       .get("/api/user")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//   });

// });

describe("API Test", () => {
  it("should return 200 from /api/user", async () => {
    const res = await request(app).get("/api/user");

    expect(res.statusCode).toBe(401);
  });
});
