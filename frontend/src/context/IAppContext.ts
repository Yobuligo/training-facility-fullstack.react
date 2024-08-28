import { Value } from "../core/types/Value";
import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { ISession } from "../lib/userSession/shared/model/ISession";

export interface IAppContext {
  /**
   * This value can be used to display error messages
   */
  errorMessage: Value<string>;

  profileDetailsSettings: Value<IProfileDetailsSettings>;

  /**
   * This value represents a specific user session, which can be loaded e.g. via useSessionStorage
   */
  session: Value<ISession | undefined>;
}
