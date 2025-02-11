import { useMemo } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Tariff } from "../../shared/types/Tariff";

export const useTariffSelectOptions = () => {
  const { t } = useTranslation();

  const selectOptions = useMemo<ISelectOption<Tariff>[]>(
    () => [
      { key: Tariff.TEENAGERS_ADULTS, text: t(texts.tariff.teenagersAdults) },
      { key: Tariff.CHILDREN, text: t(texts.tariff.children) },
      {
        key: Tariff.TRAINEES_STUDENTS_PENSIONERS,
        text: t(texts.tariff.traineeStudentsPensioner),
      },
      { key: Tariff.FAMILY_1, text: t(texts.tariff.family1) },
      { key: Tariff.FAMILY_2, text: t(texts.tariff.family2) },
      { key: Tariff.FAMILY_3, text: t(texts.tariff.family3) },
      { key: Tariff.PRINCIPALS, text: t(texts.tariff.principals) },
      { key: Tariff.RELATIVES, text: t(texts.tariff.relatives) },
    ],
    [t]
  );

  return selectOptions;
};
