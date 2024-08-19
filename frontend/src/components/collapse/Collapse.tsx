import { CollapsedIcon } from "../../icons/CollapsedIcon";
import { ExpandedIcon } from "../../icons/ExpandedIcon";
import componentStyles from "../../styles/components.module.scss";
import styles from "./Collapse.module.scss";
import { ICollapseProps } from "./ICollapseProps";

export const Collapse: React.FC<ICollapseProps> = (props) => {
  const onToggleCollapsed = () =>
    props.setCollapsed((previous) => {
      previous = !previous;
      props.onToggle?.(previous);
      return previous;
    });

  return (
    <button className={styles.collapse}>
      {props.collapsed ? (
        <ExpandedIcon
          className={componentStyles.clickableIcon}
          onClick={onToggleCollapsed}
        />
      ) : (
        <CollapsedIcon
          className={componentStyles.clickableIcon}
          onClick={onToggleCollapsed}
        />
      )}
    </button>
  );
};
