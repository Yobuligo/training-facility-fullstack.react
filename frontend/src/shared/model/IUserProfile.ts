import { Gender } from "../types/Gender";
import { IEntity } from "../../core/api/types/IEntity";
import { IHaveIsAdmin } from "../types/IHaveIsAdmin";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { Language } from "../types/Language";
import { Tariff } from "../types/Tariff";
import { IGrading } from "./IGrading";

export interface IUserProfile extends IEntity, IHaveIsAdmin, IHaveUserId {
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
