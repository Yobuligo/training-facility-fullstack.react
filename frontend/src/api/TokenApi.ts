import { IToken, TokenRouteMeta } from "../shared/model/IToken";
import { Repository } from "./core/Repository";
import { RESTApi } from "./core/RESTApi";

export class TokenApi extends Repository<IToken> {
  constructor() {
    super(TokenRouteMeta);
  }

  async create(): Promise<string> {
    return await RESTApi.post(`${this.url}`);
  }
}
