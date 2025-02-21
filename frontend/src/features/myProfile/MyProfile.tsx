import { PageSpinner } from "../../components/pageSpinner/PageSpinner";
import { Error } from "../error/Error";
import { User } from "../users/user/User";
import { useMyProfileViewModel } from "./useMyProfileViewModel";

const MyProfile: React.FC = () => {
  const viewModel = useMyProfileViewModel();

  return (
    <div>
      {viewModel.error && <Error message={viewModel.error} />}
      {viewModel.isLoadUserProfileRequestProcessing ? (
        <PageSpinner />
      ) : (
        viewModel.user && (
          <User
            isAdminMode={false}
            onSave={viewModel.onSave}
            user={viewModel.user!}
          />
        )
      )}
    </div>
  );
};

export default MyProfile;
