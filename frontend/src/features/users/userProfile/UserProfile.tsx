import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
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
          <Button>{t(texts.general.edit)}</Button>
        </div>
      </div>

      <Card>
        <h4>{t(texts.userProfile.personalInformation)}</h4>
        <div className={styles.group}>
          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.firstname)}
            value={props.userProfile.firstname}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.lastname)}
            value={props.userProfile.lastname}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.email)}
            value={props.userProfile.email}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.phone)}
            value={props.userProfile.phone}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.birthday)}
            value={props.userProfile.birthday.toString()}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.gender)}
            value={props.userProfile.gender.toString()}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.language)}
            value={props.userProfile.language.toString()}
          />
        </div>
      </Card>

      <Card>
        <h4>{t(texts.userProfile.address)}</h4>
        <div className={styles.group}>
          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.street)}
            value={props.userProfile.street}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.postalCode)}
            value={props.userProfile.postalCode.toString()}
          />

          <LabeledInput
            disabled={viewModel.displayMode}
            label={t(texts.userProfile.city)}
            value={props.userProfile.city}
          />
        </div>
      </Card>

      <Card>
        <h4>{t(texts.userProfile.technicalInformation)}</h4>
        <div className={styles.group}>
          <LabeledInput
            label={t(texts.userProfile.joinedOn)}
            value={props.userProfile.joinedOn.toString()}
          />
          <Button>{t(texts.userProfile.generateNewPassword)}</Button>
        </div>
      </Card>
    </div>
  );
};
