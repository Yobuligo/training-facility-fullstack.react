import { useState } from "react";
import { Card } from "../../../components/card/Card";
import { Collapse } from "../../../components/collapse/Collapse";
import { IUserProfileGroupProps } from "./IUserProfileGroupProps";
import styles from "./UserProfileGroup.module.scss";

export const UserProfileGroup: React.FC<IUserProfileGroupProps> = (props) => {
  const [collapsed, setCollapsed] = useState(
    props.collapsed !== undefined ? props.collapsed : false
  );

  return (
    <Card className={styles.userProfileGroup}>
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
