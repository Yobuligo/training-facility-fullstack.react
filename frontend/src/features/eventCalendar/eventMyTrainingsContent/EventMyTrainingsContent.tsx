import { EventRegistrationButton } from "../../eventRegistration/eventRegistrationButton/EventRegistrationButton";
import { EventContent } from "../eventContent/EventContent";
import styles from "./EventMyTrainingsContent.module.scss";
import { IEventMyTrainingsContentProps } from "./IEventMyTrainingsContentProps";

export const EventMyTrainingsContent: React.FC<
  IEventMyTrainingsContentProps
> = (props) => {
  return (
    <EventContent
      className={styles.eventMyTrainingsContent}
      eventDefinition={props.event.eventDefinition}
    >
      <EventRegistrationButton
        event={props.event}
        isRegistered={props.isRegistered}
        onRegister={props.onRegister}
        onUnregister={props.onUnregister}
        userId={props.userId}
      />
    </EventContent>
  );
};
