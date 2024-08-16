import { useState } from "react";

export const useTrainingPlanSectionViewModel = () => {
  const [index, setIndex] = useState(0);

  const onAppend = () => {};

  return { onAppend };
};
