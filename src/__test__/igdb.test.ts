import dotenv from "dotenv";
import { describe, expect, test } from "@jest/globals";
import { credentials, fetchCredentials, getGamesBySearch } from "../igdb";

dotenv.config();

describe("fetch credentials", () => {
  test("correctly fetches credentials", async () => {
    await fetchCredentials();

    expect(typeof credentials.access_token === "string").toBe(true);
    expect(typeof credentials.expires_in === "number").toBe(true);
    expect(typeof credentials.token_type === "string").toBe(true);
    expect(credentials.token_type).toBe("bearer");
  });
});

describe("getGamesBySearch", () => {
  test("correctly fetches games", async () => {
    const games = await getGamesBySearch("avowed");

    expect(Array.isArray(games)).toBe(true);
    expect(games[0]).toMatchObject({
      id: 135994,
      cover: {
        id: 356807,
        url: "//images.igdb.com/igdb/image/upload/t_thumb/co7nbb.jpg",
      },
      first_release_date: 1739836800,
      name: "Avowed",
    });
  });
});
