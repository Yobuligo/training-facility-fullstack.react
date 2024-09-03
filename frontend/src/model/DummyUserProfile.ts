import { IUserBankAccount } from "../shared/model/IUserBankAccount";
import { IUserGrading } from "../shared/model/IUserGrading";
import { IUserProfile } from "../shared/model/IUserProfile";
import { IUserRole } from "../shared/model/IUserRole";
import { Gender } from "../shared/types/Gender";
import { Tariff } from "../shared/types/Tariff";
import { uuid } from "../utils/uuid";
import { Dummy } from "./Dummy";

export class DummyUserProfile extends Dummy implements IUserProfile {
  userBankAccount?: IUserBankAccount | undefined;
  id = uuid();
  memberId = 0;
  userId = uuid();
  firstname = "";
  lastname = "";
  gender = Gender.FEMALE;
  birthday = undefined;
  street = "";
  postalCode = "";
  city = "";
  email = "";
  phone = "";
  tariff: Tariff = Tariff.TEENAGERS_ADULTS;
  joinedOn = new Date();
  createdAt = new Date();
  updatedAt = new Date();
  userGradings: IUserGrading[] = [];
  userRoles: IUserRole[] = [];
}
