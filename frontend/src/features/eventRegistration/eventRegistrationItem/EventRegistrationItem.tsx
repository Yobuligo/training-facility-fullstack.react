import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { CheckIcon } from "../../../icons/CheckIcon";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import { GiftsIcon } from "../../../icons/GiftsIcon";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { hasBirthday } from "../../../utils/hasBirthday";
import { UserProfileImageAndName } from "../../users/userProfileImage/userProfileImageAndName/UserProfileImageAndName";
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
          <div className={styles.manuallyAddedSection}>
            <div className={styles.addedByTrainerInfo}>
              {t(texts.eventRegistrationItem.addedByTrainer)}
            </div>

            <div className={styles.nameAndToolbarContainer}>
              <UserProfileImageAndName
                userProfile={props.eventRegistration.user?.userProfile}
              />
              <Toolbar>
                <SecondaryButton onClick={viewModel.onDelete}>
                  <DeleteIcon />
                </SecondaryButton>
                <Button>
                  <CheckIcon className={styles.icon} />
                </Button>
              </Toolbar>
            </div>
          </div>
        ) : (
          <div className={styles.nameAndToolbarContainer}>
            <UserProfileImageAndName
              userProfile={props.eventRegistration.user?.userProfile}
            />
            <ToggleButtonGroup
              enableUnselectAll={true}
              items={viewModel.toggleButtonOptions}
              onChange={viewModel.onToggleButtonOptionChange}
              selected={viewModel.selectedToggleButtonOption}
            />
          </div>
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
