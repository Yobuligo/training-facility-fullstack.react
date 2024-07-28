import { IUserProfile } from "../shared/model/IUserProfile";
import { Gender } from "../shared/types/Gender";
import { Language } from "../shared/types/Language";
import { uuid } from "../utils/uuid";

export class DummyUserProfile implements IUserProfile {
  private _isPersisted = false;

  id = uuid();
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
  joinedOn = new Date();
  isAdmin = false;
  createdAt = new Date();
  updatedAt = new Date();
  language = Language.en;
  isDeactivated = false;

  get isPersisted() {
    return this._isPersisted;
  }

  setIsPersisted() {
    this._isPersisted = true;
  }
}
