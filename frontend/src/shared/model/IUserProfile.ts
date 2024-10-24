import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { Gender } from "../types/Gender";
import { IHaveName } from "../types/IHaveName";
import { Tariff } from "../types/Tariff";
import { IUserBankAccount } from "./IUserBankAccount";
import { IUserGrading } from "./IUserGrading";

export interface IUserProfile extends IEntity, IHaveUserId, IHaveName {
  memberId: number;
  gender: Gender;
  birthday?: Date;
  street?: string;
  postalCode?: string;
  city?: string;
  email: string;
  phone?: string;
  tariff: Tariff;
  joinedOn: Date;
  lastInvitedAt?: Date;
  resignedAt?: Date;
  userBankAccount?: IUserBankAccount;
  userGradings?: IUserGrading[];
}

export const UserProfileMeta: IRouteMeta = { path: "/user-profiles" };
