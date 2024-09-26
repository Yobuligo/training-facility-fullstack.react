import { DetailView } from "../../components/detailView/DetailView";
import { SpinnerButton } from "../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../components/toolbar/Toolbar";
import { IEventTrialTrainingDetailsProps } from "./IEventTrialTrainingDetailsProps";

export const EventTrialTrainingDetails: React.FC<
  IEventTrialTrainingDetailsProps
> = (props) => {
  return (
    <DetailView onBack={props.onBack}>
      <Toolbar alignRight={true}>
        <SpinnerButton displaySpinner={false}>Send Booking</SpinnerButton>
      </Toolbar>
    </DetailView>
  );
};
