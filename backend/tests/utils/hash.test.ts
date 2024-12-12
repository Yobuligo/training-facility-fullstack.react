import { expect } from "chai";
import { hash } from "./../../src/utils/hash";

describe("hash", () => {
  const value = "hello world";

  it("Returns digest", () => {
    expect(hash(value)).equal(
      "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
    );
  });

  it("Returns same digest for same input", () => {
    expect(hash(value)).equal(hash(value));
  });

  it("Returns different digest for different values", () => {
    expect(hash(value)).not.equal("hello  world");
  });
});
