import { Button } from "../button/Button";
import { ISecondaryButtonProps } from "./ISecondaryButtonProps";
import styles from "./SecondaryButton.module.scss";

export const SecondaryButton: React.FC<ISecondaryButtonProps> = (props) => {
  return <Button {...props} className={styles.secondaryButton} />;
};
