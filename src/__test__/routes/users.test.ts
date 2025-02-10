import "jest-extended";
import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import { connection } from "../../db/db";
import { testSeed } from "../../db/testSeed";
import { app } from "../..";

beforeAll(async () => {
  await testSeed();
});

afterAll(async () => {
  await connection.end();
});

describe("POST /create", () => {
  test("new user is created and response with success = true", () => {
    return request(app)
      .post("/user/create")
      .send({
        username: "doubln",
        email: "nathan@test.com",
        password: "password123",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.success).toBe(true);
      });
  });

  test("new user failed to be created and response with success = false and error message", () => {
    return request(app)
      .post("/user/create")
      .send({
        username: "doubln",
        email: "nathan@test.com",
        password: "password123",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual(["This entry already exists"]);
      });
  });

  test("empty request body responds with error object", () => {
    return request(app)
      .post("/user/create")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual([
          "username is a required field",
          "email is a required field",
          "password is a required field",
        ]);
      });
  });
});
