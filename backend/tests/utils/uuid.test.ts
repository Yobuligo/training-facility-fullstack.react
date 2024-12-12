import { expect } from "chai";
import { uuid } from "../../src/utils/uuid";

describe("uuid", () => {
  it("Returns uuid", () => {
    expect(uuid()).not.empty;
  });

  it("Returns never same uuid", () => {
    expect(uuid()).not.equal(uuid());
  });
});
