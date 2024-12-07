import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { Gender } from "../types/Gender";
import { IHaveName } from "../types/IHaveName";
import { Tariff } from "../types/Tariff";
import { IUserBankAccount } from "./IUserBankAccount";
import { IUserContactOptions } from "./IUserContactOptions";
import { IUserGrading } from "./IUserGrading";
import { IUserGuardian } from "./IUserGuardian";

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
  userContactOptions?: IUserContactOptions;
  userGradings?: IUserGrading[];
  userGuardians?: IUserGuardian[];
}

export const UserProfileMeta: IRouteMeta = { path: "/user-profiles" };
