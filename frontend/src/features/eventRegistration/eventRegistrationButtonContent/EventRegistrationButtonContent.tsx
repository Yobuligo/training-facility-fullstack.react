import { DateTime } from "../../../core/services/date/DateTime";
import { EventContent } from "../../eventCalendar/eventContent/EventContent";
import { EventRegistrationButton } from "../eventRegistrationButton/EventRegistrationButton";
import { IEventRegistrationButtonContentProps } from "./IEventRegistrationButtonContentProps";

/**
 * This component is responsible to display an event registration button as event content.
 * It checks if the event has already passed and shouldn't be displayed.
 */
export const EventRegistrationButtonContent: React.FC<
  IEventRegistrationButtonContentProps
> = (props) => {
  return (
    <>
      {props.event.dateTimeSpan.from &&
        DateTime.isAfter(props.event.dateTimeSpan.from) && (
          <EventContent>
            <EventRegistrationButton
              event={props.event}
              isRegistered={props.isRegistered}
              onRegister={props.onRegister}
              onUnregister={props.onUnregister}
              userId={props.userId}
            />
          </EventContent>
        )}
    </>
  );
};
