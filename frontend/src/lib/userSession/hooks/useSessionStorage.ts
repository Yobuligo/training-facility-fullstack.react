import { useEffect } from "react";
import { SessionRepo } from "../../../api/core/SessionRepo";
import { Value } from "../../../core/types/Value";
import { useInitialize } from "../../../hooks/useInitialize";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ISession } from "../shared/model/ISession";

export const useSessionStorage = (): Value<ISession | undefined> => {
  const session = useLocalStorage<ISession | undefined>(
    "training-facility.session",
    undefined
  );

  useInitialize(() => {
    SessionRepo.instance.setSession(session[0]);
  });

  useEffect(() => {
    SessionRepo.instance.setSession(session[0]);
  }, [session]);

  return session;
};
