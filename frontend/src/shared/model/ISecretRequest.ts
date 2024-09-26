import { IRouteMeta } from "../../core/api/types/IRouteMeta";

export interface ISecretRequest<T> {
  sharedKey: string;
  data: T;
}

export const SecretRequestRouteMeta: IRouteMeta = { path: "/secured" };
