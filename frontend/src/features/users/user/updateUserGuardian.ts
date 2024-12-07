import { isNotInitial } from "../../../core/utils/isNotInitial";
import { IUserGuardian } from "../../../shared/model/IUserGuardian";
import { uuid } from "../../../utils/uuid";

/**
 * This function is responsible for updating the given {@link userGuardian}, inserting a new entry or skipping it,
 * if the given properties {@link email}, {@link firstname}, {@link lastname}, {@link phone} are initial.
 * When updating or inserting an entry the user guardian will be added to the given {@link userGuardians} list.
 */
export const updateUserGuardian = (
  userGuardians: IUserGuardian[],
  userProfileId: string,
  email: string,
  firstname: string,
  lastname: string,
  phone: string,
  userGuardian?: IUserGuardian
) => {
  if (
    isNotInitial(email) ||
    isNotInitial(firstname) ||
    isNotInitial(lastname) ||
    isNotInitial(phone)
  ) {
    // check if guardian 1 needs to be updated or inserted
    if (userGuardian) {
      // update properties and add to result list
      userGuardian.email = email;
      userGuardian.firstname = firstname;
      userGuardian.lastname = lastname;
      userGuardian.phone = phone;
      userGuardians.push(userGuardian);
    } else {
      // insert userGuardian and add to result list
      userGuardians.push({
        id: uuid(),
        email: email,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        userProfileId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
};
