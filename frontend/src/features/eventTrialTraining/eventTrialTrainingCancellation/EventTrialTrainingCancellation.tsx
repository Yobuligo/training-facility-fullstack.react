import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInstanceItem } from "../../eventInstance/eventInstanceItem/EventInstanceItem";
import styles from "./EventTrialTrainingCancellation.module.scss";
import { useEventTrialTrainingCancellation } from "./useEventTrialTrainingCancellation";

export const EventTrialTrainingCancellation: React.FC = () => {
  const viewModel = useEventTrialTrainingCancellation();
  const { t } = useTranslation();

  return (
    <>
      {viewModel.isLoadUserTrialTrainingDetailsRequestProcessing ? (
        <PageSpinner />
      ) : (
        <div className={styles.eventTrialTrainingCancellation}>
          {viewModel.userTrialTrainingDetails && (
            <EventInstanceItem
              eventInstanceItemModel={
                viewModel.userTrialTrainingDetails.eventInstance
              }
            >
              <p className={styles.cancelConfirmation}>
                {t(texts.eventTrialTrainingCancellation.cancelQuestion)}
              </p>
              <Toolbar alignRight={true}>
                <SpinnerButton
                  displaySpinner={
                    viewModel.isCancelUserTrialTrainingRequestProcessing
                  }
                  onClick={viewModel.onCancelUserTrialTraining}
                >
                  {t(texts.eventTrialTrainingCancellation.cancelTrialTraining)}
                </SpinnerButton>
              </Toolbar>
            </EventInstanceItem>
          )}
        </div>
      )}
    </>
  );
};
