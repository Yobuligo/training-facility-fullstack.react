import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Value } from "../core/types/Value";
import { checkNotNull } from "../core/utils/checkNotNull";
import { IUserInternal } from "../model/IUserInternal";

/**
 * This hook provides access to the user instance of the current logged in user.
 * Throws an error if the user is not set.
 */
export const useUser = (): Value<IUserInternal> => {
  const context = useContext(AppContext);
  return [
    checkNotNull(context.user[0]),
    context.user[1] as (
      newValue: IUserInternal | ((previous: IUserInternal) => IUserInternal)
    ) => void,
  ];
};
