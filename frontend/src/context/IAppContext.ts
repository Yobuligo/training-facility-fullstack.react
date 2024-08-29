import { Value } from "../core/types/Value";
import { ISession } from "../lib/userSession/shared/model/ISession";
import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { IUserProfile } from "../shared/model/IUserProfile";

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

  userProfile: Value<IUserProfile | undefined>;
}
