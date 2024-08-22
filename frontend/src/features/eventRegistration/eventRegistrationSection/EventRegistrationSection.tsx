import { Spinner } from "../../../components/spinner/Spinner";
import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import { EventRegistrationList } from "../eventRegistrationList/EventRegistrationList";
import styles from "./EventRegistrationSection.module.scss";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";
import { useEventRegistrationSectionViewModel } from "./useEventRegistrationSectionViewModel";

export const EventRegistrationSection: React.FC<
  IEventRegistrationSectionProps
> = (props) => {
  const viewModel = useEventRegistrationSectionViewModel(props);

  return (
    <>
      {viewModel.loadEventRegistrationRequest.isLoading ? (
        <Spinner />
      ) : (
        <EventInstanceItem eventInstance={props.eventInstance}>
          <div className={styles.title}>Registered users</div>
          <EventRegistrationList
            eventRegistrations={viewModel.eventRegistrations}
          />
        </EventInstanceItem>
      )}
    </>
  );
};
