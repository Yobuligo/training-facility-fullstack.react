import { Popover } from "../popover/Popover";
import { ITooltipProps } from "./ITooltipProps";
import styles from "./Tooltip.module.scss";

export const Tooltip: React.FC<ITooltipProps> = (props) => {
  return (
    <Popover
      align={props.align}
      content={<div className={styles.tooltip}>{props.text}</div>}
    >
      {props.children}
    </Popover>
  );
};
