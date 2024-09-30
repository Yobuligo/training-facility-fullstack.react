import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { TokenService } from "../services/TokenService";
import { TokenRouteMeta } from "../shared/model/IToken";
import { Controller } from "./core/Controller";
import { ErrorInterceptor } from "./core/ErrorInterceptor";

export class TokenController extends Controller {
  constructor() {
    super();
    this.get();
  }

  private get() {
    this.router.post(
      `${TokenRouteMeta.path}`,
      ErrorInterceptor(async (_, res) => {
        const tokenService = new TokenService();
        const token = tokenService.createAsString();
        res.status(HttpStatusCode.OK_200).send(token);
      })
    );
  }
}
