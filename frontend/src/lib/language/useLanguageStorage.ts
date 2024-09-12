import { Value } from "../../core/types/Value";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Language } from "./types/Language";

export const useLanguageStorage = (): Value<Language> => {
  const [language, setLanguage] = useLocalStorage(
    "training-facility.language",
    Language.EN
  );
  return [language, setLanguage];
};
