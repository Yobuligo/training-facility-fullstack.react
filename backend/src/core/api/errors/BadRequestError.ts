import { IError } from "../../types/IError";

export class BadRequestError extends Error {
  readonly error: IError;
  constructor(type: string, message?: string) {
    super(message);
    this.error = {
      createdAt: new Date(),
      message: message ?? "",
      type,
    };
  }
}
