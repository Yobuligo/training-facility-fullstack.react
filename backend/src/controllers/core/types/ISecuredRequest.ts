import { Request } from "express";
import { ISecretRequest } from "../../../shared/model/ISecretRequest";

export interface ISecuredRequest<TData> extends Request {
  secretRequest: ISecretRequest<TData>;
}
