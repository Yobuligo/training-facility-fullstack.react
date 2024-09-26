import { IRouteMeta } from "../../core/api/types/IRouteMeta";

export interface ISecuredRequest<T> {
  sharedKey: string;
  data: T;
}

export const SecuredRequestRouteMeta: IRouteMeta = { path: "/secured" };
