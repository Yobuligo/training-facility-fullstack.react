import { Button } from "../../../components/button/Button";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { LabeledSelect } from "../../../components/labeledSelect/LabeledSelect";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { DateTime } from "../../../core/services/date/DateTime";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { GradingSection } from "../../grading/gradingSection/GradingSection";
import { UserProfileGroup } from "../userProfileGroup/UserProfileGroup";
import { IUserProps } from "./IUserProps";
import styles from "./User.module.scss";
import { useUserViewModel } from "./useUserViewModel";

export const User: React.FC<IUserProps> = (props) => {
  const viewModel = useUserViewModel(props);
  const { t } = useTranslation();

  return (
    <div className={styles.user}>
      <ChangeableForm
        displayMode={viewModel.displayMode}
        onCancel={viewModel.onCancel}
        onSave={viewModel.onSave}
        setDisplayMode={viewModel.setDisplayMode}
      >
        <h3>{`${props.user.userProfile?.firstname} ${props.user.userProfile?.lastname} (${props.user.userProfile?.memberId})`}</h3>

        <UserProfileGroup
          collapsed={
            viewModel.profileDetailsSettings.collapsePersonalInformation
          }
          onToggleCollapse={viewModel.onToggleCollapsePersonalInformation}
          title={t(texts.user.personalInformation)}
        >
          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.username)}
            onChange={viewModel.setUsername}
            value={viewModel.username}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.firstname)}
            onChange={viewModel.setFirstname}
            value={viewModel.firstname}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.lastname)}
            onChange={viewModel.setLastname}
            value={viewModel.lastname}
          />

          <LabeledSelect
            disabled={viewModel.displayMode}
            label={t(texts.user.gender)}
            options={viewModel.genderOptions}
            onSelect={viewModel.onGenderChange}
            selected={viewModel.selectedGenderOption}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.email)}
            onChange={viewModel.setEmail}
            value={viewModel.email}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.phone)}
            onChange={viewModel.setPhone}
            value={viewModel.phone}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.birthday)}
            type="date"
            onChange={viewModel.onChangeBirthday}
            value={viewModel.birthday}
          />

          <LabeledSelect
            disabled={props.isAdminMode === true ? viewModel.displayMode : true}
            label={t(texts.user.tariff)}
            options={viewModel.tariffOptions}
            onSelect={viewModel.onTariffChange}
            selected={viewModel.selectedTariffOption}
          />
        </UserProfileGroup>

        <UserProfileGroup
          collapsed={viewModel.profileDetailsSettings.collapseAddress}
          onToggleCollapse={viewModel.onToggleCollapseAddress}
          title={t(texts.user.address)}
        >
          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.street)}
            onChange={viewModel.setStreet}
            value={viewModel.street}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.postalCode)}
            onChange={viewModel.onChangePostalCode}
            value={viewModel.postalCode?.toString()}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.city)}
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
            label={t(texts.user.bankAccountOwner)}
            onChange={viewModel.setBankAccountOwner}
            value={viewModel.bankAccountOwner}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.bankAccountIBAN)}
            onChange={viewModel.setBankAccountIBAN}
            value={viewModel.bankAccountIBAN}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.bankAccountBIC)}
            onChange={viewModel.setBankAccountBIC}
            value={viewModel.bankAccountBIC}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.user.bankAccountInstitution)}
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
          <div>
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
          {props.isAdminMode && (
            <>
              <div>
                <LabeledSelect
                  disabled={viewModel.displayMode}
                  label={t(texts.user.isAdmin)}
                  options={viewModel.isAdminOptions}
                  // onSelect={viewModel.onIsAdminChange}
                  // selected={viewModel.selectedIsAdminOption}
                />
              </div>
              <Toolbar>
                <Button disabled={viewModel.displayMode}>
                  {t(texts.user.sendInvitation)}
                </Button>
                <Button disabled={viewModel.displayMode}>
                  {t(texts.user.generateNewPassword)}
                </Button>
                <Button
                  disabled={viewModel.displayMode}
                  onClick={viewModel.onToggleIsDeactivated}
                >
                  {viewModel.isDeactivated
                    ? t(texts.user.activate)
                    : t(texts.user.deactivate)}
                </Button>
                <Button
                  disabled={viewModel.displayMode}
                  onClick={viewModel.onDeleteUser}
                >
                  {t(texts.user.deleteUser)}
                </Button>
              </Toolbar>
            </>
          )}
        </UserProfileGroup>
      </ChangeableForm>
    </div>
  );
};
