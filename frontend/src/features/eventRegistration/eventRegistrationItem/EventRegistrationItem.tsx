import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { texts } from "../../../lib/useTranslation/texts";
import { useTranslation } from "../../../lib/useTranslation/useTranslation";
import styles from "./EventRegistrationItem.module.scss";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";
import { useEventRegistrationItemViewModel } from "./useEventRegistrationItemViewModel";

export const EventRegistrationItem: React.FC<IEventRegistrationItemProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useEventRegistrationItemViewModel(props);
  const userProfile = checkNotNull(props.eventRegistration.userProfile);

  return (
    <Card className={styles.eventRegistrationItem}>
      <div>{`${userProfile.firstname} ${userProfile.lastname}`}</div>
      {props.eventRegistration.manuallyAdded ? (
        <Toolbar>
          <SecondaryButton onClick={viewModel.onDelete}>
            {t(texts.general.delete)}
          </SecondaryButton>
          <Button>{t(texts.eventRegistrationItem.present)}</Button>
        </Toolbar>
      ) : (
        <ToggleButtonGroup
          enableUnselectAll={true}
          items={viewModel.toggleButtonOptions}
          onChange={viewModel.onToggleButtonOptionChange}
          selected={viewModel.selectedToggleButtonOption}
        />
      )}
    </Card>
  );
};
