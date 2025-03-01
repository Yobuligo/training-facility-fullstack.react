import { ReactComponent as SVG } from "../assets/chart.svg";
import { Icon } from "./core/Icon";
import { IIconProps } from "./core/IIconProps";

export const ChartIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
