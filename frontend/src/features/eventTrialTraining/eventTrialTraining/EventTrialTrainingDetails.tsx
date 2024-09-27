import { DetailView } from "../../../components/detailView/DetailView";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import styles from "./EventTrialTrainingDetails.module.scss";
import { IEventTrialTrainingDetailsProps } from "./IEventTrialTrainingDetailsProps";
import { useEventTrialTrainingDetailsViewModel } from "./useEventTrialTrainingDetailsViewModel";

export const EventTrialTrainingDetails: React.FC<
  IEventTrialTrainingDetailsProps
> = (props) => {
  const viewModel = useEventTrialTrainingDetailsViewModel(props);
  const { t } = useTranslation();

  return (
    <DetailView onBack={props.onBack}>
      {viewModel.isFetchEventInstanceRequestProcessing ? (
        <PageSpinner />
      ) : (
        <>
          {viewModel.eventInstance && (
            <>
              <h3>{t(texts.trialTrainingContent.bookTrialTraining)}</h3>
              <EventInstanceItem
                eventInstanceItemModel={{
                  color: props.event.eventDefinition.color,
                  from: checkNotNull(props.event.start),
                  to: checkNotNull(props.event.end),
                  id: props.event.eventDefinition.id,
                  title: props.event.eventDefinition.title,
                }}
              >
                {viewModel.booked ? (
                  <p className={styles.bookingConfirmation}>
                    {t(texts.trialTrainingContent.bookingConfirmation)}
                  </p>
                ) : (
                  <>
                    <p>{t(texts.trialTrainingContent.description)}</p>
                    <form
                      className={styles.eventTrialTrainingDetails}
                      onChange={viewModel.onFormChange}
                    >
                      <LabeledInput
                        label={t(texts.user.firstname)}
                        maxLength={50}
                        onChange={viewModel.setFirstname}
                        value={viewModel.firstname}
                      />

                      <LabeledInput
                        label={t(texts.user.lastname)}
                        maxLength={50}
                        onChange={viewModel.setLastname}
                        value={viewModel.lastname}
                      />

                      <div className={styles.email}>
                        <LabeledInput
                          error={viewModel.emailError}
                          label={t(texts.user.email)}
                          maxLength={255}
                          onChange={viewModel.setEmail}
                          value={viewModel.email}
                        />
                      </div>
                    </form>
                    <Toolbar alignRight={true}>
                      <SpinnerButton
                        disabled={!viewModel.isFilledOut()}
                        displaySpinner={
                          viewModel.isInsertUserTrialTrainingRequestProcessing
                        }
                        onClick={viewModel.onSendBooking}
                      >
                        {t(texts.trialTrainingContent.sendBooking)}
                      </SpinnerButton>
                    </Toolbar>
                  </>
                )}
              </EventInstanceItem>
            </>
          )}
        </>
      )}
    </DetailView>
  );
};
