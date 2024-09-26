import { DetailView } from "../../components/detailView/DetailView";
import { LabeledInput } from "../../components/labeledInput/LabeledInput";
import { SpinnerButton } from "../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../components/toolbar/Toolbar";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { EventInstanceItem } from "../eventInstance/eventInstanceItem/EventInstanceItem";
import styles from "./EventTrialTrainingDetails.module.scss";
import { IEventTrialTrainingDetailsProps } from "./IEventTrialTrainingDetailsProps";

export const EventTrialTrainingDetails: React.FC<
  IEventTrialTrainingDetailsProps
> = (props) => {
  const { t } = useTranslation();

  return (
    <DetailView onBack={props.onBack}>
      <h3>Book a trial training</h3>

      <EventInstanceItem
        eventInstanceItemModel={{
          color: props.event.eventDefinition.color,
          from: checkNotNull(props.event.start),
          to: checkNotNull(props.event.end),
          id: props.event.eventDefinition.id,
          title: props.event.eventDefinition.title,
        }}
      >
        <p>
          Melde dich hier für dieses kostenlose Probetraining an. Wir schicken
          dir eine E-Mail mit weiteren Details zum Training. Datum und Uhrzeit
        </p>
        <div className={styles.eventTrialTrainingDetails}>
          <LabeledInput label="Firstname" />
          <LabeledInput label="Lastname" />
          <div className={styles.email}>
            <LabeledInput label="Email" />
          </div>
        </div>
        <Toolbar alignRight={true}>
          <SpinnerButton displaySpinner={false}>
            {t(texts.trialTrainingContent.sendBooking)}
          </SpinnerButton>
        </Toolbar>
      </EventInstanceItem>
    </DetailView>
  );
};
