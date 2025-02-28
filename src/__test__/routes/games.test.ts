import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import { testSeed } from "../../db/testSeed";
import { app } from "../..";
import { fetchCredentials } from "../../igdb";

beforeAll(async () => {
  await testSeed();
  await fetchCredentials();
});

describe("GET /games/search/:query", () => {
  test("responds with an array", async () => {
    const response = await request(app).get("/game/search/avowed").expect(200);
    expect(Array.isArray(response.body) && response.body.length > 0).toBe(true);
  });

  test("responds with correct object in array", async () => {
    const response = await request(app).get("/game/search/avowed").expect(200);

    if (Array.isArray(response.body)) {
      expect(response.body[0]).toMatchObject({
        id: 135994,
        cover: {
          id: 356807,
          url: "//images.igdb.com/igdb/image/upload/t_cover_small/co7nbb.jpg",
        },
        first_release_date: 1739836800,
        name: "Avowed",
      });
    }
  });

  test("responds with empty array for unknown search", async () => {
    const response = await request(app)
      .get("/game/search/aerafdgw")
      .expect(200);

    expect(Array.isArray(response.body));
    expect(response.body.length).toBe(0);
  });
});

describe("POST /games/add", () => {
  test("responds success when adding game to list", async () => {
    const response = await request(app)
      .post("/game/add")
      .set("authorization", "bearer testtoken1")
      .send({ gameId: 135994 })
      .expect(200);

    expect(response.body).toMatchObject({ success: true });
  });

  test("response with 401 status code when authorization is not set", async () => {
    await request(app).post("/game/add").send({ gameId: 135994 }).expect(401);
  });

  test("responds with error message when gameId is missing", async () => {
    const response = await request(app)
      .post("/game/add")
      .set("authorization", "bearer testtoken1")
      .expect(400);

    expect(response.body).toMatchObject({
      success: false,
      errors: ["gameId is a required field"],
    });
  });
});

describe("GET /list", () => {
  test("responds with list of games associated with logged-in user", async () => {
    const response = await request(app)
      .get("/game/list")
      .set("authorization", "bearer testtoken1")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toMatchObject({
      id: 135994,
      firstReleaseDate: 1739836800000,
      cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co7nbb.jpg",
      name: "Avowed",
    });
  });

  test("response with 401 status code when authorization is not set", async () => {
    await request(app).post("/game/add").send({ gameId: 135994 }).expect(401);
  });

  test("responds with empty array if user has not added any games", async () => {
    const response = await request(app)
      .get("/game/list")
      .set("authorization", "bearer testtoken2")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
});
