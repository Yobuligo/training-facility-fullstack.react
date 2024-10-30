import { useState } from "react";
import { ITrainer } from "../../shared/types/ITrainer";

export const useTrainerIds = (trainers?: ITrainer[]) => {
  const [selectedTrainerIds, setSelectedTrainerIds] = useState<string[]>(
    () => trainers?.sort() ?.map((trainer) => trainer.id) ?? []
  );

  return [selectedTrainerIds, setSelectedTrainerIds];
};
