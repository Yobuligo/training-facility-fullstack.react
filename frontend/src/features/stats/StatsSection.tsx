import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageSpinner } from "../../components/pageSpinner/PageSpinner";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import colors from "../../styles/colors.module.scss";
import { useStatsSectionViewModel } from "./useStatsSectionViewModel";

const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useStatsSectionViewModel();

  return (
    <>
      {viewModel.isLoadStatsProcessing ? (
        <PageSpinner />
      ) : (
        <div
          style={{
            width: "100%",
            margin: "auto",
            height: "200px",
          }}
        >
          <ResponsiveContainer width="100%" height={"100%"}>
            <LineChart
              data={viewModel.chartData?.data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default StatsSection;
