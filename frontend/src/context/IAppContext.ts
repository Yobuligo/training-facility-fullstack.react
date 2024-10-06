import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { Value } from "../core/types/Value";
import { Language } from "../lib/language/types/Language";
import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { IUserInternal } from "../model/IUserInternal";

export interface IAppContext {
  dateTimeSpanFilter: Value<IDateTimeSpan>;
  language: Value<Language>;
  profileDetailsSettings: Value<IProfileDetailsSettings>;
  user: Value<IUserInternal | undefined>;
}
