import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { Gender } from "../types/Gender";
import { Language } from "../types/Language";
import { Tariff } from "../types/Tariff";
import { IUserGrading } from "./IUserGrading";
import { IUserRole } from "./IUserRole";

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
  userGradings: IUserGrading[];
  userRoles: IUserRole[];
}

export const UserProfileMeta: IRouteMeta = { path: "/user-profiles" };
