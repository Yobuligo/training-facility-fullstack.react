import { Spinner } from "../../components/spinner/Spinner";
import { Error } from "../error/Error";
import { User } from "../users/user/User";
import { useMyProfileViewModel } from "./useMyProfileViewModel";

export const MyProfile: React.FC = () => {
  const viewModel = useMyProfileViewModel();

  return (
    <div>
      {viewModel.error && <Error message={viewModel.error} />}
      {viewModel.isLoadUserProfileRequestProcessing && <Spinner />}
      {viewModel.userProfile && (
        <User
          isAdminMode={false}
          onChange={viewModel.onChange}
          user={viewModel.userProfile!}
        />
      )}
    </div>
  );
};
