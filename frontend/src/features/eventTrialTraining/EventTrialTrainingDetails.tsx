import { DetailView } from "../../components/detailView/DetailView";
import { IEventTrialTrainingDetailsProps } from "./IEventTrialTrainingDetailsProps";

export const EventTrialTrainingDetails: React.FC<
  IEventTrialTrainingDetailsProps
> = (props) => {
  return <DetailView onBack={props.onBack}>Hello World</DetailView>;
};
