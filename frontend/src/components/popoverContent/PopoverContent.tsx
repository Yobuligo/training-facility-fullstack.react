import { HorizontalAlignment } from "../../core/ui/HorizontalAlignment";
import { style } from "../../core/ui/style";
import { Card } from "../card/Card";
import { IPopoverContentProps } from "./IPopoverContentProps";
import styles from "./PopoverContent.module.scss";

export const PopoverContent: React.FC<IPopoverContentProps> = (props) => {
  return (
    <Card
      className={style(
        styles.content,
        props.align === HorizontalAlignment.LEFT
          ? styles.alignLeft
          : styles.alignRight,
        props.className
      )}
    >
      {props.children}
    </Card>
  );
};
