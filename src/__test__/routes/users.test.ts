import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import { query } from "../../db/db";
import { testSeed } from "../../db/testSeed";
import { app } from "../..";

beforeAll(async () => {
  await testSeed();
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

describe("POST /login", () => {
  test("responds with token when correct email and password supplied", () => {
    return request(app)
      .post("/user/login")
      .send({
        email: "nathan@test.com",
        password: "password123",
      })
      .expect(200)
      .then((response) => {
        expect(typeof response.body.token === "string").toBe(true);
      });
  });

  test("responds with error object with incorrect password message when incorrect password is supplied", () => {
    return request(app)
      .post("/user/login")
      .send({
        email: "nathan@test.com",
        password: "password122",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual(["Incorrect password"]);
      });
  });

  test("responds with error object with cannot find user message when incorrect email is supplied", () => {
    return request(app)
      .post("/user/login")
      .send({
        email: "nia@test.com",
        password: "password122",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual(["Cannot find user"]);
      });
  });

  test("responds with error object with validation errors for missing request data", () => {
    return request(app)
      .post("/user/login")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual([
          "email is a required field",
          "password is a required field",
        ]);
      });
  });
});

describe("DELETE /logout", () => {
  test("responds with success when correct auth token in header", () => {
    return request(app)
      .delete("/user/logout")
      .set("authorization", "bearer testtoken1")
      .expect(200)
      .then((response) => {
        expect(response.body.success).toBe(true);
      });
  });

  test("responds with 401 status code for non existant token", () => {
    return request(app)
      .delete("/user/logout")
      .set("authorization", "bearer testtoken123123")
      .expect(401);
  });

  test("responds with 401 status code for no authorization header supplied", () => {
    return request(app).delete("/user/logout").expect(401);
  });
});

describe("DELETE /delete", () => {
  test("responds with 401 status code when incorrect auth token supplied", () => {
    return request(app)
      .delete("/user/delete")
      .set("authorization", "bearer testtoken1123123")
      .send({
        email: "tom91@gmail.com",
        password: "password456",
      })
      .expect(401);
  });

  test("responds with error object with cannot find user message when incorrect email is supplied", () => {
    return request(app)
      .delete("/user/delete")
      .set("authorization", "bearer testtoken2")
      .send({
        email: "nia@test.com",
        password: "password122",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual(["Cannot find user"]);
      });
  });

  test("responds with errors when missing request body", () => {
    return request(app)
      .delete("/user/delete")
      .set("authorization", "bearer testtoken2")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual([
          "email is a required field",
          "password is a required field",
        ]);
      });
  });

  test("responds with success when correct auth token in header and correct email and password supplied", () => {
    return request(app)
      .delete("/user/delete")
      .set("authorization", "bearer testtoken2")
      .send({
        email: "tom91@gmail.com",
        password: "password456",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.success).toBe(true);

        return query(`SELECT token FROM sessions WHERE token = 'testtoken2'`);
      })
      .then(([result]) => {
        expect(result).toEqual([]);
      });
  });
});
