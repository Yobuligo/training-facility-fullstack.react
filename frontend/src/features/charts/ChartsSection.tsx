import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageSpinner } from "../../components/pageSpinner/PageSpinner";
import { SecondaryButton } from "../../components/secondaryButton/SecondaryButton";
import { Toolbar } from "../../components/toolbar/Toolbar";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import colors from "../../styles/colors.module.scss";
import styles from "./StatsSection.module.scss";
import { useStatsSectionViewModel } from "./useStatsSectionViewModel";

const ChartsSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useStatsSectionViewModel();

  return (
    <div className={styles.statsSection}>
      <Toolbar>
        <SecondaryButton onClick={viewModel.onSelectYear}>
          {t(texts.calendar.year)}
        </SecondaryButton>
        <SecondaryButton onClick={viewModel.onSelectMax}>
          {t(texts.calendar.max)}
        </SecondaryButton>
      </Toolbar>
      {viewModel.isLoadStatsRequestProcessing ? (
        <PageSpinner />
      ) : (
        <ResponsiveContainer width="100%" height={"100%"}>
          <LineChart
            data={viewModel.chartData?.data}
            margin={{ left: -25, right: 10, top: 10 }}
          >
            <CartesianGrid
              strokeDasharray="1 5"
              stroke={colors.colorSecondary}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="value"
              stroke={colors.colorPrimary}
              strokeWidth={1}
              dot={{ fill: colors.colorPrimary, r: 2 }}
              name={t(texts.stats.activeMembers)}
            >
              <LabelList dataKey="value" position="top" />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartsSection;
