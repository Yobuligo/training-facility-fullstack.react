import { IUserShort } from "../../../shared/model/IUserShort";

/**
 * This function is responsible for sorting the given {@link usersShort} by firstname and lastname.
 */
export const sortUsersShort = (usersShort: IUserShort[]): IUserShort[] => {
  return usersShort.sort((left, right) => {
    if (left.firstname < right.firstname) {
      return -1;
    }

    if (left.firstname > right.firstname) {
      return 1;
    }

    if (left.lastname < right.lastname) {
      return -1;
    }

    if (left.lastname > right.lastname) {
      return 1;
    }
    return 0;
  });
};
