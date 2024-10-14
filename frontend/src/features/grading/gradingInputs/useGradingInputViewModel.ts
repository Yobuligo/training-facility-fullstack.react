import { useEffect, useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { Grade } from "../../../shared/types/Grade";
import { IGradingInputsProps } from "./IGradingInputsProps";

export const useGradingInputViewModel = (props: IGradingInputsProps) => {
  const { t } = useTranslation();
  const [achievedAt, setAchievedAt] = useState<Date>(props.achievedAt);
  const [grade, setGrade] = useState<Grade>(props.grade);
  const [examiners, setExaminers] = useState(props.examiners);
  const [place, setPlace] = useState(props.place);

  useEffect(() => {
    if (achievedAt !== props.achievedAt) {
      setAchievedAt(props.achievedAt);
    }

    if (grade !== props.grade) {
      setGrade(props.grade);
    }

    if (examiners !== props.examiners) {
      setExaminers(props.examiners);
    }

    if (place !== props.place) {
      setPlace(props.place);
    }
  }, [achievedAt, examiners, grade, place, props]);

  const gradeOptions: ISelectOption<Grade>[] = useMemo(
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

  const onChangeAchievedAt = (newValue: string) => {
    const achievedAt = new Date(newValue);
    setAchievedAt(achievedAt);
    props.onAchievedAtChange?.(achievedAt);
  };

  const onExaminersChange = (examiners: string) => {
    setExaminers(examiners);
    props.onExaminersChange?.(examiners);
  };

  const onGradeChange = (grade: Grade) => {
    setGrade(grade);
    props.onGradeChange?.(grade);
  };

  const onPlaceChange = (place: string) => {
    setPlace(place);
    props.onPlaceChange?.(place);
  };

  return {
    achievedAt,
    examiners,
    grade,
    gradeOptions,
    onChangeAchievedAt,
    onExaminersChange,
    onGradeChange,
    onPlaceChange,
    place,
  };
};
