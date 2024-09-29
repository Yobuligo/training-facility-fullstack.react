import { AppConfig } from "../AppConfig";
import { DateTime } from "../core/services/date/DateTime";
import { ISignature } from "../model/types/ISignature";
import { ExpiredTokenError } from "../shared/errors/ExpiredTokenError";
import { InvalidTokenError } from "../shared/errors/InvalidTokenError";
import { IToken } from "../shared/model/IToken";
import { hash } from "../utils/hash";
import { uuid } from "../utils/uuid";

export class TokenService {
  create(): IToken {
    const id = uuid();
    const expiresAt = DateTime.addMinutes(new Date(), 5);
    const signature = this.createSignature(id, expiresAt);
    return {
      expiresAt,
      id,
      signature,
    };
  }

  createAsString(): string {
    const token: IToken = this.create();
    return JSON.stringify(token);
  }

  verify(value: string): void {
    const token: IToken = JSON.parse(value);
    const signature = this.createSignature(token.id, token.expiresAt);
    if (token.signature !== signature) {
      throw new InvalidTokenError();
    }

    if (DateTime.isBefore(token.expiresAt)) {
      throw new ExpiredTokenError();
    }
  }

  private createSignature(id: string, expiresAt: Date): string {
    const signature: ISignature = {
      expiresAt,
      id,
      sharedKey: AppConfig.sharedKey,
    };
    return hash(JSON.stringify(signature));
  }
}
