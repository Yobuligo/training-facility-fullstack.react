import { useCallback, useEffect, useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { useProfileDetailsSettings } from "../../../hooks/useProfileDetailsSettings";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { DummyUserProfile } from "../../../model/DummyUserProfile";
import { IGrading } from "../../../shared/model/IGrading";
import { Gender } from "../../../shared/types/Gender";
import { Grade } from "../../../shared/types/Grade";
import { Language } from "../../../shared/types/Language";
import { Tariff } from "../../../shared/types/Tariff";
import { uuid } from "../../../utils/uuid";
import { IUserProfileProps } from "./IUserProfileProps";

export const useUserProfileViewModel = (props: IUserProfileProps) => {
  const { t } = useTranslation();
  const [profileDetailsSettings, setProfileDetailsSettings] =
    useProfileDetailsSettings();
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
  const [tariff, setTariff] = useState(props.userProfile.tariff);
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
  const [collapseBank, setCollapseBank] = useState(false);
  const [gradings, setGradings] = useState<IGrading[]>(
    props.userProfile.gradings
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
    setTariff(props.userProfile.tariff);
    setBankAccountBIC(props.userProfile.bankAccountBIC);
    setBankAccountIBAN(props.userProfile.bankAccountIBAN);
    setBankAccountInstitution(props.userProfile.bankAccountInstitution);
    setBankAccountOwner(props.userProfile.bankAccountOwner);
    setGradings(props.userProfile.gradings);
    setDisplayMode(true);
  }, [
    props.userProfile.birthday,
    props.userProfile.email,
    props.userProfile.firstname,
    props.userProfile.lastname,
    props.userProfile.gender,
    props.userProfile.language,
    props.userProfile.isAdmin,
    props.userProfile.phone,
    props.userProfile.street,
    props.userProfile.postalCode,
    props.userProfile.city,
    props.userProfile.isDeactivated,
    props.userProfile.deactivatedAt,
    props.userProfile.tariff,
    props.userProfile.bankAccountBIC,
    props.userProfile.bankAccountIBAN,
    props.userProfile.bankAccountInstitution,
    props.userProfile.bankAccountOwner,
    props.userProfile.gradings,
  ]);

  const onCancel = useCallback(() => {
    reset();
    props.onCancel?.(props.userProfile);
  }, [props, reset]);

  useEffect(() => {
    if (props.cancelSignal) {
      onCancel();
    }
  }, [onCancel, props.cancelSignal]);

  const genderOptions: ISelectOption<Gender>[] = useMemo(
    () => [
      { key: Gender.FEMALE, text: t(texts.general.female) },
      { key: Gender.MALE, text: t(texts.general.male) },
    ],
    [t]
  );

  const selectedGenderOption =
    gender === Gender.FEMALE ? genderOptions[0] : genderOptions[1];

  const onGenderChange = (option: ISelectOption<Gender>) =>
    setGender(option.key);

  const languageOptions: ISelectOption<Language>[] = useMemo(
    () => [
      { key: Language.en, text: t(texts.language.en) },
      { key: Language.de, text: t(texts.language.de) },
    ],
    [t]
  );

  const selectedLanguageOption =
    language === Language.en ? languageOptions[0] : languageOptions[1];

  const onLanguageChange = (option: ISelectOption<Language>) =>
    setLanguage(option.key);

  const tariffOptions: ISelectOption<Tariff>[] = useMemo(
    () => [
      { key: Tariff.TEENAGERS_ADULTS, text: t(texts.tariff.teenagersAdults) },
      { key: Tariff.CHILDREN, text: t(texts.tariff.children) },
      {
        key: Tariff.TRAINEES_STUDENTS_PENSIONERS,
        text: t(texts.tariff.traineeStudentsPensioner),
      },
      { key: Tariff.FAMILY_1, text: t(texts.tariff.family1) },
      { key: Tariff.FAMILY_2, text: t(texts.tariff.family2) },
      { key: Tariff.FAMILY_3, text: t(texts.tariff.family3) },
      { key: Tariff.PRINCIPALS, text: t(texts.tariff.principals) },
      { key: Tariff.RELATIVES, text: t(texts.tariff.relatives) },
    ],
    [t]
  );

  const selectedTariffOption = tariffOptions.find(
    (tariffOption) => tariffOption.key === tariff
  );

  const onTariffChange = (option: ISelectOption<Tariff>) =>
    setTariff(option.key);

  const isAdminOptions: ISelectOption<boolean>[] = useMemo(
    () => [
      { key: true, text: t(texts.general.yes) },
      { key: false, text: t(texts.general.no) },
    ],
    [t]
  );

  const selectedIsAdminOption =
    isAdmin === true ? isAdminOptions[0] : isAdminOptions[1];

  const onIsAdminChange = (option: ISelectOption<boolean>) =>
    setIsAdmin(option.key);

  const onChangeBirthday = (newValue: string) =>
    setBirthday(new Date(newValue));

  const onChangePostalCode = (newValue: string) => {
    setPostalCode(parseInt(newValue).toString());
  };

  const onAddGrading = (achievedAt: Date, grade: Grade, examiners: string) => {
    setGradings((previous) => {
      const grading: IGrading = {
        id: uuid(),
        userId: props.userProfile.userId,
        achievedAt: achievedAt.toISOString() as unknown as Date,
        examiners,
        grade,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return [...previous, grading];
    });
  };

  const onDeleteGrading = (grading: IGrading) =>
    setGradings((previous) => {
      return previous.filter((item) => item.id !== grading.id);
    });

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
    props.userProfile.tariff = tariff;
    props.userProfile.bankAccountBIC = bankAccountBIC;
    props.userProfile.bankAccountIBAN = bankAccountIBAN;
    props.userProfile.bankAccountInstitution = bankAccountInstitution;
    props.userProfile.bankAccountOwner = bankAccountOwner;
    props.userProfile.isDeactivated = isDeactivated;
    props.userProfile.deactivatedAt = deactivatedAt;
    props.userProfile.gradings = gradings;
    props.onChange?.(props.userProfile);
  };

  const onToggleCollapseAddress = (collapsed: boolean) =>
    setProfileDetailsSettings((previous) => {
      previous.collapseAddress = collapsed;
      return { ...previous };
    });

  const onToggleCollapseBank = (collapsed: boolean) =>
    setProfileDetailsSettings((previous) => {
      previous.collapseBank = collapsed;
      return { ...previous };
    });

  const onToggleCollapseGradings = (collapsed: boolean) =>
    setProfileDetailsSettings((previous) => {
      previous.collapseGradings = collapsed;
      return { ...previous };
    });

  const onToggleCollapsePersonalInformation = (collapsed: boolean) =>
    setProfileDetailsSettings((previous) => {
      previous.collapsePersonalInformation = collapsed;
      return { ...previous };
    });

  const onToggleCollapseTechnicalInformation = (collapsed: boolean) =>
    setProfileDetailsSettings((previous) => {
      previous.collapseTechnicalInformation = collapsed;
      return { ...previous };
    });

  return {
    bankAccountBIC,
    bankAccountIBAN,
    bankAccountInstitution,
    bankAccountOwner,
    birthday,
    collapseBank,
    city,
    displayMode,
    email,
    firstname,
    genderOptions,
    gradings,
    isAdminOptions,
    isDeactivated,
    languageOptions,
    lastname,
    onAddGrading,
    onCancel,
    onChangeBirthday,
    onChangePostalCode,
    onDeleteGrading,
    onIsAdminChange,
    onGenderChange,
    onLanguageChange,
    onSave,
    onTariffChange,
    onToggleCollapseAddress,
    onToggleCollapseBank,
    onToggleCollapseGradings,
    onToggleCollapsePersonalInformation,
    onToggleCollapseTechnicalInformation,
    onToggleIsDeactivated,
    phone,
    postalCode,
    profileDetailsSettings,
    selectedIsAdminOption,
    selectedGenderOption,
    selectedLanguageOption,
    selectedTariffOption,
    setBankAccountBIC,
    setBankAccountIBAN,
    setBankAccountInstitution,
    setBankAccountOwner,
    setCity,
    setCollapseBank,
    setDisplayMode,
    setEmail,
    setFirstname,
    setLastname,
    setGender,
    setPhone,
    setStreet,
    street,
    tariffOptions,
  };
};
