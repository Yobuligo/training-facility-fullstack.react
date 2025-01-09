import { useParams } from "react-router-dom";

export const DashboardItem: React.FC = (props) => {
  const params = useParams<{ itemId: string }>();

  // check for invalid tab
  return <>Hello World</>;
};
