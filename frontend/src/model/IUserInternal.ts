import { IUser } from "../shared/model/IUser";

export type IUserInternal = Required<
  Pick<IUser, "id" | "userProfile" | "userRoles" | "username">
>;
