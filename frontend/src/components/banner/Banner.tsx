import { style } from "../../core/ui/style";
import styles from "./Banner.module.scss";
import { IBannerProps } from "./IBannerProps";

export const Banner: React.FC<IBannerProps> = (props) => {
  return (
    <div
      className={style(styles.banner, props.className)}
      style={{ backgroundColor: props.color }}
    />
  );
};
