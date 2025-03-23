import React, { useState } from "react";
import { IPopoverProps } from "./IPopoverProps";
import styles from "./Popover.module.scss";
import { PopoverContent } from "../popoverContent/PopoverContent";

export const Popover: React.FC<IPopoverProps> = (props) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <span
      className={styles.tooltipContainer}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {props.children}
      {visible && (
        <PopoverContent align={props.align} className={styles.content}>
          {props.content}
        </PopoverContent>
      )}
    </span>
  );
};
