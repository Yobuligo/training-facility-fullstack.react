import { useCallback, useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { DummyUserProfile } from "../../../model/DummyUserProfile";
import { Gender } from "../../../shared/types/Gender";
import { Language } from "../../../shared/types/Language";
import { IUserProfileProps } from "./IUserProfileProps";

export const useUserProfileViewModel = (props: IUserProfileProps) => {
  const { t } = useTranslation();
  const [displayMode, setDisplayMode] = useState(
    props.userProfile instanceof DummyUserProfile &&
      props.userProfile.isPersisted === false
      ? false
      : true
  );
  const [birthday, setBirthday] = useState(props.userProfile.birthday);
  const [email, setEmail] = useState(props.userProfile.email);
  const [firstname, setFirstname] = useState(props.userProfile.firstname);
  const [lastname, setLastname] = useState(props.userProfile.lastname);
  const [gender, setGender] = useState(props.userProfile.gender);
  const [language, setLanguage] = useState(props.userProfile.language);
  const [isAdmin, setIsAdmin] = useState(props.userProfile.isAdmin);
  const [phone, setPhone] = useState(props.userProfile.phone);
  const [street, setStreet] = useState(props.userProfile.street);
  const [postalCode, setPostalCode] = useState(props.userProfile.postalCode);
  const [city, setCity] = useState(props.userProfile.city);
  const [bankAccountOwner, setBankAccountOwner] = useState(
    props.userProfile.bankAccountOwner
  );
  const [bankAccountIBAN, setBankAccountIBAN] = useState(
    props.userProfile.bankAccountIBAN
  );
  const [bankAccountBIC, setBankAccountBIC] = useState(
    props.userProfile.bankAccountBIC
  );
  const [bankAccountInstitution, setBankAccountInstitution] = useState(
    props.userProfile.bankAccountInstitution
  );
  const [isDeactivated, setIsDeactivated] = useState(
    props.userProfile.isDeactivated
  );
  const [deactivatedAt, setDeactivatedAt] = useState(
    props.userProfile.deactivatedAt
  );

  const reset = useCallback(() => {
    setBirthday(props.userProfile.birthday);
    setEmail(props.userProfile.email);
    setFirstname(props.userProfile.firstname);
    setLastname(props.userProfile.lastname);
    setGender(props.userProfile.gender);
    setLanguage(props.userProfile.language);
    setIsAdmin(props.userProfile.isAdmin);
    setPhone(props.userProfile.phone);
    setStreet(props.userProfile.street);
    setPostalCode(props.userProfile.postalCode);
    setCity(props.userProfile.city);
    setIsDeactivated(props.userProfile.isDeactivated);
    setDeactivatedAt(props.userProfile.deactivatedAt);
    setDisplayMode(true);
  }, [
    props.userProfile.birthday,
    props.userProfile.city,
    props.userProfile.email,
    props.userProfile.firstname,
    props.userProfile.gender,
    props.userProfile.isAdmin,
    props.userProfile.language,
    props.userProfile.lastname,
    props.userProfile.phone,
    props.userProfile.postalCode,
    props.userProfile.street,
    props.userProfile.isDeactivated,
    props.userProfile.deactivatedAt,
  ]);

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

  const onToggleMode = () => {
    setDisplayMode((previous) => !previous);
  };

  const onChangeBirthday = (newValue: string) =>
    setBirthday(new Date(newValue));

  const onChangePostalCode = (newValue: string) => {
    setPostalCode(parseInt(newValue).toString());
  };

  const onCancel = () => {
    reset();
    props.onCancel?.(props.userProfile);
  };

  const onToggleIsDeactivated = () =>
    setIsDeactivated((previous) => {
      previous = !previous;
      if (previous === true) {
        setDeactivatedAt(new Date());
      } else {
        setDeactivatedAt(undefined);
      }
      return previous;
    });

  const onSave = () => {
    props.userProfile.birthday = birthday;
    props.userProfile.email = email;
    props.userProfile.firstname = firstname;
    props.userProfile.lastname = lastname;
    props.userProfile.gender = gender;
    props.userProfile.language = language;
    props.userProfile.isAdmin = isAdmin;
    props.userProfile.phone = phone;
    props.userProfile.street = street;
    props.userProfile.postalCode = postalCode;
    props.userProfile.city = city;
    props.userProfile.isDeactivated = isDeactivated;
    props.userProfile.deactivatedAt = deactivatedAt;
    setDisplayMode(true);
    props.onChange?.(props.userProfile);
  };

  return {
    bankAccountBIC,
    bankAccountIBAN,
    bankAccountInstitution,
    bankAccountOwner,
    birthday,
    city,
    displayMode,
    email,
    firstname,
    genderOptions,
    isAdminOptions,
    isDeactivated,
    languageOptions,
    lastname,
    onCancel,
    onChangeBirthday,
    onChangePostalCode,
    onIsAdminChange,
    onGenderChange,
    onLanguageChange,
    onSave,
    onToggleIsDeactivated,
    onToggleMode,
    phone,
    postalCode,
    selectedIsAdminOption,
    selectedGenderOption,
    selectedLanguageOption,
    setBankAccountBIC,
    setBankAccountIBAN,
    setBankAccountInstitution,
    setBankAccountOwner,
    setCity,
    setEmail,
    setFirstname,
    setLastname,
    setGender,
    setPhone,
    setStreet,
    street,
  };
};
