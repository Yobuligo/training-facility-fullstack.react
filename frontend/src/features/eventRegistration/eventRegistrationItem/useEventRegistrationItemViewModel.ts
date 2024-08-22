import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";

export const useEventRegistrationItemViewModel = (
  props: IEventRegistrationItemProps
) => {
  const { t } = useTranslation();

  const toggleButtonOptions: IToggleButtonOption<number>[] = [
    { key: 1, text: t(texts.eventRegistrationItem.missing) },
    { key: 2, text: t(texts.eventRegistrationItem.present) },
  ];

  return { toggleButtonOptions };
};
