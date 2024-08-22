import styles from "./Banner.module.scss";
import { IBannerProps } from "./IBannerProps";

export const Banner: React.FC<IBannerProps> = (props) => {
  return (
    <div className={styles.banner} style={{ backgroundColor: props.color }} />
  );
};
