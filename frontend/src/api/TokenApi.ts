import { IToken, TokenRouteMeta } from "../shared/model/IToken";
import { ITokenRequest } from "../shared/model/ITokenRequest";
import { Repository } from "./core/Repository";
import { RESTApi } from "./core/RESTApi";

export class TokenApi extends Repository<IToken> {
  constructor() {
    super(TokenRouteMeta);
  }

  async create(): Promise<ITokenRequest> {
    return await RESTApi.post(`${this.url}`);
  }
}
