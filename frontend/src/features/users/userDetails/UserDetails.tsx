import { DetailView } from "../../../components/detailView/DetailView";
import { useSignal } from "../../../hooks/useSignal";
import { User } from "../user/User";
import { IUserDetails } from "./IUserDetails";

/**
 * This component is responsible for displaying a user and provides an icon to navigate back.
 */
export const UserDetails: React.FC<IUserDetails> = (props) => {
  const [cancelSignal, triggerCancelSignal] = useSignal();

  const onBack = () => {
    triggerCancelSignal();
    props.onBack?.(props.user);
  };

  return (
    <DetailView onBack={onBack}>
      <User
        cancelSignal={cancelSignal}
        isAdminMode={props.isAdminMode}
        onUnlock={props.onUnlock}
        onCancel={props.onCancel}
        onSave={props.onSave}
        onLock={props.onLock}
        onDelete={props.onDelete}
        user={props.user}
      />
    </DetailView>
  );
};
