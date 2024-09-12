import { Value } from "../core/types/Value";
import { Language } from "../lib/language/types/Language";
import { ISession } from "../lib/userSession/shared/model/ISession";
import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { IUserInternal } from "../model/IUserInternal";

export interface IAppContext {
  language: Value<Language>;
  profileDetailsSettings: Value<IProfileDetailsSettings>;

  /**
   * This value represents a specific user session, which can be loaded e.g. via useSessionStorage
   */
  session: Value<ISession | undefined>;

  user: Value<IUserInternal | undefined>;
}
