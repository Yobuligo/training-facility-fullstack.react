import { IPageProps } from "./IPageProps";
import styles from "./Page.module.scss";

export const Page: React.FC<IPageProps> = (props) => {
  return (
    <div className={props.className ? props.className : styles.page}>
      {props.children}
    </div>
  );
};
