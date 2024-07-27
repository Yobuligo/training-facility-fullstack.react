import { IHavePath } from "./IHavePath";

export interface IHaveToken {
  token: string;
}

export const HaveTokenMeta: IHavePath = { path: "token" };
