import { useCallback, useEffect, useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { DateTime } from "../../../core/services/date/DateTime";
import { checkNotNull } from "../../../core/utils/checkNotNull";
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
import { IUserProps } from "./IUserProps";
import { useLabeledElement } from "../../../hooks/useLabeledElement";

export const useUserViewModel = (props: IUserProps) => {
  const { t } = useTranslation();
  const userProfile = checkNotNull(props.user.userProfile);
  const [profileDetailsSettings, setProfileDetailsSettings] =
    useProfileDetailsSettings();
  const [displayMode, setDisplayMode] = useState(
    props.user instanceof DummyUserProfile && props.user.isPersisted === false
      ? false
      : true
  );
  const [birthday, setBirthday] = useState(
    userProfile.birthday ? DateTime.toDate(userProfile.birthday) : ""
  );
  const [email, setEmail] = useState(userProfile.email);
  const [username, setUsername] = useLabeledElement(props.user.username);
  const [firstname, setFirstname] = useState(userProfile.firstname);
  const [lastname, setLastname] = useState(userProfile.lastname);
  const [gender, setGender] = useState(userProfile.gender);
  const [tariff, setTariff] = useState(userProfile.tariff);
  // const [isAdmin, setIsAdmin] = useState(props.userProfile.isAdmin);
  const [phone, setPhone] = useState(userProfile.phone);
  const [street, setStreet] = useState(userProfile.street);
  const [postalCode, setPostalCode] = useState(userProfile.postalCode);
  const [city, setCity] = useState(userProfile.city);
  const [bankAccountOwner, setBankAccountOwner] = useState(
    userProfile.userBankAccount?.bankAccountOwner ?? ""
  );
  const [bankAccountIBAN, setBankAccountIBAN] = useState(
    userProfile.userBankAccount?.bankAccountIBAN ?? ""
  );
  const [bankAccountBIC, setBankAccountBIC] = useState(
    userProfile.userBankAccount?.bankAccountBIC ?? ""
  );
  const [bankAccountInstitution, setBankAccountInstitution] = useState(
    userProfile.userBankAccount?.bankAccountInstitution ?? ""
  );
  const [isDeactivated, setIsDeactivated] = useState(userProfile.isDeactivated);
  const [deactivatedAt, setDeactivatedAt] = useState(userProfile.deactivatedAt);
  const [collapseBank, setCollapseBank] = useState(false);
  const [gradings, setGradings] = useState<IUserGrading[]>(
    userProfile.userGradings ?? []
  );
  const [joinedOn, setJoinedOn] = useState(
    userProfile.joinedOn ? DateTime.toDate(userProfile.joinedOn) : ""
  );

  const reset = useCallback(() => {
    setBirthday(
      userProfile.birthday ? DateTime.toDate(userProfile.birthday) : ""
    );
    setEmail(userProfile.email);
    setUsername(props.user.username);
    setFirstname(userProfile.firstname);
    setLastname(userProfile.lastname);
    setGender(userProfile.gender);
    // setIsAdmin(props.userProfile.isAdmin);
    setPhone(userProfile.phone);
    setStreet(userProfile.street);
    setPostalCode(userProfile.postalCode);
    setCity(userProfile.city);
    setIsDeactivated(userProfile.isDeactivated);
    setDeactivatedAt(userProfile.deactivatedAt);
    setTariff(userProfile.tariff);
    setBankAccountBIC(userProfile.userBankAccount?.bankAccountBIC ?? "");
    setBankAccountIBAN(userProfile.userBankAccount?.bankAccountIBAN ?? "");
    setBankAccountInstitution(
      userProfile.userBankAccount?.bankAccountInstitution ?? ""
    );
    setBankAccountOwner(userProfile.userBankAccount?.bankAccountOwner ?? "");
    setGradings(userProfile.userGradings ?? []);
    setJoinedOn(
      userProfile.joinedOn ? DateTime.toDate(userProfile.joinedOn) : ""
    );
    setDisplayMode(true);
  }, [
    props.user.username,
    userProfile.birthday,
    userProfile.city,
    userProfile.deactivatedAt,
    userProfile.email,
    userProfile.firstname,
    userProfile.gender,
    userProfile.isDeactivated,
    userProfile.joinedOn,
    userProfile.lastname,
    userProfile.phone,
    userProfile.postalCode,
    userProfile.street,
    userProfile.tariff,
    userProfile.userBankAccount?.bankAccountBIC,
    userProfile.userBankAccount?.bankAccountIBAN,
    userProfile.userBankAccount?.bankAccountInstitution,
    userProfile.userBankAccount?.bankAccountOwner,
    userProfile.userGradings,
  ]);

  const onValidate = ()=>{
  }

  const onCancel = useCallback(() => {
    reset();
    props.onCancel?.(props.user);
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

  const onChangeJoinedOn = (newValue: string) => setJoinedOn(newValue);

  const onChangePostalCode = (newValue: string) => {
    setPostalCode(parseInt(newValue).toString());
  };

  const onAddGrading = (achievedAt: Date, grade: Grade, examiners: string) => {
    setGradings((previous) => {
      const grading: IUserGrading = {
        id: uuid(),
        userProfileId: props.user.id,
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

  const onDeleteUser = () => {
    if (
      window.confirm(
        t(texts.user.deleteUserQuestion, { username: props.user.username })
      )
    ) {
      props.onDelete?.(props.user);
    }
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

  const needsCreateUserBankAccount = (): boolean =>
    isNotInitial(bankAccountBIC) ||
    isNotInitial(bankAccountIBAN) ||
    isNotInitial(bankAccountInstitution) ||
    isNotInitial(bankAccountOwner);

  const updateUserBankAccount = () => {
    // if userBankAccount was not created yet, check if it is required, create userBankAccount
    if (!userProfile.userBankAccount && needsCreateUserBankAccount()) {
      userProfile.userBankAccount = {
        id: uuid(),
        bankAccountBIC,
        bankAccountIBAN,
        bankAccountInstitution,
        bankAccountOwner,
        userProfileId: userProfile.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return;
    }

    // if it is not required and still not available return
    if (!userProfile.userBankAccount) {
      return;
    }

    // update user bank account
    userProfile.userBankAccount.bankAccountBIC = bankAccountBIC;
    userProfile.userBankAccount.bankAccountIBAN = bankAccountIBAN;
    userProfile.userBankAccount.bankAccountInstitution = bankAccountInstitution;
    userProfile.userBankAccount.bankAccountOwner = bankAccountOwner;
  };

  const onSave = () => {
    props.user.username = username;
    userProfile.birthday = DateTime.create(birthday, "12:00");
    userProfile.email = email;
    userProfile.firstname = firstname;
    userProfile.lastname = lastname;
    userProfile.gender = gender;
    userProfile.phone = phone;
    userProfile.street = street;
    userProfile.postalCode = postalCode;
    userProfile.city = city;
    userProfile.tariff = tariff;
    userProfile.isDeactivated = isDeactivated;
    userProfile.deactivatedAt = deactivatedAt;
    userProfile.joinedOn = DateTime.create(joinedOn, "12:00");

    updateUserBankAccount();
    userProfile.userGradings = gradings;
    props.onChange?.(props.user);
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
    joinedOn,
    lastname,
    onAddGrading,
    onCancel,
    onChangeBirthday,
    onChangeJoinedOn,
    onChangePostalCode,
    onDeleteGrading,
    onDeleteUser,
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
    setUsername,
    street,
    tariffOptions,
    username,
  };
};
