import { DetailView } from "../../../components/detailView/DetailView";
import { EventRegistrationSection } from "../eventRegistrationSection/EventRegistrationSection";
import { IEventRegistrationDetailsProps } from "./IEventRegistrationDetailsProps";

export const EventRegistrationDetails: React.FC<
  IEventRegistrationDetailsProps
> = (props) => {
  return (
    <DetailView onBack={props.onBack}>
      <EventRegistrationSection
        eventDefinition={props.eventDefinition}
        eventInstance={props.eventInstance}
      />
    </DetailView>
  );
};
