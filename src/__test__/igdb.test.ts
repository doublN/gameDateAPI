import dotenv from "dotenv";
import "jest-extended";
import { describe, expect, test } from "@jest/globals";
import { credentials, fetchCredentials, getGamesBySearch } from "../igdb";

dotenv.config();

describe("fetch credentials", () => {
  test("correctly fetches credentials", async () => {
    await fetchCredentials();

    expect(credentials.access_token).toBeString();
    expect(credentials.expires_in).toBeNumber();
    expect(credentials.token_type).toBeString();
    expect(credentials.token_type).toBe("bearer");
  });
});

describe("getGamesBySearch", () => {
  test("correctly fetches games", async () => {
    const games = await getGamesBySearch("avowed");

    expect(games).toBeArray();
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
