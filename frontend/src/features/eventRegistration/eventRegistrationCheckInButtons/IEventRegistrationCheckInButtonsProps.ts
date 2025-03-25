import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";

export interface IEventRegistrationCheckInButtonsProps {
  /**
   * Provides the initial event registration state
   */
  eventRegistrationState: EventRegistrationState;

  onEventRegistrationStateChange: (
    eventRegistrationState: EventRegistrationState
  ) => void;
}
