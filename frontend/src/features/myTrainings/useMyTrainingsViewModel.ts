import { useState } from "react";
import { IMyTrainingsProps } from "./IMyTrainingsProps";

export const useMyTrainingsViewModel = (props: IMyTrainingsProps) => {
  const [registered, setRegistered] = useState(false);

  const onToggleRegister = () => setRegistered((previous) => !previous);

  return {
    onToggleRegister,
    registered,
  };
};
