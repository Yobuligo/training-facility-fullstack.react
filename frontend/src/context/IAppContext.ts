import { ISession } from "../shared/model/ISession";
import { Value } from "../types/Value";

export interface IAppContext {
  errorMessage: Value<string>;
  session: Value<ISession | undefined>;
}
