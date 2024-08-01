import { ReactComponent as SVG } from "../assets/logo.svg";
import { IIconProps } from "./core/IIconProps";
import { Icon } from "./core/Icon";

export const AppLogo: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
