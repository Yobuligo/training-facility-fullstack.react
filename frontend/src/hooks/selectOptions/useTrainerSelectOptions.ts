import { useMemo, useState } from "react";
import { sortUsersShort } from "../../features/users/utils/sortUsersShort";
import { UserApi } from "../../lib/userSession/api/UserApi";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { UserInfo } from "../../services/UserInfo";
import { IUserShort } from "../../shared/model/IUserShort";
import { AuthRole } from "../../shared/types/AuthRole";
import { useInitialize } from "../useInitialize";
import { ISelectOption } from "./../../components/select/ISelectOption";

/**
 * This custom hook is responsible for providing {@link ISelectOption}s for the given {@link trainers}.
 */
export const useTrainerSelectOptions = (
  initialTrainers?: IUserShort[]
): [
  trainerSelectOptions: ISelectOption<string>[],
  isLoadTrainersRequestProcessing: boolean
] => {
  const [trainers, setTrainers] = useState<IUserShort[]>(initialTrainers ?? []);
  const [loadTrainersRequest, isLoadTrainersRequestProcessing] = useRequest();

  useInitialize(() => {
    if (!initialTrainers) {
      loadTrainersRequest(async () => {
        const userApi = new UserApi();
        const trainers = await userApi.findAllShortByRole(AuthRole.TRAINER);
        setTrainers(trainers);
      });
    }
  });

  const trainerSelectOptions: ISelectOption<string>[] = useMemo(
    () =>
      sortUsersShort(trainers).map((trainer) => ({
        key: trainer.id,
        text: UserInfo.toFullName(trainer),
      })),
    [trainers]
  );

  return [trainerSelectOptions, isLoadTrainersRequestProcessing];
};
