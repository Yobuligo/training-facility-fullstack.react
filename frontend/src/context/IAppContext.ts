import { Value } from "../core/types/Value";
import { Language } from "../lib/language/types/Language";
import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { IUserInternal } from "../model/IUserInternal";

export interface IAppContext {
  language: Value<Language>;
  profileDetailsSettings: Value<IProfileDetailsSettings>;
  user: Value<IUserInternal | undefined>;
}
