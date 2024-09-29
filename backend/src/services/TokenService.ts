import { AppConfig } from "../AppConfig";
import { DateTime } from "../core/services/date/DateTime";
import { ISignature } from "../model/types/ISignature";
import { IToken } from "../shared/model/IToken";
import { hash } from "../utils/hash";
import { uuid } from "../utils/uuid";

export class TokenService {
  create(): IToken {
    const id = uuid();
    const expiresAt = DateTime.addMinutes(new Date(), 5);
    const signature: ISignature = {
      expiresAt,
      sharedKey: AppConfig.sharedKey,
      uuid: id,
    };

    return {
      expiresAt,
      id,
      signature: hash(JSON.stringify(signature)),
    };
  }

  createAsString(): string {
    const token: IToken = this.create();
    return JSON.stringify(token);
  }
}
