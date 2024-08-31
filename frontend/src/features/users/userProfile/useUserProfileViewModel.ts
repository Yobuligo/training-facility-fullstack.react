import { useCallback, useEffect, useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { DateTime } from "../../../core/services/date/DateTime";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useProfileDetailsSettings } from "../../../hooks/useProfileDetailsSettings";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { DummyUserProfile } from "../../../model/DummyUserProfile";
import { IUserGrading } from "../../../shared/model/IUserGrading";
import { Gender } from "../../../shared/types/Gender";
import { Grade } from "../../../shared/types/Grade";
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
  const [birthday, setBirthday] = useState(
    props.userProfile.birthday
      ? DateTime.toDate(props.userProfile.birthday)
      : ""
  );
  const [email, setEmail] = useState(props.userProfile.email);
  const [firstname, setFirstname] = useState(props.userProfile.firstname);
  const [lastname, setLastname] = useState(props.userProfile.lastname);
  const [gender, setGender] = useState(props.userProfile.gender);
  const [tariff, setTariff] = useState(props.userProfile.tariff);
  // const [isAdmin, setIsAdmin] = useState(props.userProfile.isAdmin);
  const [phone, setPhone] = useState(props.userProfile.phone);
  const [street, setStreet] = useState(props.userProfile.street);
  const [postalCode, setPostalCode] = useState(props.userProfile.postalCode);
  const [city, setCity] = useState(props.userProfile.city);
  const [bankAccountOwner, setBankAccountOwner] = useState(
    props.userProfile.userBankAccount?.bankAccountOwner ?? ""
  );
  const [bankAccountIBAN, setBankAccountIBAN] = useState(
    props.userProfile.userBankAccount?.bankAccountIBAN ?? ""
  );
  const [bankAccountBIC, setBankAccountBIC] = useState(
    props.userProfile.userBankAccount?.bankAccountBIC ?? ""
  );
  const [bankAccountInstitution, setBankAccountInstitution] = useState(
    props.userProfile.userBankAccount?.bankAccountInstitution ?? ""
  );
  const [isDeactivated, setIsDeactivated] = useState(
    props.userProfile.isDeactivated
  );
  const [deactivatedAt, setDeactivatedAt] = useState(
    props.userProfile.deactivatedAt
  );
  const [collapseBank, setCollapseBank] = useState(false);
  const [gradings, setGradings] = useState<IUserGrading[]>(
    props.userProfile.userGradings
  );

  const reset = useCallback(() => {
    setBirthday(
      props.userProfile.birthday
        ? DateTime.toDate(props.userProfile.birthday)
        : ""
    );
    setEmail(props.userProfile.email);
    setFirstname(props.userProfile.firstname);
    setLastname(props.userProfile.lastname);
    setGender(props.userProfile.gender);
    // setIsAdmin(props.userProfile.isAdmin);
    setPhone(props.userProfile.phone);
    setStreet(props.userProfile.street);
    setPostalCode(props.userProfile.postalCode);
    setCity(props.userProfile.city);
    setIsDeactivated(props.userProfile.isDeactivated);
    setDeactivatedAt(props.userProfile.deactivatedAt);
    setTariff(props.userProfile.tariff);
    setBankAccountBIC(props.userProfile.userBankAccount?.bankAccountBIC ?? "");
    setBankAccountIBAN(
      props.userProfile.userBankAccount?.bankAccountIBAN ?? ""
    );
    setBankAccountInstitution(
      props.userProfile.userBankAccount?.bankAccountInstitution ?? ""
    );
    setBankAccountOwner(
      props.userProfile.userBankAccount?.bankAccountOwner ?? ""
    );
    setGradings(props.userProfile.userGradings);
    setDisplayMode(true);
  }, [
    props.userProfile.birthday,
    props.userProfile.email,
    props.userProfile.firstname,
    props.userProfile.lastname,
    props.userProfile.gender,
    props.userProfile.phone,
    props.userProfile.street,
    props.userProfile.postalCode,
    props.userProfile.city,
    props.userProfile.isDeactivated,
    props.userProfile.deactivatedAt,
    props.userProfile.tariff,
    props.userProfile.userBankAccount?.bankAccountBIC,
    props.userProfile.userBankAccount?.bankAccountIBAN,
    props.userProfile.userBankAccount?.bankAccountInstitution,
    props.userProfile.userBankAccount?.bankAccountOwner,
    props.userProfile.userGradings,
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

  // const selectedIsAdminOption =
  //   isAdmin === true ? isAdminOptions[0] : isAdminOptions[1];

  // const onIsAdminChange = (option: ISelectOption<boolean>) =>
  //   setIsAdmin(option.key);

  const onChangeBirthday = (newValue: string) => setBirthday(newValue);

  const onChangePostalCode = (newValue: string) => {
    setPostalCode(parseInt(newValue).toString());
  };

  const onAddGrading = (achievedAt: Date, grade: Grade, examiners: string) => {
    setGradings((previous) => {
      const grading: IUserGrading = {
        id: uuid(),
        userProfileId: props.userProfile.id,
        achievedAt: achievedAt.toISOString() as unknown as Date,
        examiners,
        grade,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return [...previous, grading];
    });
  };

  const onDeleteGrading = (grading: IUserGrading) =>
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

  const needsCreateUserBankAccount = (): boolean =>
    isNotInitial(bankAccountBIC) ||
    isNotInitial(bankAccountIBAN) ||
    isNotInitial(bankAccountInstitution) ||
    isNotInitial(bankAccountOwner);

  const updateUserBankAccount = () => {
    // if userBankAccount was not created yet, check if it is required, create userBankAccount
    if (!props.userProfile.userBankAccount && needsCreateUserBankAccount()) {
      props.userProfile.userBankAccount = {
        id: uuid(),
        bankAccountBIC,
        bankAccountIBAN,
        bankAccountInstitution,
        bankAccountOwner,
        userProfileId: props.userProfile.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return;
    }

    // if it is not required and still not available return
    if (!props.userProfile.userBankAccount) {
      return;
    }

    // update user bank account
    props.userProfile.userBankAccount.bankAccountBIC = bankAccountBIC;
    props.userProfile.userBankAccount.bankAccountIBAN = bankAccountIBAN;
    props.userProfile.userBankAccount.bankAccountInstitution =
      bankAccountInstitution;
    props.userProfile.userBankAccount.bankAccountOwner = bankAccountOwner;
  };

  const onSave = () => {
    props.userProfile.birthday = DateTime.create(birthday, "12:00");
    props.userProfile.email = email;
    props.userProfile.firstname = firstname;
    props.userProfile.lastname = lastname;
    props.userProfile.gender = gender;
    props.userProfile.phone = phone;
    props.userProfile.street = street;
    props.userProfile.postalCode = postalCode;
    props.userProfile.city = city;
    props.userProfile.tariff = tariff;
    props.userProfile.isDeactivated = isDeactivated;
    props.userProfile.deactivatedAt = deactivatedAt;

    updateUserBankAccount();
    props.userProfile.userGradings = gradings;
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
    lastname,
    onAddGrading,
    onCancel,
    onChangeBirthday,
    onChangePostalCode,
    onDeleteGrading,
    // onIsAdminChange,
    onGenderChange,
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
    // selectedIsAdminOption,
    selectedGenderOption,
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
