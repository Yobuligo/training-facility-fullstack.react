import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { Dashboard } from "../features/dashboard/Dashboard";

export const DashboardPage: React.FC = () => {
  return (
    <ProtectedPage>
      <Dashboard />
    </ProtectedPage>
  );
};
