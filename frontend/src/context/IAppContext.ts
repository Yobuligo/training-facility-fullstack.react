import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { ISession } from "../shared/model/ISession";
import { Value } from "../types/Value";

export interface IAppContext {
  errorMessage: Value<string>;
  profileDetailsSettings: Value<IProfileDetailsSettings>;
  session: Value<ISession | undefined>;
}
