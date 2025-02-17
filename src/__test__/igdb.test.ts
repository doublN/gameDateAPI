import dotenv from "dotenv";
import "jest-extended";
import { describe, expect, test } from "@jest/globals";
import { credentials, fetchCredentials } from "../igdb";

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
