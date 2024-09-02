import { IUser } from "../shared/model/IUser";
import { IUserProfile } from "../shared/model/IUserProfile";
import { IUserRole } from "../shared/model/IUserRole";
import { uuid } from "../utils/uuid";
import { Dummy } from "./Dummy";
import { DummyUserProfile } from "./DummyUserProfile";

export class DummyUser extends Dummy implements IUser {
  username: string = "";
  userRoles: IUserRole[] = [];
  userProfile?: IUserProfile = new DummyUserProfile();
  id: string = uuid();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
