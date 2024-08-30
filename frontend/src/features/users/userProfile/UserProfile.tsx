import { Button } from "../../../components/button/Button";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { LabeledSelect } from "../../../components/labeledSelect/LabeledSelect";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { DateTime } from "../../../core/services/date/DateTime";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { toDate } from "../../../utils/toDate";
import { GradingSection } from "../../grading/gradingSection/GradingSection";
import { UserProfileGroup } from "../userProfileGroup/UserProfileGroup";
import { IUserProfileProps } from "./IUserProfileProps";
import styles from "./UserProfile.module.scss";
import { useUserProfileViewModel } from "./useUserProfileViewModel";

export const UserProfile: React.FC<IUserProfileProps> = (props) => {
  const viewModel = useUserProfileViewModel(props);
  const { t } = useTranslation();

  return (
    <div className={styles.userProfile}>
      <ChangeableForm
        displayMode={viewModel.displayMode}
        onCancel={viewModel.onCancel}
        onSave={viewModel.onSave}
        setDisplayMode={viewModel.setDisplayMode}
      >
        <h3>{`${props.userProfile.firstname} ${props.userProfile.lastname} (${props.userProfile.memberId})`}</h3>

        <UserProfileGroup
          collapsed={
            viewModel.profileDetailsSettings.collapsePersonalInformation
          }
          onToggleCollapse={viewModel.onToggleCollapsePersonalInformation}
          title={t(texts.userProfile.personalInformation)}
        >
          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.firstname)}
            onChange={viewModel.setFirstname}
            value={viewModel.firstname}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.lastname)}
            onChange={viewModel.setLastname}
            value={viewModel.lastname}
          />

          <LabeledSelect
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.gender)}
            options={viewModel.genderOptions}
            onSelect={viewModel.onGenderChange}
            selected={viewModel.selectedGenderOption}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.email)}
            onChange={viewModel.setEmail}
            value={viewModel.email}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.phone)}
            onChange={viewModel.setPhone}
            value={viewModel.phone}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.birthday)}
            type="date"
            onChange={viewModel.onChangeBirthday}
            value={viewModel.birthday ? toDate(viewModel.birthday) : ""}
          />

          <LabeledSelect
            disabled={props.isAdminMode === true ? viewModel.displayMode : true}
            label={t(texts.userProfile.tariff)}
            options={viewModel.tariffOptions}
            onSelect={viewModel.onTariffChange}
            selected={viewModel.selectedTariffOption}
          />
        </UserProfileGroup>

        <UserProfileGroup
          collapsed={viewModel.profileDetailsSettings.collapseAddress}
          onToggleCollapse={viewModel.onToggleCollapseAddress}
          title={t(texts.userProfile.address)}
        >
          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.street)}
            onChange={viewModel.setStreet}
            value={viewModel.street}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.postalCode)}
            onChange={viewModel.onChangePostalCode}
            value={viewModel.postalCode?.toString()}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.city)}
            onChange={viewModel.setCity}
            value={viewModel.city}
          />
        </UserProfileGroup>

        <UserProfileGroup
          collapsed={viewModel.profileDetailsSettings.collapseBank}
          onToggleCollapse={viewModel.onToggleCollapseBank}
          title={t(texts.userProfile.bank)}
        >
          TODO
          {/* <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.bankAccountOwner)}
            onChange={viewModel.setBankAccountOwner}
            value={viewModel.bankAccountOwner}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.bankAccountIBAN)}
            onChange={viewModel.setBankAccountIBAN}
            value={viewModel.bankAccountIBAN}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.bankAccountBIC)}
            onChange={viewModel.setBankAccountBIC}
            value={viewModel.bankAccountBIC}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.bankAccountInstitution)}
            onChange={viewModel.setBankAccountInstitution}
            value={viewModel.bankAccountInstitution}
          /> */}
        </UserProfileGroup>

        {props.isAdminMode && (
          <UserProfileGroup
            className={styles.gradingGroup}
            collapsed={viewModel.profileDetailsSettings.collapseGradings}
            onToggleCollapse={viewModel.onToggleCollapseGradings}
            title={t(texts.userProfile.gradings)}
          >
            <GradingSection
              displayMode={viewModel.displayMode}
              gradings={viewModel.gradings}
              isAdminMode={props.isAdminMode}
              onAddGrading={viewModel.onAddGrading}
              onDelete={viewModel.onDeleteGrading}
              userId={props.userProfile.userId}
            />
          </UserProfileGroup>
        )}

        <UserProfileGroup
          collapsed={
            viewModel.profileDetailsSettings.collapseTechnicalInformation
          }
          onToggleCollapse={viewModel.onToggleCollapseTechnicalInformation}
          title={t(texts.userProfile.technicalInformation)}
        >
          <div>
            <div>{t(texts.userProfile.joinedOn)}</div>
            <div>
              {DateTime.format(props.userProfile.joinedOn, "dd.MM.yyyy")}
            </div>
          </div>
          {props.isAdminMode && (
            <>
              <div>
                <LabeledSelect
                  disabled={viewModel.displayMode}
                  label={t(texts.userProfile.isAdmin)}
                  options={viewModel.isAdminOptions}
                  // onSelect={viewModel.onIsAdminChange}
                  // selected={viewModel.selectedIsAdminOption}
                />
              </div>
              <Toolbar>
                <Button disabled={viewModel.displayMode}>
                  {t(texts.userProfile.sendInvitation)}
                </Button>
                <Button disabled={viewModel.displayMode}>
                  {t(texts.userProfile.generateNewPassword)}
                </Button>
                <Button
                  disabled={viewModel.displayMode}
                  onClick={viewModel.onToggleIsDeactivated}
                >
                  {viewModel.isDeactivated
                    ? t(texts.userProfile.activate)
                    : t(texts.userProfile.deactivate)}
                </Button>
              </Toolbar>
            </>
          )}
        </UserProfileGroup>
      </ChangeableForm>
    </div>
  );
};
