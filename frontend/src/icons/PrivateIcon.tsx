import { ReactComponent as SVG } from "../assets/private.svg";
import { IIconProps } from "./core/IIconProps";
import { Icon } from "./core/Icon";

export const PrivateIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
