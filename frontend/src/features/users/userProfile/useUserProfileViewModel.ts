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
  const [isAdmin, setIsAdmin] = useState(props.userProfile.isAdmin);

  const genderOptions: ISelectOption[] = useMemo(
    () => [
      { key: Gender.FEMALE.toString(), text: t(texts.general.female) },
      { key: Gender.MALE.toString(), text: t(texts.general.male) },
    ],
    [t]
  );

  const selectedGenderOption =
    gender === Gender.FEMALE ? genderOptions[0] : genderOptions[1];

  const onGenderChange = (option: ISelectOption) =>
    setGender((Gender as any)[option.key]);

  const languageOptions: ISelectOption[] = useMemo(
    () => [
      { key: Language.en.toString(), text: t(texts.language.en) },
      { key: Language.de.toString(), text: t(texts.language.de) },
    ],
    [t]
  );

  const selectedLanguageOption =
    language === Language.en ? languageOptions[0] : languageOptions[1];

  const onLanguageChange = (option: ISelectOption) =>
    setLanguage((Language as any)[option.key]);

  const isAdminOptions: ISelectOption[] = useMemo(
    () => [
      { key: "0", text: t(texts.general.yes) },
      { key: "1", text: t(texts.general.no) },
    ],
    [t]
  );

  const selectedIsAdminOption =
    isAdmin === true ? isAdminOptions[0] : isAdminOptions[1];

  const onIsAdminChange = (option: ISelectOption) =>
    setIsAdmin(option.key === "0" ? true : false);

  const onToggleMode = () => setDisplayMode((previous) => !previous);

  return {
    displayMode,
    genderOptions,
    isAdminOptions,
    languageOptions,
    onIsAdminChange,
    onGenderChange,
    onLanguageChange,
    onToggleMode,
    selectedIsAdminOption,
    selectedGenderOption,
    selectedLanguageOption,
    setGender,
  };
};
