import { EventInfo } from "../../../services/EventInfo";
import { IEventInstanceItemModel } from "../../../shared/model/IEventInstanceItemModel";
import { EventInstanceItemAligned } from "../../eventInstance/eventInstanceItemAligned/EventInstanceItemAligned";
import { IEventDefinitionItemProps } from "./IEventDefinitionItemProps";

export const EventDefinitionItem: React.FC<IEventDefinitionItemProps> = (
  props
) => {
  const eventDefinition = props.event.eventDefinition;

  const eventInstanceItemModel: IEventInstanceItemModel = {
    color: eventDefinition.color,
    description: eventDefinition.description,
    from: props.event.dateTimeSpan.from,
    id: eventDefinition.id,
    isMemberOnly: eventDefinition.isMemberOnly,
    calledOff: EventInfo.calledOff(props.event),
    title: eventDefinition.title,
    to: props.event.dateTimeSpan.to,
  };

  const onClick = () => props.onSelect?.(props.event);

  return (
    <EventInstanceItemAligned
      eventInstanceItemModel={eventInstanceItemModel}
      renderChildrenInline={true}
      onClick={onClick}
    >
      {props.renderEvent && props.renderEvent(props.event)}
    </EventInstanceItemAligned>
  );
};
