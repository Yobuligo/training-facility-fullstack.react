import { IRouteMeta } from "./IRouteMeta";

export interface IHaveToken {
  token: string;
}

export const HaveTokenMeta: IRouteMeta = { path: "token" };
