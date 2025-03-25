import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { CheckIcon } from "../../../icons/CheckIcon";
import { CloseIcon } from "../../../icons/CloseIcon";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import styles from "./EventRegistrationCheckInButtons.module.scss";
import { IEventRegistrationCheckInButtonsProps } from "./IEventRegistrationCheckInButtonsProps";

/**
 * This component is responsible for displaying two buttons for the event registration check in.
 * A user can either be marked as present or missing.
 */
export const EventRegistrationCheckInButtons: React.FC<
  IEventRegistrationCheckInButtonsProps
> = (props) => {
  const toggleButtonOptions: IToggleButtonOption<EventRegistrationState>[] = [
    {
      key: EventRegistrationState.MISSING,
      text: <CloseIcon className={styles.icon} />,
    },
    {
      key: EventRegistrationState.PRESENT,
      text: <CheckIcon className={styles.icon} />,
    },
  ];

  const selectedToggleButtonOption = toggleButtonOptions.find(
    (toggleButtonOption) =>
      toggleButtonOption.key === props.eventRegistrationState
  );

  const onToggleButtonOptionChange = (
    selected: IToggleButtonOption<EventRegistrationState> | undefined
  ) => {
    // if no toggle button option is selected, change to state OPEN
    // otherwise change to the selected state
    if (selected === undefined) {
      props.onEventRegistrationStateChange(EventRegistrationState.OPEN);
    } else {
      props.onEventRegistrationStateChange(selected.key);
    }
  };

  return (
    <ToggleButtonGroup
      enableUnselectAll={true}
      items={toggleButtonOptions}
      onChange={onToggleButtonOptionChange}
      selected={selectedToggleButtonOption}
    />
  );
};
