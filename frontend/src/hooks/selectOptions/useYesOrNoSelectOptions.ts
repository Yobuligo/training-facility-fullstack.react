import { useMemo } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";

/**
 * This hook is responsible for returning the select options to select Yes or No.
 */
export const useYesOrNoSelectOptions = () => {
  const { t } = useTranslation();

  const selectOptions: ISelectOption<boolean>[] = useMemo(
    () => [
      { key: true, text: t(texts.general.yes) },
      { key: false, text: t(texts.general.no) },
    ],
    [t]
  );

  return selectOptions;
};
