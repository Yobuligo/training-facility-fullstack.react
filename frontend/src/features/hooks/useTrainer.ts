import { useMemo, useState } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { UserInfo } from "../../services/UserInfo";
import { IUserShort } from "../../shared/model/IUserShort";
import { ITrainer } from "../../shared/types/ITrainer";
import { sortByName } from "../users/utils/sortByName";

/**
 * This custom hook is responsible for providing select options for available trainers and ids for selected trainers.
 * The hook cares about filtering trainers depending on their state, e.g. if resigned.
 */
export const useTrainer = (
  selectableTrainers: IUserShort[],
  selectedTrainers?: ITrainer[]
): [
  ISelectOption<string>[],
  string[],
  React.Dispatch<React.SetStateAction<string[]>>
] => {
  const [selectedTrainerIds, setSelectedTrainerIds] = useState<string[]>(() =>
    selectedTrainers
      ? sortByName(selectedTrainers).map((trainer) => trainer.id)
      : []
  );

  const trainerSelectOptions: ISelectOption<string>[] = useMemo(() => {
    // Restrict selectableTrainers to those who have not yet resigned,
    // beside if a resigned trainer is selected / so assigned. Then display the trainer anyway for traceability.
    const filteredTrainers = selectableTrainers.filter(
      (selectableTrainer) =>
        selectableTrainer.resignedAt === null ||
        (selectedTrainers &&
          selectedTrainers.findIndex(
            (selectedTrainer) => selectedTrainer.id === selectableTrainer.id
          ) !== -1)
    );
    
    return sortByName(filteredTrainers).map((trainer) => ({
      key: trainer.id,
      text: UserInfo.toFullName(trainer),
    }));
  }, [selectableTrainers, selectedTrainers]);

  return [trainerSelectOptions, selectedTrainerIds, setSelectedTrainerIds];
};
