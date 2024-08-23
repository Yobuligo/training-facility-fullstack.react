import { useState } from "react";
import { Collapse } from "../../../components/collapse/Collapse";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { style } from "../../../utils/style";
import { UserSearchSection } from "../../users/userSearch/userSearchSection/UserSearchSection";
import styles from "./EventRegistrationSearch.module.scss";
import { IEventRegistrationSearchProps } from "./IEventRegistrationSearchProps";

export const EventRegistrationSearch: React.FC<
  IEventRegistrationSearchProps
> = (props) => {
  const { t } = useTranslation();
  const [searchCollapsed, setSearchCollapsed] = useState(true);

  return (
    <div className={style(styles.eventRegistrationSearch, props.className)}>
      <Collapse
        collapsed={searchCollapsed}
        setCollapsed={setSearchCollapsed}
        title={t(texts.eventRegistrationSearch.addUsers)}
        titleClassName={styles.collapse}
      />
      {!searchCollapsed && (
        <UserSearchSection onSelect={props.onAddUserProfile} />
      )}
    </div>
  );
};
