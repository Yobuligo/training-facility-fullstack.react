import { expect } from "chai";
import Sinon, { SinonStubbedInstance } from "sinon";
import { UserRepo } from "../../src/repositories/UserRepo";
import { createRootUser } from "../../src/utils/createRootUser";

describe("createRootUser", () => {
  let userRepoStub: SinonStubbedInstance<UserRepo>;

  beforeEach(() => {
    userRepoStub = Sinon.createStubInstance(UserRepo);
  });

  afterEach(() => {
    Sinon.restore();
  });

  it("Skips creating if root user already exists", async () => {
    userRepoStub.findByUsername.resolves({
      id: "1",
      username: "root",
      createdAt: new Date(),
      isLocked: false,
      updatedAt: new Date(),
    });

    await createRootUser();
    expect(userRepoStub.createUser.called).false;
  });
});
