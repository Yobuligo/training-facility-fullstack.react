import { useMemo } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { KickTechnique } from "../../shared/types/KickTechnique";

export const useKickTechniqueSelectOption =
  (): ISelectOption<KickTechnique>[] => {
    const { t } = useTranslation();

    const selectOptions = useMemo<ISelectOption<KickTechnique>[]>(
      () => [
        {
          key: KickTechnique.NOT_RELEVANT,
          text: t(texts.kickTechnique.notRelevant),
        },
        {
          key: KickTechnique.AP,
          text: t(texts.kickTechnique.apChagi),
        },
        {
          key: KickTechnique.DOLLYO,
          text: t(texts.kickTechnique.dollyochagi),
        },
        {
          key: KickTechnique.PANDAE,
          text: t(texts.kickTechnique.pandaeChagi),
        },
        {
          key: KickTechnique.BITURO,
          text: t(texts.kickTechnique.bituroChagi),
        },
        {
          key: KickTechnique.YOP,
          text: t(texts.kickTechnique.yopChagi),
        },
        {
          key: KickTechnique.NAERYO,
          text: t(texts.kickTechnique.naeryoChagi),
        },
        {
          key: KickTechnique.DYT,
          text: t(texts.kickTechnique.dytChagi),
        },
      ],
      [t]
    );

    return selectOptions;
  };
