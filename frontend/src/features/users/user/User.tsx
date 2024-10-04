import { Button } from "../../../components/button/Button";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { LabeledSelect } from "../../../components/labeledSelect/LabeledSelect";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { DateTime } from "../../../core/services/date/DateTime";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { useUser } from "../../../hooks/useUser";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { formatMemberId } from "../../../utils/formatMemberId";
import { GradingSection } from "../../grading/gradingSection/GradingSection";
import { UserProfileGroup } from "../userProfileGroup/UserProfileGroup";
import { IUserProps } from "./IUserProps";
import styles from "./User.module.scss";
import { useUserViewModel } from "./useUserViewModel";

export const User: React.FC<IUserProps> = (props) => {
  const viewModel = useUserViewModel(props);
  const [user] = useUser();
  const { t } = useTranslation();
  const screenSize = useScreenSize(45);

  const adminModeButtons = (
    <>
      {viewModel.isPersistedUser && (
        <SpinnerButton
          displaySpinner={viewModel.isSendUserInviteRequestProcessing}
          onClick={viewModel.onSendUserInvite}
        >
          {t(texts.user.sendInvitation)}
        </SpinnerButton>
      )}
      {viewModel.isPersistedUser && (
        <SpinnerButton
          displaySpinner={viewModel.isPasswordResetRequestProcessing}
          onClick={viewModel.onPasswordReset}
        >
          {t(texts.user.resetPassword)}
        </SpinnerButton>
      )}

      {/* current user must not be lockable */}
      {user.id !== props.user.id && viewModel.isPersistedUser && (
        <Button onClick={viewModel.onToggleIsLocked}>
          {viewModel.isLocked ? t(texts.user.unlock) : t(texts.user.lock)}
        </Button>
      )}

      {/* current user must not be deletable */}
      {user.id !== props.user.id && viewModel.isPersistedUser && (
        <Button onClick={viewModel.onDeleteUser}>
          {t(texts.user.deleteUser)}
        </Button>
      )}
    </>
  );

  return (
    <div className={styles.user}>
      {viewModel.confirmDialog.content}
      <ChangeableForm
        displayMode={viewModel.displayMode}
        onCancel={viewModel.onCancel}
        onSave={viewModel.onSave}
        onValidate={viewModel.onValidate}
        setDisplayMode={viewModel.setDisplayMode}
      >
        <h3 className={styles.username}>{`${
          props.user.userProfile?.firstname
        } ${props.user.userProfile?.lastname} ${
          props.user.userProfile && props.user.userProfile.memberId !== 0
            ? `| ${formatMemberId(props.user.userProfile.memberId)}`
            : ""
        }`}</h3>

        <UserProfileGroup
          collapsed={
            viewModel.profileDetailsSettings.collapsePersonalInformation
          }
          onToggleCollapse={viewModel.onToggleCollapsePersonalInformation}
          title={t(texts.user.personalInformation)}
        >
          <LabeledInput
            disabled={viewModel.displayMode || !props.isAdminMode}
            error={viewModel.usernameError}
            label={t(texts.general.username)}
            maxLength={100}
            onChange={viewModel.setUsername}
            value={viewModel.username}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            error={viewModel.firstnameError}
            label={t(texts.user.firstname)}
            maxLength={50}
            onChange={viewModel.setFirstname}
            value={viewModel.firstname}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            error={viewModel.lastnameError}
            label={t(texts.user.lastname)}
            maxLength={50}
            onChange={viewModel.setLastname}
            value={viewModel.lastname}
          />

          <LabeledSelect
            disabled={viewModel.displayMode}
            label={t(texts.user.gender)}
            options={viewModel.genderOptions}
            onSelect={viewModel.setGender}
            value={viewModel.gender}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            error={viewModel.emailError}
            label={t(texts.user.email)}
            maxLength={255}
            onChange={viewModel.setEmail}
            value={viewModel.email}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            isOptional={true}
            label={t(texts.user.phone)}
            maxLength={20}
            onChange={viewModel.setPhone}
            value={viewModel.phone}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            error={viewModel.birthdayError}
            label={t(texts.user.birthday)}
            type="date"
            onChange={viewModel.onChangeBirthday}
            value={viewModel.birthday}
          />

          <LabeledSelect
            disabled={props.isAdminMode === true ? viewModel.displayMode : true}
            label={t(texts.user.tariff)}
            options={viewModel.tariffOptions}
            onSelect={viewModel.setTariff}
            value={viewModel.tariff}
          />
        </UserProfileGroup>

        <UserProfileGroup
          collapsed={viewModel.profileDetailsSettings.collapseAddress}
          onToggleCollapse={viewModel.onToggleCollapseAddress}
          title={t(texts.user.address)}
        >
          <LabeledInput
            disabled={viewModel.displayMode}
            error={viewModel.streetError}
            label={t(texts.user.street)}
            maxLength={100}
            onChange={viewModel.setStreet}
            value={viewModel.street}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            error={viewModel.postalCodeError}
            label={t(texts.user.postalCode)}
            maxLength={10}
            onChange={viewModel.onChangePostalCode}
            value={viewModel.postalCode?.toString()}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            error={viewModel.cityError}
            label={t(texts.user.city)}
            maxLength={50}
            onChange={viewModel.setCity}
            value={viewModel.city}
          />
        </UserProfileGroup>

        <UserProfileGroup
          collapsed={viewModel.profileDetailsSettings.collapseBank}
          onToggleCollapse={viewModel.onToggleCollapseBank}
          title={t(texts.user.bank)}
        >
          <LabeledInput
            disabled={viewModel.displayMode}
            isOptional={true}
            label={t(texts.user.bankAccountOwner)}
            maxLength={100}
            onChange={viewModel.setBankAccountOwner}
            value={viewModel.bankAccountOwner}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            isOptional={true}
            label={t(texts.user.bankAccountIBAN)}
            maxLength={34}
            onChange={viewModel.setBankAccountIBAN}
            value={viewModel.bankAccountIBAN}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            isOptional={true}
            label={t(texts.user.bankAccountBIC)}
            maxLength={11}
            onChange={viewModel.setBankAccountBIC}
            value={viewModel.bankAccountBIC}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            isOptional={true}
            label={t(texts.user.bankAccountInstitution)}
            maxLength={50}
            onChange={viewModel.setBankAccountInstitution}
            value={viewModel.bankAccountInstitution}
          />
        </UserProfileGroup>

        {props.isAdminMode && (
          <UserProfileGroup
            className={styles.gradingGroup}
            collapsed={viewModel.profileDetailsSettings.collapseGradings}
            onToggleCollapse={viewModel.onToggleCollapseGradings}
            title={t(texts.user.gradings)}
          >
            <GradingSection
              displayMode={viewModel.displayMode}
              gradings={viewModel.gradings}
              isAdminMode={props.isAdminMode}
              onAddGrading={viewModel.onAddGrading}
              onDelete={viewModel.onDeleteGrading}
              userId={props.user.id}
            />
          </UserProfileGroup>
        )}

        <UserProfileGroup
          collapsed={
            viewModel.profileDetailsSettings.collapseTechnicalInformation
          }
          onToggleCollapse={viewModel.onToggleCollapseTechnicalInformation}
          title={t(texts.user.technicalInformation)}
        >
          {props.isAdminMode ? (
            <LabeledInput
              disabled={viewModel.displayMode}
              label={t(texts.user.joinedOn)}
              type="date"
              onChange={viewModel.onChangeJoinedOn}
              value={viewModel.joinedOn}
            />
          ) : (
            <div className={styles.joinedOnReadonly}>
              <div>{t(texts.user.joinedOn)}</div>
              <div>
                {props.user.userProfile
                  ? DateTime.format(
                      props.user.userProfile?.joinedOn,
                      "dd.MM.yyyy"
                    )
                  : ""}
              </div>
            </div>
          )}
          {props.isAdminMode && (
            <LabeledSelect
              disabled={viewModel.displayMode}
              label={t(texts.user.isAdmin)}
              options={viewModel.isAdminOptions}
              onSelect={viewModel.setIsAdmin}
              value={viewModel.isAdmin}
            />
          )}
          <Toolbar className={screenSize.isSmall() ? styles.toolbar : ""}>
            {props.isAdminMode && adminModeButtons}
            {!props.isAdminMode && (
              <Button onClick={viewModel.onChangePassword}>
                {t(texts.user.changePassword)}
              </Button>
            )}
          </Toolbar>
        </UserProfileGroup>
      </ChangeableForm>
    </div>
  );
};
