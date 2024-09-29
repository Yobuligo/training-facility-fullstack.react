import { IRouteMeta } from "../../core/api/types/IRouteMeta";

export interface IToken {
  id: string;
  expiresAt: Date;
  signature: string;
}

export const TokenRouteMeta: IRouteMeta = { path: "/token" };
