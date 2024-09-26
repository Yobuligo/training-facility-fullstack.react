import { RestRequestError } from "../../core/api/errors/RestRequestError";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";

export class UserTrialTrainingExistsError extends RestRequestError {
  constructor() {
    super("UserTrialTrainingExistsError", HttpStatusCode.CONFLICT_409);
  }
}
