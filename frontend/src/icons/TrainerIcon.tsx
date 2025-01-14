import { ReactComponent as Icon } from "../assets/trainer.svg";
import { IIconProps } from "./core/IIconProps";

export const TrainerIcon: React.FC<IIconProps> = (props) => {
  return <Icon className={props.className} onClick={props.onClick} />;
};
