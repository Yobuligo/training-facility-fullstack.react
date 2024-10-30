import { IHaveName } from "../../../shared/types/IHaveName";

/**
 * This function is responsible for sorting the given {@link objects} by firstname and lastname.
 */
export const sortByName = <T extends IHaveName>(objects: T[]): T[] => {
  return objects.sort((left, right) => {
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
