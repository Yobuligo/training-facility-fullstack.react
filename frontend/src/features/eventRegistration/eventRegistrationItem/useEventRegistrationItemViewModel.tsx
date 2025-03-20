import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { CheckIcon } from "../../../icons/CheckIcon";
import { CloseIcon } from "../../../icons/CloseIcon";
import { useConfirmDialog } from "../../../lib/dialogs/hooks/useConfirmDialog";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { UserInfo } from "../../../services/UserInfo";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";
import styles from "./EventRegistrationItem.module.scss";

export const useEventRegistrationItemViewModel = (
  props: IEventRegistrationItemProps
) => {
  const { t } = useTranslation();
  const [updateRequest] = useRequest();
  const confirmDialog = useConfirmDialog();

  const toggleButtonOptions: IToggleButtonOption<EventRegistrationState>[] = [
    {
      key: EventRegistrationState.MISSING,
      text: <CloseIcon className={styles.icon} />,
    },
    {
      key: EventRegistrationState.PRESENT,
      text: <CheckIcon className={styles.icon} />,
    },
  ];

  const selectedToggleButtonOption = toggleButtonOptions.find(
    (toggleButtonOption) =>
      toggleButtonOption.key === props.eventRegistration.state
  );

  const updateEventState = async (eventState: EventRegistrationState) => {
    updateRequest(async () => {
      props.eventRegistration.state = eventState;
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.update(props.eventRegistration);
    });
  };

  const onToggleButtonOptionChange = (
    selected: IToggleButtonOption<EventRegistrationState> | undefined
  ) => {
    // if no toggle button option is selected, return to open state
    // otherwise the selected state
    if (selected === undefined) {
      updateEventState(EventRegistrationState.OPEN);
    } else {
      updateEventState(selected.key);
    }
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
    onToggleButtonOptionChange,
    selectedToggleButtonOption,
    toggleButtonOptions,
  };
};
