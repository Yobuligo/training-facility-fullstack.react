import { useMemo } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Gender } from "../../shared/types/Gender";

export const useGenderSelectOptions = () => {
  const { t } = useTranslation();

  const selectOptions = useMemo<ISelectOption<Gender>[]>(
    () => [
      { key: Gender.FEMALE, text: t(texts.general.female) },
      { key: Gender.MALE, text: t(texts.general.male) },
    ],
    [t]
  );

  return selectOptions;
};
