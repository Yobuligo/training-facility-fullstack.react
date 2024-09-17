import { RestRequestError } from "../../core/api/errors/RestRequestError";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";

export class LoginNotPossibleError extends RestRequestError {
  constructor(message?: string) {
    super("LoginNotPossibleError", HttpStatusCode.FORBIDDEN_403, message);
  }
}
