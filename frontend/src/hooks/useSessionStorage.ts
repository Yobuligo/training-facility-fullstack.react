import { useEffect } from "react";
import { SessionRepo } from "../api/core/SessionRepo";
import { ISession } from "../shared/model/ISession";
import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useSessionStorage = (): Value<ISession | undefined> => {
  const session = useLocalStorage<ISession | undefined>(
    "training-facility.session",
    undefined
  );

  useEffect(() => {
    if (session[0]) {
      SessionRepo.instance.setSession(session[0]);
    }
  }, [session]);

  return session;
};
