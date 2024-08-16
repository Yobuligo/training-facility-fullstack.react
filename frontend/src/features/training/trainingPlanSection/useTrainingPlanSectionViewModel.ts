import { useState } from "react";

export const useTrainingPlanSectionViewModel = () => {
  const [displayDetails, setDisplayDetails] = useState(false);

  const onAdd = () => setDisplayDetails(true);

  const onBack = () => setDisplayDetails(false);

  return { displayDetails, onAdd, onBack };
};
