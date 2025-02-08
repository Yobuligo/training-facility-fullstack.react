import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { Value } from "../core/types/Value";
import { Language } from "../lib/language/types/Language";
import { IAdminSettings } from "../model/IAdminSettings";
import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { IUserInternal } from "../model/IUserInternal";

export interface IAppContext {
  adminSettings: Value<IAdminSettings>;
  dateTimeSpanFilter: Value<IDateTimeSpan>;
  language: Value<Language>;
  profileDetailsSettings: Value<IProfileDetailsSettings>;
  user: Value<IUserInternal | undefined>;
}
