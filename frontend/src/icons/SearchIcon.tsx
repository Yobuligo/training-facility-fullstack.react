import { ReactComponent as Icon } from "../assets/search.svg";
import { IIconProps } from "./IIconProps";

export const SearchIcon: React.FC<IIconProps> = (props) => {
  return <Icon className={props.className} onClick={props.onClick} />;
};
