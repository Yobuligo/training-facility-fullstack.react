import { expect } from "chai";
import { ExpiredError } from "../../../src/shared/errors/ExpiredError";

describe("ExpiredError", () => {
  it("Instance of error", () => {
    const error = new ExpiredError("test");
    expect(error).instanceOf(Error);
  });
});
