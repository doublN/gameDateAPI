import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import { connection } from "../../db/db";
import { testSeed } from "../../db/testSeed";
import { app } from "../..";
import { fetchCredentials } from "../../igdb";

beforeAll(async () => {
  await testSeed();
  await fetchCredentials();
});

afterAll(async () => {
  await connection.end();
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
});
