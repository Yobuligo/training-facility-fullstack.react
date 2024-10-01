import { useState } from "react";
import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import { IEventInstanceItemModel } from "../../eventInstance/eventInstanceItem/IEventInstanceItemModel";
import { EventRegistrationButton } from "../../eventRegistration/eventRegistrationButton/EventRegistrationButton";
import styles from "./EventDefinitionItem.module.scss";
import { IEventDefinitionItemProps } from "./IEventDefinitionItemProps";

export const EventDefinitionItem: React.FC<IEventDefinitionItemProps> = (
  props
) => {
  const [isRegistered, setIsRegistered] = useState(props.isRegistered);
  const eventDefinition = props.event.eventDefinition;

  const eventInstanceItemModel: IEventInstanceItemModel = {
    color: eventDefinition.color,
    from: eventDefinition.from,
    id: eventDefinition.id,
    title: eventDefinition.title,
    to: eventDefinition.to,
  };

  const onRegister = () => setIsRegistered(true);

  const onUnRegister = () => setIsRegistered(false);

  return (
    <EventInstanceItem
      classNameChildren={styles.children}
      eventInstanceItemModel={eventInstanceItemModel}
      renderChildrenInline={true}
    >
      <EventRegistrationButton
        event={props.event}
        isRegistered={isRegistered}
        onRegister={onRegister}
        onUnregister={onUnRegister}
        userId={props.userId}
      />
    </EventInstanceItem>
  );
};
