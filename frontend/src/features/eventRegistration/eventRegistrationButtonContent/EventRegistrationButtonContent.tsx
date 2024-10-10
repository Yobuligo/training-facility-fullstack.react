import { DateTime } from "../../../core/services/date/DateTime";
import { EventContent } from "../../eventCalendar/eventContent/EventContent";
import { EventRegistrationButton } from "../eventRegistrationButton/EventRegistrationButton";
import { IEventRegistrationButtonContentProps } from "./IEventRegistrationButtonContentProps";

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
