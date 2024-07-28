import { Gender } from "../types/Gender";
import { IEntity } from "../types/IEntity";
import { IHaveIsAdmin } from "../types/IHaveIsAdmin";
import { IHavePath } from "../types/IHavePath";
import { Language } from "../types/Language";

export interface IUserProfile extends IEntity, IHaveIsAdmin {
  userId: string;
  firstname: string;
  lastname: string;
  gender: Gender;
  birthday: Date;
  street: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  language: Language;
  isDeactivated: boolean;
  deactivatedAt?: Date;
  joinedOn: Date;
}

export const UserProfileMeta: IHavePath = { path: "/user-profiles" };
