import { useState } from "react";

export const useEventPlanSectionViewModel = () => {
  const [displayDetails, setDisplayDetails] = useState(false);

  const onAdd = () => setDisplayDetails(true);

  const onBack = () => setDisplayDetails(false);

  const onSaveEventDefinition = () => {
    
  };

  return {
    displayDetails,
    onAdd,
    onBack,
    onSaveEventDefinition,
  };
};
