import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { LabeledSelect } from "../../../components/labeledSelect/LabeledSelect";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { toDate } from "../../../utils/toDate";
import { IUserProfileProps } from "./IUserProfileProps";
import styles from "./UserProfile.module.scss";
import { useUserProfileViewModel } from "./useUserProfileViewModel";

export const UserProfile: React.FC<IUserProfileProps> = (props) => {
  const viewModel = useUserProfileViewModel(props);
  const { t } = useTranslation();

  return (
    <div className={styles.userProfile}>
      <div className={styles.header}>
        <h3>{`${props.userProfile.firstname} ${props.userProfile.lastname}`}</h3>
        <div>
          {viewModel.displayMode ? (
            <Button onClick={viewModel.onToggleMode}>
              {t(texts.general.edit)}
            </Button>
          ) : (
            <Toolbar>
              <Button onClick={viewModel.onCancel}>
                {t(texts.general.cancel)}
              </Button>
              <Button onClick={viewModel.onSave}>
                {t(texts.general.save)}
              </Button>
            </Toolbar>
          )}
        </div>
      </div>

      <Card>
        <h4 className={styles.headline}>
          {t(texts.userProfile.personalInformation)}
        </h4>
        <div className={styles.group}>
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
            value={toDate(viewModel.birthday)}
          />

          <LabeledSelect
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.language)}
            options={viewModel.languageOptions}
            onSelect={viewModel.onLanguageChange}
            selected={viewModel.selectedLanguageOption}
          />
        </div>
      </Card>

      <Card>
        <h4 className={styles.headline}>{t(texts.userProfile.address)}</h4>
        <div className={styles.group}>
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
            value={viewModel.postalCode.toString()}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.city)}
            onChange={viewModel.setCity}
            value={viewModel.city}
          />
        </div>
      </Card>

      <Card>
        <h4 className={styles.headline}>{t(texts.userProfile.bank)}</h4>
        <div className={styles.group}>
          <LabeledInput
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
          />
        </div>
      </Card>

      <Card>
        <h4 className={styles.headline}>
          {t(texts.userProfile.technicalInformation)}
        </h4>
        <div className={styles.group}>
          <div>
            <div>{t(texts.userProfile.joinedOn)}</div>
            <div>{props.userProfile.joinedOn.toLocaleDateString()}</div>
          </div>
          {props.isAdminMode && (
            <>
              <div>
                <LabeledSelect
                  disabled={viewModel.displayMode}
                  label={t(texts.userProfile.isAdmin)}
                  options={viewModel.isAdminOptions}
                  onSelect={viewModel.onIsAdminChange}
                  selected={viewModel.selectedIsAdminOption}
                />
              </div>
              <Toolbar>
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
        </div>
      </Card>
    </div>
  );
};
