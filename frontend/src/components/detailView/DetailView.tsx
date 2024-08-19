import { ArrowBackIcon } from "../../icons/ArrowBackIcon";
import componentStyles from "../../styles/components.module.scss";
import styles from "./DetailView.module.scss";
import { IDetailViewProps } from "./IDetailViewProps";

/**
 * This component is responsible for displaying details in a screen with a back button
 */
export const DetailView: React.FC<IDetailViewProps> = (props) => {
  return (
    <div className={styles.detailView}>
      <ArrowBackIcon
        className={componentStyles.clickableIcon}
        onClick={props.onBack}
      />
      {props.children}
    </div>
  );
};
