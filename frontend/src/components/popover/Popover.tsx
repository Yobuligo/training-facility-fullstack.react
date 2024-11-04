import React, { useState } from "react";
import { HorizontalAlignment } from "../../core/ui/HorizontalAlignment";
import { style } from "../../core/ui/style";
import { Card } from "../card/Card";
import { IPopoverProps } from "./IPopoverProps";
import styles from "./Popover.module.scss";

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
        <Card
          className={style(
            styles.content,
            props.align === HorizontalAlignment.LEFT
              ? styles.alignLeft
              : styles.alignRight
          )}
        >
          {props.content}
        </Card>
      )}
    </span>
  );
};
