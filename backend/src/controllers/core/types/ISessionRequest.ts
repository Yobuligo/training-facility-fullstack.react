import { Request } from "express";
import { ISessionInfo } from "../../../services/ISessionInfo";

export interface ISessionRequest extends Request {
  /**
   * Returns a session info instance, that provides information about the user and its authorities.
   */
  sessionInfo: ISessionInfo;
}
