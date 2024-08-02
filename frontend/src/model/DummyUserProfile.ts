import { IUserProfile } from "../shared/model/IUserProfile";
import { Gender } from "../shared/types/Gender";
import { Language } from "../shared/types/Language";
import { Tariff } from "../shared/types/Tariff";
import { uuid } from "../utils/uuid";

export class DummyUserProfile implements IUserProfile {
  private _isPersisted = false;

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
  tariff: Tariff = Tariff.TEENAGER_ADULT;
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

  get isPersisted() {
    return this._isPersisted;
  }

  setIsPersisted() {
    this._isPersisted = true;
  }
}
