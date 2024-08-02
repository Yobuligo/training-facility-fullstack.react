import { Gender } from "../types/Gender";
import { IEntity } from "../types/IEntity";
import { IHaveIsAdmin } from "../types/IHaveIsAdmin";
import { IHavePath } from "../types/IHavePath";
import { Language } from "../types/Language";
import { Tariff } from "../types/Tariff";

export interface IUserProfile extends IEntity, IHaveIsAdmin {
  userId: string;
  memberId: string;
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
  tariff: Tariff;
  bankAccountOwner: string;
  bankAccountIBAN: string;
  bankAccountBIC: string;
  bankAccountInstitution: string;
  isDeactivated: boolean;
  deactivatedAt?: Date;
  joinedOn: Date;
}

export const UserProfileMeta: IHavePath = { path: "/user-profiles" };
