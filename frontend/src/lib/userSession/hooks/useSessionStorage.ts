import { Value } from "../../../core/types/Value";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ISession } from "../shared/model/ISession";

export const useSessionStorage = (): Value<ISession | undefined> => {
  const session = useLocalStorage<ISession | undefined>(
    "training-facility.session",
    undefined
  );

  return session;
};
