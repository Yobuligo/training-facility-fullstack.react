import { Spinner } from "../../components/spinner/Spinner";
import { Error } from "../error/Error";
import { UserProfile } from "../users/userProfile/UserProfile";
import { useMyProfileViewModel } from "./useMyProfileViewModel";

export const MyProfile: React.FC = () => {
  const viewModel = useMyProfileViewModel();

  return (
    <div>
      {viewModel.error && <Error message={viewModel.error} />}
      {viewModel.loadUserProfileRequest.isProcessing && <Spinner />}
      {viewModel.userProfile && (
        <UserProfile
          isAdminMode={false}
          onChange={viewModel.onChange}
          userProfile={viewModel.userProfile!}
        />
      )}
    </div>
  );
};
