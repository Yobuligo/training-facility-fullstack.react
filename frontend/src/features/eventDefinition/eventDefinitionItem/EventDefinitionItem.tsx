import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import { IEventInstanceItemModel } from "../../eventInstance/eventInstanceItem/IEventInstanceItemModel";
import { EventRegistrationButton } from "../../eventRegistration/eventRegistrationButton/EventRegistrationButton";
import styles from "./EventDefinitionItem.module.scss";
import { IEventDefinitionItemProps } from "./IEventDefinitionItemProps";

export const EventDefinitionItem: React.FC<IEventDefinitionItemProps> = (
  props
) => {
  const eventDefinition = props.event.eventDefinition;

  const eventInstanceItemModel: IEventInstanceItemModel = {
    color: eventDefinition.color,
    from: props.event.dateTimeSpan.from,
    id: eventDefinition.id,
    title: eventDefinition.title,
    to: props.event.dateTimeSpan.to,
  };

  const onClick = () => props.onSelect?.(props.event);

  return (
    <EventInstanceItem
      classNameChildren={styles.children}
      eventInstanceItemModel={eventInstanceItemModel}
      renderChildrenInline={true}
      onClick={onClick}
    >
      <EventRegistrationButton
        event={props.event}
        isRegistered={props.isRegistered}
        onRegister={props.onRegister}
        onUnregister={props.onUnregister}
        userId={props.userId}
      />
    </EventInstanceItem>
  );
};
