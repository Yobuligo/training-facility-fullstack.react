import { ReactComponent as SVG } from "../assets/add.svg";
import { Icon } from "./core/Icon";
import { IIconProps } from "./core/IIconProps";

export const AddIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
