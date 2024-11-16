import { expect } from "chai";
import { hashPassword } from "../../src/utils/hashPassword";

describe("hashPassword", () => {
  const password = "hello world";
  const salt = "123123";
  it("Returns hashed password", () => {
    expect(hashPassword(password, salt)).equal(
      "4b64be74a31dc27d6771d2fdae7fa1703f324b61c6620fcdc0f85fdfdc64383e"
    );
  });

  it("Returns always the same hashed password", () => {
    expect(hashPassword(password, salt)).equal(hashPassword(password, salt));
  });

  it("Considers salt", () => {
    expect(hashPassword(password, "1231234")).not.equal(
      "4b64be74a31dc27d6771d2fdae7fa1703f324b61c6620fcdc0f85fdfdc64383e"
    );
  });
});
