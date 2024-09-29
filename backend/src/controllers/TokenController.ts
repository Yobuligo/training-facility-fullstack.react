import { AppConfig } from "../AppConfig";
import { DateTime } from "../core/services/date/DateTime";
import { ISignature } from "../model/types/ISignature";
import { uuid } from "../utils/uuid";
import { Controller } from "./core/Controller";
import { ErrorInterceptor } from "./core/ErrorInterceptor";

export class TokenController extends Controller {
  constructor() {
    super();
    this.get();
  }

  private get() {
    this.router.get(
      `/token`,
      ErrorInterceptor(async (req, res) => {
        const signature: ISignature = {
          expiredAt: DateTime.addMinutes(new Date(), 5),
          sharedKey: AppConfig.sharedKey,
          uuid: uuid(),
        };
      })
    );
  }
}
