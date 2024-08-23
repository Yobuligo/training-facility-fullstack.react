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
      <div>{`${userProfile.firstname} ${userProfile.lastname}`}</div>
      <ToggleButtonGroup
        enableUnselectAll={true}
        items={viewModel.toggleButtonOptions}
        onChange={viewModel.onToggleButtonOptionChange}
        selected={viewModel.selectedToggleButtonOption}
      />
    </Card>
  );
};
