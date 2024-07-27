import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { Administration } from "../features/administration/Administration";

export const StartPage: React.FC = () => {
  return (
    <ProtectedPage>
      <Administration />
    </ProtectedPage>
  );
};
