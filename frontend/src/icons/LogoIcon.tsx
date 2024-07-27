import { ReactComponent as Icon } from "../assets/logo.svg";
import styles from "./LogoIcon.module.scss";

export const LogoIcon: React.FC = () => {
  return <Icon className={styles.logoIcon} />;
};
