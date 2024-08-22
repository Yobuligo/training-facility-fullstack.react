import { Spinner } from "../../../components/spinner/Spinner";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import { EventRegistrationList } from "../eventRegistrationList/EventRegistrationList";
import styles from "./EventRegistrationSection.module.scss";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";
import { useEventRegistrationSectionViewModel } from "./useEventRegistrationSectionViewModel";

export const EventRegistrationSection: React.FC<
  IEventRegistrationSectionProps
> = (props) => {
  const { t } = useTranslation();
  const viewModel = useEventRegistrationSectionViewModel(props);

  return (
    <>
      {viewModel.loadEventRegistrationRequest.isLoading ? (
        <Spinner />
      ) : (
        <EventInstanceItem eventInstance={props.eventInstance}>
          <div className={styles.title}>
            {t(texts.eventRegistrationSection.checkInUsers)}
          </div>
          <EventRegistrationList
            eventRegistrations={viewModel.eventRegistrations}
          />
        </EventInstanceItem>
      )}
    </>
  );
};
