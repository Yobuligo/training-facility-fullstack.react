import { useState } from "react";
import { Value } from "../../core/types/Value";
import { ITrainer } from "../../shared/types/ITrainer";
import { sortByName } from "../users/utils/sortByName";

export const useTrainerIds = (trainers?: ITrainer[]): Value<string[]> => {
  const [selectedTrainerIds, setSelectedTrainerIds] = useState<string[]>(() =>
    trainers ? sortByName(trainers).map((trainer) => trainer.id) : []
  );

  return [selectedTrainerIds, setSelectedTrainerIds];
};
