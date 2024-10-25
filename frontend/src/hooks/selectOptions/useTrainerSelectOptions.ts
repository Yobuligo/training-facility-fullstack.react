import { useMemo } from "react";
import { sortUsersShort } from "../../features/users/utils/sortUsersShort";
import { UserInfo } from "../../services/UserInfo";
import { IUserShort } from "../../shared/model/IUserShort";
import { ISelectOption } from "./../../components/select/ISelectOption";

/**
 * This custom hook is responsible for providing {@link ISelectOption}s for the given {@link trainers}.
 */
export const useTrainerSelectOptions = (
  trainers: IUserShort[]
): ISelectOption<string>[] => {
  const trainerSelectOptions: ISelectOption<string>[] = useMemo(
    () =>
      sortUsersShort(trainers).map((trainer) => ({
        key: trainer.id,
        text: UserInfo.toFullName(trainer),
      })),
    [trainers]
  );

  return trainerSelectOptions;
};
