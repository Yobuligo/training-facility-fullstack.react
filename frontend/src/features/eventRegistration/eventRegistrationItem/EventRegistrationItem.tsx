import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { GiftsIcon } from "../../../icons/GiftsIcon";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { hasBirthday } from "../../../utils/hasBirthday";
import styles from "./EventRegistrationItem.module.scss";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";
import { useEventRegistrationItemViewModel } from "./useEventRegistrationItemViewModel";

export const EventRegistrationItem: React.FC<IEventRegistrationItemProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useEventRegistrationItemViewModel(props);

  return (
    <Card className={styles.eventRegistrationItem}>
      <div className={styles.eventRegistrationItemContent}>
        {viewModel.confirmDialog.content}
        <div>{viewModel.fullName}</div>
        {props.eventRegistration.manuallyAdded ? (
          <div className={styles.manuallyAddedSection}>
            <div className={styles.addedByTrainerInfo}>
              {t(texts.eventRegistrationItem.addedByTrainer)}
            </div>
            <Toolbar>
              <SecondaryButton onClick={viewModel.onDelete}>
                {t(texts.general.delete)}
              </SecondaryButton>
              <Button>{t(texts.eventRegistrationItem.present)}</Button>
            </Toolbar>
          </div>
        ) : (
          <ToggleButtonGroup
            enableUnselectAll={true}
            items={viewModel.toggleButtonOptions}
            onChange={viewModel.onToggleButtonOptionChange}
            selected={viewModel.selectedToggleButtonOption}
          />
        )}
      </div>
      <>
        {hasBirthday(props.eventRegistration.user?.userProfile?.birthday) && (
          <div className={styles.giftContainer}>
            <GiftsIcon className={styles.gift} />
          </div>
        )}
      </>
    </Card>
  );
};
