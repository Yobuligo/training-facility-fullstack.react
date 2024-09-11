import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import { EventRegistrationList } from "../eventRegistrationList/EventRegistrationList";
import { EventRegistrationSearch } from "../eventRegistrationSearch/EventRegistrationSearch";
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
      {viewModel.isLoadEventRegistrationRequestProcessing ? (
        <PageSpinner />
      ) : (
        <EventInstanceItem eventInstanceItemModel={props.eventInstance}>
          <div className={styles.closeButton}>
            {viewModel.eventInstanceState === EventInstanceState.OPEN ? (
              <SecondaryButton
                onClick={viewModel.onCloseRegistration}
                displaySpinner={
                  viewModel.isUpdateEventInstanceRequestProcessing
                }
              >
                {t(texts.eventRegistrationSection.close)}
              </SecondaryButton>
            ) : (
              <SecondaryButton
                onClick={viewModel.onReopenRegistration}
                displaySpinner={
                  viewModel.isUpdateEventInstanceRequestProcessing
                }
              >
                {t(texts.eventRegistrationSection.open)}
              </SecondaryButton>
            )}
          </div>
          <div className={styles.title}>
            {t(texts.eventRegistrationSection.checkInUsers)}
          </div>
          <EventRegistrationList
            eventRegistrations={viewModel.eventRegistrations}
            onDelete={viewModel.onDelete}
          />
          <EventRegistrationSearch
            className={styles.search}
            onAddUser={viewModel.onAddUser}
          />
        </EventInstanceItem>
      )}
    </>
  );
};
