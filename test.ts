import { describe, expect, test } from "@jest/globals";
import harexsLimit from "./src/index";

const limit = harexsLimit(3);

const userPromise = (d: number) => Promise.resolve(d);

const limit1 = limit(userPromise, 100);

describe("limit module", () => {
  test("limit test", async () => {
    await expect(limit1).resolves.toBe(100);
  });
});
