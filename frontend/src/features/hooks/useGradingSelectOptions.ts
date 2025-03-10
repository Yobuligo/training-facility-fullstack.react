import { useMemo } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Grade } from "../../shared/types/Grade";

export const useGradingSelectOptions = () => {
  const { t } = useTranslation();

  const selectOptions = useMemo<ISelectOption<Grade>[]>(
    () => [
      { key: Grade.KUP9, text: t(texts.grads.kup9) },
      { key: Grade.KUP8, text: t(texts.grads.kup8) },
      { key: Grade.KUP7, text: t(texts.grads.kup7) },
      { key: Grade.KUP6, text: t(texts.grads.kup6) },
      { key: Grade.KUP5, text: t(texts.grads.kup5) },
      { key: Grade.KUP4, text: t(texts.grads.kup4) },
      { key: Grade.KUP3, text: t(texts.grads.kup3) },
      { key: Grade.KUP2, text: t(texts.grads.kup2) },
      { key: Grade.KUP1, text: t(texts.grads.kup1) },
      { key: Grade.DAN1, text: t(texts.grads.dan1) },
      { key: Grade.DAN2, text: t(texts.grads.dan2) },
      { key: Grade.DAN3, text: t(texts.grads.dan3) },
      { key: Grade.DAN4, text: t(texts.grads.dan4) },
      { key: Grade.DAN5, text: t(texts.grads.dan5) },
      { key: Grade.DAN6, text: t(texts.grads.dan6) },
      { key: Grade.DAN7, text: t(texts.grads.dan7) },
    ],
    [t]
  );

  return selectOptions;
};
