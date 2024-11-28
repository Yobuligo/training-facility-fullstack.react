import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { ValidationError } from "../../../core/errors/ValidationError";
import { DateTime } from "../../../core/services/date/DateTime";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { isEmailInvalid } from "../../../core/utils/isEmailInvalid";
import { isInitial } from "../../../core/utils/isInitial";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useLabeledElement } from "../../../hooks/useLabeledElement";
import { useProfileDetailsSettings } from "../../../hooks/useProfileDetailsSettings";
import { useYesOrNoSelectOptions } from "../../../hooks/useYesOrNoSelectOptions";
import { useConfirmDialog } from "../../../lib/dialogs/hooks/useConfirmDialog";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyUser } from "../../../model/DummyUser";
import { AppRoutes } from "../../../routes/AppRoutes";
import { UserInfo } from "../../../services/UserInfo";
import { IUserGrading } from "../../../shared/model/IUserGrading";
import { AuthRole } from "../../../shared/types/AuthRole";
import { Gender } from "../../../shared/types/Gender";
import { Grade } from "../../../shared/types/Grade";
import { Tariff } from "../../../shared/types/Tariff";
import { uuid } from "../../../utils/uuid";
import { useSendPasswordResetRequest } from "../hooks/useSendPasswordResetRequest";
import { useSendUserInvite } from "../hooks/useSendUserInvite";
import { IUserProps } from "./IUserProps";

export const useUserViewModel = (props: IUserProps) => {
  const { t } = useTranslation();
  const userProfile = checkNotNull(props.user.userProfile);
  const userRoles = checkNotNull(props.user.userRoles);
  const userContactOptions = userProfile.userContactOptions;
  const [profileDetailsSettings, setProfileDetailsSettings] =
    useProfileDetailsSettings();
  const [displayMode, setDisplayMode] = useState(
    props.user instanceof DummyUser && props.user.isPersisted === false
      ? false
      : true
  );
  const [birthday, setBirthday, birthdayError, setBirthdayError] =
    useLabeledElement(
      userProfile.birthday ? DateTime.toDate(userProfile.birthday) : ""
    );
  const [email, setEmail, emailError, setEmailError] = useLabeledElement(
    userProfile.email
  );
  const [username, setUsername, usernameError, setUsernameError] =
    useLabeledElement(props.user.username);
  const [firstname, setFirstname, firstnameError, setFirstnameError] =
    useLabeledElement(userProfile.firstname);
  const [lastname, setLastname, lastnameError, setLastnameError] =
    useLabeledElement(userProfile.lastname);
  const [gender, setGender] = useState(userProfile.gender);
  const [tariff, setTariff] = useState(userProfile.tariff);
  const [isAdmin, setIsAdmin] = useState(UserInfo.containsAdminRole(userRoles));
  const [isTrainer, setIsTrainer] = useState(
    UserInfo.containsTrainerRole(userRoles)
  );
  const [phone, setPhone] = useState(userProfile.phone);

  // Guardian
  const [firstnameGuardian, setGuardianFirstname] = useState(
    userProfile.guardianFirstname
  );
  const [lastnameGuardian, setGuardianLastname] = useState(
    userProfile.guardianLastname
  );
  const [phoneGuardian, setGuardianPhone] = useState(userProfile.guardianPhone);

  const [street, setStreet, streetError, setStreetError] = useLabeledElement(
    userProfile.street
  );
  const [postalCode, setPostalCode, postalCodeError, setPostalCodeError] =
    useLabeledElement(userProfile.postalCode);
  const [city, setCity, cityError, setCityError] = useLabeledElement(
    userProfile.city
  );
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
  const [isLocked, setIsLocked] = useState(props.user.isLocked);
  const [lockedAt, setLockedAt] = useState(props.user.lockedAt);
  const [collapseBank, setCollapseBank] = useState(false);
  const [gradings, setGradings] = useState<IUserGrading[]>(
    userProfile.userGradings
      ? userProfile.userGradings.map((userGrading) => ({ ...userGrading }))
      : []
  );
  const [joinedOn, setJoinedOn] = useState(
    userProfile.joinedOn ? DateTime.toDate(userProfile.joinedOn) : ""
  );
  const [resignedAt, setResignedAt] = useState(
    userProfile.resignedAt ? DateTime.toDate(userProfile.resignedAt) : ""
  );
  const [lastInvitedAt, setLastInvitedAt] = useState(userProfile.lastInvitedAt);
  const [existsByUsernameRequest] = useRequest();
  const [sendUserInvite, isSendingUserInvite] = useSendUserInvite();
  const [sendPasswordResetRequest, isSendingPasswordResetRequest] =
    useSendPasswordResetRequest();
  const navigate = useNavigate();
  const confirmDialog = useConfirmDialog();
  const toast = useToast();
  const isAdminOptions = useYesOrNoSelectOptions();
  const isTrainerOptions = useYesOrNoSelectOptions();

  const [contactOptionEmail, setContactOptionEmail] = useState(
    userContactOptions?.email ?? false
  );
  const [contactOptionHomepagePhotos, setContactOptionHomepagePhotos] =
    useState(userContactOptions?.homepagePhotos ?? false);
  const [contactOptionPrintPhotos, setContactOptionPrintPhotos] = useState(
    userContactOptions?.printPhotos ?? false
  );
  const [contactOptionSocialMediaPhotos, setContactOptionSocialMediaPhotos] =
    useState(userContactOptions?.socialMediaPhotos ?? false);
  const [contactOptionTextMessage, setContactOptionTextMessage] = useState(
    userContactOptions?.textMessage ?? false
  );
  const [contactOptionWhatsApp, setContactOptionWhatsApp] = useState(
    userContactOptions?.whatsApp ?? false
  );

  const contactOptionEmailOptions = useYesOrNoSelectOptions();
  const contactOptionHomepagePhotosOptions = useYesOrNoSelectOptions();
  const contactOptionPrintPhotosOptions = useYesOrNoSelectOptions();
  const contactOptionSocialMediaPhotosOptions = useYesOrNoSelectOptions();
  const contactOptionTextMessageOptions = useYesOrNoSelectOptions();
  const contactOptionWhatsAppOptions = useYesOrNoSelectOptions();

  const reset = useCallback(() => {
    setBirthday(
      userProfile.birthday ? DateTime.toDate(userProfile.birthday) : ""
    );
    setEmail(userProfile.email);
    setUsername(props.user.username);
    setFirstname(userProfile.firstname);
    setLastname(userProfile.lastname);
    setGender(userProfile.gender);
    setIsAdmin(UserInfo.containsAdminRole(userRoles));
    setIsTrainer(UserInfo.containsTrainerRole(userRoles));
    setPhone(userProfile.phone);
    setStreet(userProfile.street);
    setPostalCode(userProfile.postalCode);
    setCity(userProfile.city);
    setIsLocked(props.user.isLocked);
    setLockedAt(props.user.lockedAt);
    setTariff(userProfile.tariff);
    setBankAccountBIC(userProfile.userBankAccount?.bankAccountBIC ?? "");
    setBankAccountIBAN(userProfile.userBankAccount?.bankAccountIBAN ?? "");
    setBankAccountInstitution(
      userProfile.userBankAccount?.bankAccountInstitution ?? ""
    );
    setBankAccountOwner(userProfile.userBankAccount?.bankAccountOwner ?? "");
    setGradings(
      userProfile.userGradings
        ? userProfile.userGradings.map((userGrading) => ({ ...userGrading }))
        : []
    );
    setJoinedOn(
      userProfile.joinedOn ? DateTime.toDate(userProfile.joinedOn) : ""
    );
    setResignedAt(
      userProfile.resignedAt ? DateTime.toDate(userProfile.resignedAt) : ""
    );
    setDisplayMode(true);
  }, [
    setBirthday,
    userProfile.birthday,
    userProfile.email,
    userProfile.firstname,
    userProfile.lastname,
    userProfile.gender,
    userProfile.phone,
    userProfile.street,
    userProfile.postalCode,
    userProfile.city,
    userProfile.tariff,
    userProfile.userBankAccount?.bankAccountBIC,
    userProfile.userBankAccount?.bankAccountIBAN,
    userProfile.userBankAccount?.bankAccountInstitution,
    userProfile.userBankAccount?.bankAccountOwner,
    userProfile.userGradings,
    userProfile.joinedOn,
    userProfile.resignedAt,
    setEmail,
    setUsername,
    props.user.username,
    props.user.isLocked,
    props.user.lockedAt,
    setFirstname,
    setLastname,
    userRoles,
    setStreet,
    setPostalCode,
    setCity,
  ]);

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

  const isPersistedUser =
    !(props.user instanceof DummyUser) || props.user.isPersisted === true;

  const onChangeBirthday = (newValue: string) => setBirthday(newValue);

  const onChangeJoinedOn = (newValue: string) => setJoinedOn(newValue);

  const onChangeResignAt = (newValue: string) => setResignedAt(newValue);

  const onChangePostalCode = (newValue: string) => {
    if (isInitial(newValue)) {
      setPostalCode("");
    } else {
      const newValueInt = parseInt(newValue);
      if (newValueInt) {
        setPostalCode(newValueInt.toString());
      }
    }
  };

  const onAddGrading = (
    achievedAt: Date,
    grade: Grade,
    place: string,
    examiners: string
  ) => {
    setGradings((previous) => {
      const grading: IUserGrading = {
        id: uuid(),
        userProfileId: props.user.id,
        achievedAt: achievedAt.toISOString() as unknown as Date,
        examiners,
        grade,
        place,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return [...previous, grading];
    });
  };

  const onChangeGrading = (grading: IUserGrading) => {
    setGradings((previous) => {
      const index = previous.findIndex((item) => item.id === grading.id);
      if (index !== -1) {
        previous.splice(index, 1, grading);
      }
      return [...previous];
    });
  };

  const onDeleteGrading = (grading: IUserGrading) =>
    setGradings((previous) => {
      return previous.filter((item) => item.id !== grading.id);
    });

  const onDeleteUser = () =>
    confirmDialog.show(
      t(texts.user.deleteUserTitle),
      t(texts.user.deleteUserQuestion, { username: props.user.username }),
      {
        onOkay: () => props.onDelete?.(props.user),
      }
    );

  const onUnlock = () =>
    confirmDialog.show(
      t(texts.user.unlockUserTitle),
      t(texts.user.unlockUserQuestion, { username: props.user.username }),
      {
        onOkay: () => props.onUnlock?.(props.user),
      }
    );

  const onLock = () =>
    confirmDialog.show(
      t(texts.user.lockUserTitle),
      t(texts.user.lockUserQuestion, { username: props.user.username }),
      {
        onOkay: () => props.onLock?.(props.user),
      }
    );

  const onToggleIsLocked = () => {
    if (isLocked === false) {
      onLock();
    } else {
      onUnlock();
    }
  };

  const onChangePassword = () => navigate(AppRoutes.changePassword.toPath());

  const onSendUserInvite = async () => {
    await sendUserInvite(props.user);
    setLastInvitedAt(new Date());
  };

  const onPasswordReset = () => sendPasswordResetRequest(props.user);

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

  const updateUserRole = (role: AuthRole, hasRole: boolean) => {
    // find role index
    const index = userRoles.findIndex((userRole) => userRole.role === role);

    if (hasRole === false) {
      // delete if exist
      if (index !== -1) {
        userRoles.splice(index, 1);
      }
    } else {
      // add if not exist
      if (index === -1) {
        userRoles.push({
          id: uuid(),
          role: role,
          userId: props.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
  };

  const updateUserRoles = () => {
    updateUserRole(AuthRole.ADMIN, isAdmin);
    updateUserRole(AuthRole.TRAINER, isTrainer);
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
    userProfile.joinedOn = DateTime.create(joinedOn, "12:00");
    userProfile.resignedAt = DateTime.create(resignedAt, "12:00");
    props.user.isLocked = isLocked;
    props.user.lockedAt = lockedAt;

    updateUserBankAccount();
    updateUserRoles();
    userProfile.userGradings = gradings;

    if (props.user instanceof DummyUser && props.user.isPersisted === false) {
      confirmDialog.show(
        t(texts.user.sendInvitation),
        t(texts.user.sendInvitationQuestion),
        {
          cancelButtonCaption: t(texts.general.no),
          okayButtonCaption: t(texts.general.yes),
          onCancel: () => props.onSave?.(props.user, false),
          onOkay: () => props.onSave?.(props.user, true),
        }
      );
    } else {
      props.onSave?.(props.user, false);
    }
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

  const onToggleCollapseContactOptions = (collapsed: boolean) =>
    setProfileDetailsSettings((previous) => {
      previous.collapseContactOptions = collapsed;
      return { ...previous };
    });

  const onToggleCollapseGradings = (collapsed: boolean) =>
    setProfileDetailsSettings((previous) => {
      previous.collapseGradings = collapsed;
      return { ...previous };
    });

  const onToggleCollapseGuardian = (collapsed: boolean) =>
    setProfileDetailsSettings((previous) => {
      previous.collapseGuardian = collapsed;
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

  const onValidate = async () => {
    let isValid = true;
    if (isInitial(username)) {
      isValid = false;
      setUsernameError(t(texts.user.errorUsernameRequired));
    }

    // if username has changed, check if username is still unique
    if (isNotInitial(username) && props.user.username !== username) {
      const userApi = new UserApi();
      let exists = false;
      await existsByUsernameRequest(async () => {
        exists = await userApi.existsByUsername(username);
      });
      if (exists) {
        isValid = false;
        setUsernameError(t(texts.user.errorUsernameExists));
      }
    }

    if (isInitial(firstname)) {
      isValid = false;
      setFirstnameError(t(texts.user.errorFirstnameRequired));
    }

    if (isInitial(lastname)) {
      isValid = false;
      setLastnameError(t(texts.user.errorLastnameRequired));
    }

    if (isInitial(email)) {
      isValid = false;
      setEmailError(t(texts.user.errorEmailRequired));
    } else {
      if (isEmailInvalid(email)) {
        isValid = false;
        setEmailError(t(texts.user.errorEmailInvalid));
      }
    }

    if (isInitial(birthday)) {
      isValid = false;
      setBirthdayError(t(texts.user.errorBirthdayRequired));
    }

    if (isInitial(street)) {
      isValid = false;
      setStreetError(t(texts.user.errorStreetRequired));
    }

    if (isInitial(postalCode)) {
      isValid = false;
      setPostalCodeError(t(texts.user.errorPostalCodeRequired));
    }

    if (isInitial(city)) {
      isValid = false;
      setCityError(t(texts.user.errorCityRequired));
    }

    if (!isValid) {
      toast.error(t(texts.user.errorInvalidInput));
      throw new ValidationError();
    }
  };

  return {
    bankAccountBIC,
    bankAccountIBAN,
    bankAccountInstitution,
    bankAccountOwner,
    birthday,
    birthdayError,
    city,
    cityError,
    collapseBank,
    confirmDialog,
    contactOptionEmail,
    contactOptionHomepagePhotos,
    contactOptionPrintPhotos,
    contactOptionSocialMediaPhotos,
    contactOptionTextMessage,
    contactOptionWhatsApp,
    contactOptionEmailOptions,
    contactOptionTextMessageOptions,
    contactOptionHomepagePhotosOptions,
    contactOptionPrintPhotosOptions,
    contactOptionSocialMediaPhotosOptions,
    contactOptionWhatsAppOptions,
    displayMode,
    email,
    emailError,
    firstname,
    firstnameError,
    guardianFirstname: firstnameGuardian,
    gender,
    genderOptions,
    gradings,
    isAdmin,
    isAdminOptions,
    isLocked,
    isPersistedUser,
    isSendingUserInvite,
    isSendingPasswordResetRequest,
    isTrainer,
    isTrainerOptions,
    joinedOn,
    lastInvitedAt,
    lastname,
    lastnameError,
    guardianLastname: lastnameGuardian,
    onAddGrading,
    onCancel,
    onChangeBirthday,
    onChangeGrading,
    onChangeJoinedOn,
    onChangePassword,
    onChangePostalCode,
    onChangeResignAt,
    onDeleteGrading,
    onDeleteUser,
    onPasswordReset,
    onSave,
    onSendUserInvite,
    onToggleCollapseAddress,
    onToggleCollapseBank,
    onToggleCollapseContactOptions,
    onToggleCollapseGradings,
    onToggleCollapseGuardian,
    onToggleCollapsePersonalInformation,
    onToggleCollapseTechnicalInformation,
    onToggleIsLocked,
    onValidate,
    phone,
    guardianPhone: phoneGuardian,
    postalCode,
    postalCodeError,
    profileDetailsSettings,
    resignedAt,
    setBankAccountBIC,
    setBankAccountIBAN,
    setBankAccountInstitution,
    setBankAccountOwner,
    setCity,
    setCollapseBank,
    setContactOptionEmail,
    setContactOptionHomepagePhotos,
    setContactOptionPrintPhotos,
    setContactOptionSocialMediaPhotos,
    setContactOptionTextMessage,
    setContactOptionWhatsApp,
    setDisplayMode,
    setEmail,
    setFirstname,
    setGuardianFirstname,
    setGuardianLastname,
    setGuardianPhone,
    setLastname,
    setGender,
    setIsAdmin,
    setIsTrainer,
    setPhone,
    setStreet,
    setTariff,
    setUsername,
    street,
    streetError,
    tariff,
    tariffOptions,
    username,
    usernameError,
  };
};
