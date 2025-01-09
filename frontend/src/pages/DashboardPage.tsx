import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { Dashboard } from "../features/dashboard/dashboard/Dashboard";
import { useSignal } from "../hooks/useSignal";

export const DashboardPage: React.FC = () => {
  const [appLogoClickSignal, triggerAppLogoClickSignal] = useSignal();

  const onAppLogoClick = () => triggerAppLogoClickSignal();

  return (
    <ProtectedPage onAppLogoClick={onAppLogoClick}>
      <Dashboard displayWelcomeSignal={appLogoClickSignal} />
    </ProtectedPage>
  );
};
