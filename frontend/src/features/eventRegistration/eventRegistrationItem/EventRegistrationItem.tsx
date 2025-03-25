import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { CheckIcon } from "../../../icons/CheckIcon";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import { GiftsIcon } from "../../../icons/GiftsIcon";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { hasBirthday } from "../../../utils/hasBirthday";
import { EventRegistrationCheckInButtons } from "../eventRegistrationCheckInButtons/EventRegistrationCheckInButtons";
import { EventRegistrationItemBase } from "../eventRegistrationItemBase/EventRegistrationItemBase";
import styles from "./EventRegistrationItem.module.scss";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";
import { useEventRegistrationItemViewModel } from "./useEventRegistrationItemViewModel";

/**
 * This component is responsible for displaying an event registration entry,
 * so a registration of a user for a specific event instance.
 * It displays buttons to mark a registered user as present or missing.
 */
export const EventRegistrationItem: React.FC<IEventRegistrationItemProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useEventRegistrationItemViewModel(props);

  return (
    <Card className={styles.eventRegistrationItem}>
      <div className={styles.eventRegistrationItemContent}>
        {viewModel.confirmDialog.content}

        {props.eventRegistration.manuallyAdded ? (
          <EventRegistrationItemBase
            text={t(texts.eventRegistrationItem.addedByTrainer)}
            userProfile={props.eventRegistration.user?.userProfile}
          >
            <Toolbar>
              <SecondaryButton onClick={viewModel.onDelete}>
                <DeleteIcon />
              </SecondaryButton>
              <Button>
                <CheckIcon className={styles.icon} />
              </Button>
            </Toolbar>
          </EventRegistrationItemBase>
        ) : (
          <EventRegistrationItemBase
            userProfile={props.eventRegistration.user?.userProfile}
          >
            <EventRegistrationCheckInButtons
              eventRegistrationState={props.eventRegistration.state}
              onEventRegistrationStateChange={viewModel.updateEventState}
            />
          </EventRegistrationItemBase>
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
