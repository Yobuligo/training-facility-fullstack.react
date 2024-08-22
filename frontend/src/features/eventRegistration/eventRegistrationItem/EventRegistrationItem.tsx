import { Card } from "../../../components/card/Card";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import styles from "./EventRegistrationItem.module.scss";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";
import { useEventRegistrationItemViewModel } from "./useEventRegistrationItemViewModel";

export const EventRegistrationItem: React.FC<IEventRegistrationItemProps> = (
  props
) => {
  const viewModel = useEventRegistrationItemViewModel(props);
  const userProfile = checkNotNull(props.eventRegistration.userProfile);

  return (
    <Card className={styles.eventRegistrationItem}>
      <div className="styles.name">
        {`${userProfile.firstname} ${userProfile.lastname}`}
      </div>
      <ToggleButtonGroup items={viewModel.toggleButtonOptions} />
    </Card>
  );
};
