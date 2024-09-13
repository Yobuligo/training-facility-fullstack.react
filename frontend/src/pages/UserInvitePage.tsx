import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { UserInvite } from "../features/users/userInvite/UserInvite";

export const UserInvitePage: React.FC = () => {
  return (
    <PublicPage>
      <UserInvite />
    </PublicPage>
  );
};
