import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import { IEventInstanceItemModel } from "../../eventInstance/eventInstanceItem/IEventInstanceItemModel";
import styles from "./EventDefinitionItem.module.scss";
import { IEventDefinitionItemProps } from "./IEventDefinitionItemProps";

export const EventDefinitionItem: React.FC<IEventDefinitionItemProps> = (
  props
) => {
  const eventInstanceItemModel: IEventInstanceItemModel = {
    color: props.eventDefinition.color,
    from: props.eventDefinition.from,
    id: props.eventDefinition.id,
    title: props.eventDefinition.title,
    to: props.eventDefinition.to,
  };

  return (
    <EventInstanceItem
      classNameChildren={styles.children}
      eventInstanceItemModel={eventInstanceItemModel}
      renderChildrenInline={true}
    >
      <SpinnerButton displaySpinner={false}>Register</SpinnerButton>
    </EventInstanceItem>
  );
};
