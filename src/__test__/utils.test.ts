import { describe, expect, test } from "@jest/globals";
import { timeDifference } from "../utils/date.js";
import { IncomingHttpHeaders } from "http";
import { getBearer } from "../utils/headers.js";
import { object, string } from "yup";
import { handleError } from "../utils/error.js";
import { testSeed } from "../db/testSeed.js";

describe("Date - timeDifference", () => {
  const date1 = new Date(1739577600000);
  const date2 = new Date(1738324800000);

  test("returns a number", () => {
    const result1 = timeDifference(date1, date2);
    const result2 = timeDifference(date1, date2, "minutes");

    expect(typeof result1 === "number").toBe(true);
    expect(typeof result2 === "number").toBe(true);
  });

  test("milliseconds difference", () => {
    const result = timeDifference(date1, date2);
    expect(result).toBe(1252800000);
  });

  test("seconds difference", () => {
    const result = timeDifference(date1, date2, "seconds");
    expect(result).toBe(1252800);
  });

  test("minutes difference", () => {
    const result = timeDifference(date1, date2, "minutes");
    expect(result).toBe(20880);
  });

  test("hours difference", () => {
    const result = timeDifference(date1, date2, "hours");
    expect(result).toBe(348);
  });

  test("days difference", () => {
    const result = timeDifference(date1, date2, "days");
    expect(result).toBe(14.5);
  });
});

describe("Header - getBearer", () => {
  const headers: IncomingHttpHeaders = {
    authorization: "Bearer 0abac36d-c451-45cb-be5b-97ce6cac8dc9",
  };
  const noHeaders: IncomingHttpHeaders = {};

  test("returns string", () => {
    const result1 = getBearer(headers);
    const result2 = getBearer(noHeaders);

    expect(typeof result1 === "string").toBe(true);
    expect(typeof result2 === "string").toBe(true);
  });

  test("returns token", () => {
    const result = getBearer(headers);
    expect(result).toBe("0abac36d-c451-45cb-be5b-97ce6cac8dc9");
  });

  test("returns empty string if no authorization header", () => {
    const result = getBearer(noHeaders);
    expect(result).toBe("");
  });
});

describe("Error - handleError", () => {
  const requestValidation = object({
    username: string().required(),
    email: string().email().required(),
    password: string().required(),
  });

  test("return error response", () => {
    expect.assertions(3);

    return requestValidation
      .validate({}, { abortEarly: false })
      .catch((error) => {
        const errorResponse = handleError(error);

        expect(typeof errorResponse === "object").toBe(true);
        expect(Array.isArray(errorResponse.errors)).toBe(true);
        expect(errorResponse.success).toBe(false);
      });
  });

  test("returns validation messages", () => {
    expect.assertions(2);

    return requestValidation
      .validate({}, { abortEarly: false })
      .catch((error) => {
        const errorResponse = handleError(error);

        expect(errorResponse.success).toBe(false);
        expect(errorResponse.errors).toEqual([
          "username is a required field",
          "email is a required field",
          "password is a required field",
        ]);
      });
  });

  test("returns sql error messages", async () => {
    await testSeed();

    query(
      "INSERT INTO `users` (`username`, `email`, `hashedPassword`) VALUES (?, ?, ?);",
      ["jerry92", "jerry1992@gmail.com", "password123"]
    ).catch((error) => {
      const errorResponse = handleError(error);
      expect(errorResponse.success).toBe(false);
      expect(errorResponse.errors).toEqual(["This entry already exists"]);
    });
  });
});
