import { MultiSelectSection } from "../../../components/multiSelect/multiSelectSection/MultiSelectSection";
import { NumberDisplay } from "../../../components/numberDisplay/NumberDisplay";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { LinkIcon } from "../../../icons/LinkIcon";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import { EventRegistrationList } from "../eventRegistrationList/EventRegistrationList";
import { EventRegistrationSearch } from "../eventRegistrationSearch/EventRegistrationSearch";
import styles from "./EventRegistrationSection.module.scss";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";
import { useEventRegistrationSectionViewModel } from "./useEventRegistrationSectionViewModel";

/**
 * This component is responsible for providing functions to close a registration of an event instance,
 * to call it off, to display and add users and assign or unassign trainers.
 */
export const EventRegistrationSection: React.FC<
  IEventRegistrationSectionProps
> = (props) => {
  const { t } = useTranslation();
  const viewModel = useEventRegistrationSectionViewModel(props);

  return (
    <>
      {viewModel.confirmDialog.content}
      {viewModel.isLoadEventRegistrationRequestProcessing ? (
        <PageSpinner />
      ) : (
        <EventInstanceItem
          eventInstanceItemModel={{
            ...props.eventInstance,
            isMemberOnly: props.isMemberOnly,
          }}
        >
          <div className={styles.buttons}>
            <SecondaryButton onClick={viewModel.onCopyLink}>
              <LinkIcon className={styles.copyLink} />
            </SecondaryButton>
            {props.eventInstance.calledOff === false ? (
              <SecondaryButton
                displaySpinner={viewModel.isCallOffRequestProcessing}
                onClick={viewModel.onCallOff}
              >
                {t(texts.eventRegistrationSection.callOff)}
              </SecondaryButton>
            ) : (
              <SecondaryButton
                displaySpinner={viewModel.isRescheduleRequestProcessing}
                onClick={viewModel.onReschedule}
              >
                {t(texts.eventRegistrationSection.reschedule)}
              </SecondaryButton>
            )}

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

          <MultiSelectSection
            className={styles.trainerMultiSelectSection}
            disabled={props.eventInstance.calledOff}
            label={t(texts.general.trainers)}
            options={viewModel.trainerSelectOptions}
            onChange={viewModel.onSelectedTrainerIdsChange}
            selected={viewModel.selectedTrainerIds}
          />

          <h3 className={styles.title}>
            {t(texts.eventRegistrationSection.checkInUsers)}
            <NumberDisplay value={viewModel.numberEventRegistrations} />
          </h3>
          <EventRegistrationList
            eventRegistrations={viewModel.eventRegistrations}
            onDelete={viewModel.onDelete}
            userTrialTrainings={viewModel.userTrialTrainings}
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
