import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import Chart from "../../../components/chart/Chart";
import { useTariffMemberChartViewModel } from "./useTariffMemberChartViewModel";

export const TariffMemberChart: React.FC = () => {
  const viewMode = useTariffMemberChartViewModel();

  const data = [
    { name: "Apples", value: 400 },
    { name: "Bananas", value: 300 },
    { name: "Cherries", value: 300 },
    { name: "Grapes", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Farben für die Slices

  return (
    <Chart isLoading={false}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Chart>
  );
};
