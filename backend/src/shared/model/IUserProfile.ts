import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { Gender } from "../types/Gender";
import { IGrading } from "./IGrading";
import { Language } from "../types/Language";
import { Tariff } from "../types/Tariff";

export interface IUserProfile extends IEntity, IHaveUserId {
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
  gradings: IGrading[];
}

export const UserProfileMeta: IRouteMeta = { path: "/user-profiles" };
