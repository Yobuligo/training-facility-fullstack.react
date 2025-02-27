import { ResponsiveContainer } from "recharts";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { SecondaryButton } from "../secondaryButton/SecondaryButton";
import { Toolbar } from "../toolbar/Toolbar";
import styles from "./Chart.module.scss";
import { IChartProps } from "./IChartProps";

const Chart: React.FC<IChartProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.statsSection}>
      <Toolbar>
        <SecondaryButton onClick={props.onSelectYear}>
          {t(texts.calendar.year)}
        </SecondaryButton>
        <SecondaryButton onClick={props.onSelectMax}>
          {t(texts.calendar.max)}
        </SecondaryButton>
      </Toolbar>

      <ResponsiveContainer width="100%" height={"100%"}>
        {props.children}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
