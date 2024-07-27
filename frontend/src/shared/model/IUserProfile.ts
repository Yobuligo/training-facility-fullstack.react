import { Gender } from "../types/Gender";
import { IEntity } from "../types/IEntity";
import { IHavePath } from "../types/IHavePath";

export interface IUserProfile extends IEntity {
  userId: string;
  firstname: string;
  lastname: string;
  gender: Gender;
  birthday: Date;
  street: string;
  postalCode: number;
  city: string;
  email: string;
  phone: string;
  joinedOn: Date;
}

export const UserProfileMeta: IHavePath = { path: "/user-profiles" };
