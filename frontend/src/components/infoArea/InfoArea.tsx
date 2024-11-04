import { HorizontalAlignment } from "../../core/ui/HorizontalAlignment";
import { InfoIcon } from "../../icons/InfoIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { IInfoAreaProps } from "./IInfoAreaProps";
import styles from "./InfoArea.module.scss";

/**
 * This component is responsible for displaying an info icon at the right side and providing a text when hovering over the icon.
 */
export const InfoArea: React.FC<IInfoAreaProps> = (props) => {
  return (
    <div className={styles.infoArea}>
      <Tooltip align={HorizontalAlignment.LEFT} text={props.text}>
        <InfoIcon />
      </Tooltip>
    </div>
  );
};
