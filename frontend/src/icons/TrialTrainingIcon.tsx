import { ReactComponent as Icon } from "../assets/trial-training.svg";
import { IIconProps } from "./core/IIconProps";

export const TrialTrainingIcon: React.FC<IIconProps> = (props) => {
  return <Icon className={props.className} onClick={props.onClick} />;
};
