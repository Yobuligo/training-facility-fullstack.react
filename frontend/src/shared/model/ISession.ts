import { IEntity } from "../types/IEntity";

export interface ISession extends IEntity {
  expiresAt: Date;
  userId: string;
  username: string;
}
