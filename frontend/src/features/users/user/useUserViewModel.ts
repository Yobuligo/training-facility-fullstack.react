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
import { IUserGuardian } from "../../../shared/model/IUserGuardian";
import { AuthRole } from "../../../shared/types/AuthRole";
import { Gender } from "../../../shared/types/Gender";
import { Grade } from "../../../shared/types/Grade";
import { Tariff } from "../../../shared/types/Tariff";
import { uuid } from "../../../utils/uuid";
import { useSendPasswordResetRequest } from "../hooks/useSendPasswordResetRequest";
import { useSendUserInvite } from "../hooks/useSendUserInvite";
import { IUserProps } from "./IUserProps";
import { updateUserGuardian } from "./updateUserGuardian";

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
  const userGuardian1 = userProfile.userGuardians?.[0];
  const [guardian1Email, setGuardian1Email] = useState(
    userGuardian1?.email ?? ""
  );
  const [guardian1Firstname, setGuardian1Firstname] = useState(
    userGuardian1?.firstname ?? ""
  );
  const [guardian1Lastname, setGuardian1Lastname] = useState(
    userGuardian1?.lastname ?? ""
  );
  const [guardian1Phone, setGuardian1Phone] = useState(
    userGuardian1?.phone ?? ""
  );

  const userGuardian2 = userProfile.userGuardians?.[1];
  const [guardian2Email, setGuardian2Email] = useState(
    userGuardian2?.email ?? ""
  );
  const [guardian2Firstname, setGuardian2Firstname] = useState(
    userGuardian2?.firstname ?? ""
  );
  const [guardian2Lastname, setGuardian2Lastname] = useState(
    userGuardian2?.lastname ?? ""
  );
  const [guardian2Phone, setGuardian2Phone] = useState(
    userGuardian2?.phone ?? ""
  );

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

  const reset = useCallback(() => {
    setBirthday(
      userProfile.birthday ? DateTime.toDate(userProfile.birthday) : ""
    );
    setEmail(userProfile.email);
    setUsername(props.user.username);
    setFirstname(userProfile.firstname);
    setLastname(userProfile.lastname);
    setGender(userProfile.gender);
    setPhone(userProfile.phone);
    setTariff(userProfile.tariff);

    setGuardian1Email(userGuardian1?.email ?? "");
    setGuardian1Firstname(userGuardian1?.firstname ?? "");
    setGuardian1Lastname(userGuardian1?.lastname ?? "");
    setGuardian1Phone(userGuardian1?.phone ?? "");
    setGuardian2Firstname(userGuardian2?.firstname ?? "");
    setGuardian2Lastname(userGuardian2?.firstname ?? "");
    setGuardian2Phone(userGuardian2?.phone ?? "");
    setGuardian2Email(userGuardian2?.email ?? "");

    setStreet(userProfile.street);
    setPostalCode(userProfile.postalCode);
    setCity(userProfile.city);

    setIsLocked(props.user.isLocked);
    setLockedAt(props.user.lockedAt);

    setBankAccountBIC(userProfile.userBankAccount?.bankAccountBIC ?? "");
    setBankAccountIBAN(userProfile.userBankAccount?.bankAccountIBAN ?? "");
    setBankAccountOwner(userProfile.userBankAccount?.bankAccountOwner ?? "");

    setContactOptionEmail(userContactOptions?.email ?? false);
    setContactOptionHomepagePhotos(userContactOptions?.homepagePhotos ?? false);
    setContactOptionPrintPhotos(userContactOptions?.printPhotos ?? false);
    setContactOptionSocialMediaPhotos(
      userContactOptions?.socialMediaPhotos ?? false
    );
    setContactOptionTextMessage(userContactOptions?.textMessage ?? false);
    setContactOptionWhatsApp(userContactOptions?.whatsApp ?? false);

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
    setIsAdmin(UserInfo.containsAdminRole(userRoles));
    setIsTrainer(UserInfo.containsTrainerRole(userRoles));
    setDisplayMode(true);
  }, [
    setBirthday,
    userProfile.birthday,
    userProfile.email,
    userProfile.firstname,
    userProfile.lastname,
    userProfile.gender,
    userProfile.phone,
    userProfile.tariff,
    userProfile.street,
    userProfile.postalCode,
    userProfile.city,
    userProfile.userBankAccount?.bankAccountBIC,
    userProfile.userBankAccount?.bankAccountIBAN,
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
    userGuardian1?.email,
    userGuardian1?.firstname,
    userGuardian1?.lastname,
    userGuardian1?.phone,
    userGuardian2?.firstname,
    userGuardian2?.phone,
    userGuardian2?.email,
    setStreet,
    setPostalCode,
    setCity,
    userContactOptions?.email,
    userContactOptions?.homepagePhotos,
    userContactOptions?.printPhotos,
    userContactOptions?.socialMediaPhotos,
    userContactOptions?.textMessage,
    userContactOptions?.whatsApp,
    userRoles,
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
    isNotInitial(bankAccountOwner);

  const updateUserBankAccount = () => {
    // if userBankAccount was not created yet, check if it is required, create userBankAccount
    if (!userProfile.userBankAccount && needsCreateUserBankAccount()) {
      userProfile.userBankAccount = {
        id: uuid(),
        bankAccountBIC,
        bankAccountIBAN,
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
    userProfile.userBankAccount.bankAccountOwner = bankAccountOwner;
  };

  const updateUserContactOptions = () => {
    // if userContactOptions was not created yet, create it
    if (!userProfile.userContactOptions) {
      userProfile.userContactOptions = {
        id: uuid(),
        email: contactOptionEmail,
        homepagePhotos: contactOptionHomepagePhotos,
        printPhotos: contactOptionPrintPhotos,
        socialMediaPhotos: contactOptionSocialMediaPhotos,
        textMessage: contactOptionTextMessage,
        whatsApp: contactOptionWhatsApp,
        userProfileId: userProfile.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return;
    }

    // update userContactOptions
    userProfile.userContactOptions.email = contactOptionEmail;
    userProfile.userContactOptions.homepagePhotos = contactOptionHomepagePhotos;
    userProfile.userContactOptions.printPhotos = contactOptionPrintPhotos;
    userProfile.userContactOptions.socialMediaPhotos =
      contactOptionSocialMediaPhotos;
    userProfile.userContactOptions.textMessage = contactOptionTextMessage;
    userProfile.userContactOptions.whatsApp = contactOptionWhatsApp;
  };

  /**
   * This function is responsible for updating the userGuardians of the current user.
   * Sets an empty user guardian list if no user guardian values was set
   * or updates or inserts a user guardian and update the userProfile.
   */
  const updateUserGuardians = () => {
    const userGuardians: IUserGuardian[] = [];

    updateUserGuardian(
      userGuardians,
      userProfile.id,
      guardian1Email,
      guardian1Firstname,
      guardian1Lastname,
      guardian1Phone,
      userGuardian1
    );

    updateUserGuardian(
      userGuardians,
      userProfile.id,
      guardian2Email,
      guardian2Firstname,
      guardian2Lastname,
      guardian2Phone,
      userGuardian2
    );

    userProfile.userGuardians = userGuardians;
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

    updateUserGuardians();
    updateUserBankAccount();
    updateUserContactOptions();
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

  //
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
    displayMode,
    email,
    emailError,
    firstname,
    firstnameError,
    guardian1Email,
    guardian1Firstname,
    guardian1Lastname,
    guardian1Phone,
    guardian2Email,
    guardian2Firstname,
    guardian2Lastname,
    guardian2Phone,
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
    postalCode,
    postalCodeError,
    profileDetailsSettings,
    resignedAt,
    setBankAccountBIC,
    setBankAccountIBAN,
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
    setGuardian1Email,
    setGuardian1Firstname,
    setGuardian1Lastname,
    setGuardian1Phone,
    setGuardian2Email,
    setGuardian2Firstname,
    setGuardian2Lastname,
    setGuardian2Phone,
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
