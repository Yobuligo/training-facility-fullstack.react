import { expect } from "chai";
import Sinon, { SinonStubbedInstance } from "sinon";
import { UserRepo } from "../../src/repositories/UserRepo";
import { createRootUser } from "../../src/utils/createRootUser";

class SP {
  static fetch<T>(type: new () => T): T {
    throw new Error();
  }

  static put<T>(type: new () => T, service: T) {}
}

class MyService {
  sayHello() {}
}

describe("createRootUser", () => {
  let userRepoStub: SinonStubbedInstance<UserRepo>;

  beforeEach(() => {
    let myServiceStub = Sinon.createStubInstance(MyService)
    SP.put(MyService, myServiceStub)

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
