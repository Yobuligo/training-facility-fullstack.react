import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { useConfirmDialog } from "../../../lib/dialogs/hooks/useConfirmDialog";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { UserInfo } from "../../../services/UserInfo";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";

export const useEventRegistrationItemViewModel = (
  props: IEventRegistrationItemProps
) => {
  const { t } = useTranslation();
  const [updateRequest] = useRequest();
  const confirmDialog = useConfirmDialog();

  const updateEventState = async (eventState: EventRegistrationState) => {
    updateRequest(async () => {
      props.eventRegistration.state = eventState;
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.update(props.eventRegistration);
    });
  };

  const onDelete = () =>
    confirmDialog.show(
      t(texts.eventRegistrationItem.deleteTitle),
      t(texts.eventRegistrationItem.deleteQuestion, {
        user: UserInfo.toFullName(props.eventRegistration.user?.userProfile),
      }),
      {
        onOkay: () => props.onDelete?.(props.eventRegistration),
      }
    );

  return {
    confirmDialog,
    onDelete,
    updateEventState,
  };
};
