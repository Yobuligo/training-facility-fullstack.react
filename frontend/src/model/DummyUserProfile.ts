import { IGrading } from "../shared/model/IGrading";
import { IUserProfile } from "../shared/model/IUserProfile";
import { Gender } from "../shared/types/Gender";
import { Language } from "../shared/types/Language";
import { Tariff } from "../shared/types/Tariff";
import { uuid } from "../utils/uuid";
import { Dummy } from "./Dummy";

export class DummyUserProfile extends Dummy implements IUserProfile {
  id = uuid();
  memberId = "";
  userId = uuid();
  firstname = "";
  lastname = "";
  gender = Gender.FEMALE;
  birthday = new Date();
  street = "";
  postalCode = "";
  city = "";
  email = "";
  phone = "";
  tariff: Tariff = Tariff.TEENAGERS_ADULTS;
  joinedOn = new Date();
  isAdmin = false;
  createdAt = new Date();
  updatedAt = new Date();
  language = Language.en;
  bankAccountOwner = "";
  bankAccountIBAN = "";
  bankAccountBIC = "";
  bankAccountInstitution = "";
  isDeactivated = false;
  gradings: IGrading[] = [];
}
