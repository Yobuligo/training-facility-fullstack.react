import { useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Gender } from "../../../shared/types/Gender";
import { Language } from "../../../shared/types/Language";
import { IUserProfileProps } from "./IUserProfileProps";

export const useUserProfileViewModel = (props: IUserProfileProps) => {
  const { t } = useTranslation();
  const [displayMode, setDisplayMode] = useState(true);
  const [gender, setGender] = useState(props.userProfile.gender);
  const [language, setLanguage] = useState(props.userProfile.language);

  const genderOptions: ISelectOption[] = useMemo(
    () => [
      { key: Gender.FEMALE.toString(), text: t(texts.general.female) },
      { key: Gender.MALE.toString(), text: t(texts.general.male) },
    ],
    [t]
  );

  const selectedGenderOption =
    gender === Gender.FEMALE ? genderOptions[0] : genderOptions[1];

  const onGenderChange = (option: ISelectOption) => {
    setGender((Gender as any)[option.key]);
  };

  const languageOptions: ISelectOption[] = useMemo(
    () => [
      { key: Language.en.toString(), text: t(texts.language.en) },
      { key: Language.de.toString(), text: t(texts.language.de) },
    ],
    [t]
  );

  const selectedLanguageOption =
    language === Language.en ? languageOptions[0] : languageOptions[1];

  const onLanguageChange = (option: ISelectOption) => {
    setLanguage((Language as any)[option.key]);
  };

  const onToggleMode = () => setDisplayMode((previous) => !previous);

  return {
    displayMode,
    genderOptions,
    languageOptions,
    onGenderChange,
    onLanguageChange,
    onToggleMode,
    selectedGenderOption,
    selectedLanguageOption,
    setGender,
  };
};
