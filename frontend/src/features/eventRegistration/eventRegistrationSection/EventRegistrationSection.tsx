import { EventRegistrationList } from "../eventRegistrationList/EventRegistrationList";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";
import { useEventRegistrationSectionViewModel } from "./useEventRegistrationSectionViewModel";

export const EventRegistrationSection: React.FC<
  IEventRegistrationSectionProps
> = (props) => {
  const viewModel = useEventRegistrationSectionViewModel(props);

  return (
    <EventRegistrationList eventRegistrations={viewModel.eventRegistrations} />
  );
};
