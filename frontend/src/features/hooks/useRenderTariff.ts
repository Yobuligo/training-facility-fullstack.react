import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Tariff } from "../../shared/types/Tariff";

/**
 * This hook is responsible for rendering a {@link Tariff} to text.
 */
export const useRenderTariff = () => {
  const { t } = useTranslation();

  const render = (tariff: Tariff): string => {
    switch (tariff) {
      case Tariff.CHILDREN:
        return t(texts.tariff.children);
      case Tariff.FAMILY_1:
        return t(texts.tariff.family1);
      case Tariff.FAMILY_2:
        return t(texts.tariff.family2);
      case Tariff.FAMILY_3:
        return t(texts.tariff.family3);
      case Tariff.PRINCIPALS:
        return t(texts.tariff.principals);
      case Tariff.RELATIVES:
        return t(texts.tariff.relatives);
      case Tariff.TEENAGERS_ADULTS:
        return t(texts.tariff.teenagersAdults);
      case Tariff.TRAINEES_STUDENTS_PENSIONERS:
        return t(texts.tariff.traineeStudentsPensioner);
    }
  };

  return render;
};
