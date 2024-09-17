import { HttpStatusCode } from "../types/HttpStatusCode";
import { RestRequestError } from "./RestRequestError";

export class BadRequestError extends RestRequestError {
  constructor(type: string, message?: string) {
    super(type, HttpStatusCode.BAD_REQUEST_400, message);
  }
}
