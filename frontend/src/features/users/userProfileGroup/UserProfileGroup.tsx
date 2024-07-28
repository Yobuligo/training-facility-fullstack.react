import { useState } from "react";
import { Card } from "../../../components/card/Card";
import { Collapse } from "../../../components/collapse/Collapse";
import { IUserProfileGroupProps } from "./IUserProfileGroupProps";
import styles from "./UserProfileGroup.module.scss";

export const UserProfileGroup: React.FC<IUserProfileGroupProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Card className={styles.userProfileGroup}>
      <div className={styles.groupHeadline}>
        <h4>{props.title}</h4>
        <Collapse collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      {!collapsed && <div className={styles.group}>{props.children}</div>}
    </Card>
  );
};
