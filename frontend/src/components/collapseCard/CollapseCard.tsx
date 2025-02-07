import { useState } from "react";
import { Card } from "../card/Card";
import { Collapse } from "../collapse/Collapse";
import styles from "./CollapseCard.module.scss";
import { ICollapseCardProps } from "./ICollapseCardProps";

export const CollapseCard: React.FC<ICollapseCardProps> = (props) => {
  const [collapsed, setCollapsed] = useState(
    props.collapsed !== undefined ? props.collapsed : false
  );

  return (
    <Card className={styles.collapseCard}>
      <div className={styles.collapse}>
        <Collapse
          collapsed={collapsed}
          onToggle={props.onToggleCollapse}
          setCollapsed={setCollapsed}
          title={props.title}
          titleClassName={styles.title}
        />
      </div>
      {!collapsed && (
        <div
          className={
            props.className !== undefined ? props.className : styles.group
          }
        >
          {props.children}
        </div>
      )}
    </Card>
  );
};
