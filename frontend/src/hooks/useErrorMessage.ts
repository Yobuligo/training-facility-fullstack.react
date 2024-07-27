import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Value } from "../types/Value";

export const useErrorMessage = (): Value<string> => {
  const context = useContext(AppContext);
  return [context.errorMessage[0], context.errorMessage[1]];
};
