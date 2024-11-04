import { ReactComponent as SVG } from "../assets/info.svg";
import { Icon } from "./core/Icon";
import { IIconProps } from "./core/IIconProps";

export const InfoIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
