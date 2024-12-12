import { Controller } from "../../../src/controllers/core/Controller";

class DemoController extends Controller {
    publicSendMissingAuthorityError(){

    }
}

describe("Controller", () => {
  describe("sendMissingAuthority", () => {
    it("Sends responsive with Http status code 403", () => {});
    it("Sends missing authority error", () => {});
  });

  describe("checkIsAdminOrYourself", () => {});

  describe("router", () => {
    it("Contains created routes", () => {});
  });
});
