import { ReactComponent as SVG } from "../assets/gifts.svg";
import { Icon } from "./core/Icon";
import { IIconProps } from "./core/IIconProps";

export const GiftsIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
