import { ReactComponent as Icon } from "../assets/link.svg";
import { IIconProps } from "./core/IIconProps";

export const LinkIcon: React.FC<IIconProps> = (props) => {
  return <Icon className={props.className} onClick={props.onClick} />;
};
