import { Request } from "express";
import { ISession } from "../../../shared/model/ISession";

export interface ISessionRequest extends Request {
  session: ISession;
}
