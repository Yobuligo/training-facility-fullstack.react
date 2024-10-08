import { Link } from "react-router-dom";
import { AppLogo } from "../../icons/AppLogo";
import { AppRoutes } from "../../routes/AppRoutes";
import styles from "./Error.module.scss";

export const Error: React.FC = () => {
  return (
    <div className={styles.error}>
      <AppLogo className={styles.logo} />
      <div className={styles.h1}>Sorry, something went wrong :(</div>
      <div className={styles.h2}>Sometimes this even happens to us.</div>
      <div className={styles.h3}>
        {`Please `}
        <Link to={AppRoutes.dashboard.toPath()}>reload</Link>
        {` page`}
      </div>
      <div>
        <div>{`If the problem persists, please contact us at `}</div>
        <div className={styles.link}>
          <a href="mailto:info@yeoljeong-taekwondo.com">
            info@yeoljeong-taekwondo.com
          </a>
        </div>
      </div>
    </div>
  );
};
