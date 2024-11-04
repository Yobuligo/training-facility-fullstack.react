import React, { useState } from "react";
import { Card } from "../card/Card";
import { IPopoverProps } from "./IPopoverProps";
import styles from "./Popover.module.scss";

export const Popover: React.FC<IPopoverProps> = (props) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {props.children}
      {visible && <Card className={styles.content}>{props.content}</Card>}
    </div>
  );
};
