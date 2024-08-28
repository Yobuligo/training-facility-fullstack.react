import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { ISession } from "../shared/model/ISession";
import { Value } from "../../../core/types/Value";

export const useSession = (): Value<ISession | undefined> => {
  const context = useContext(AppContext);
  return context.session;
};
