import { useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { Grade } from "../../../shared/types/Grade";
import { IGradingAddFormProps } from "./IGradingAddFormProps";

export const useGradingAddFormViewModel = (props: IGradingAddFormProps) => {
  const { t } = useTranslation();
  const [achievedAt, setAchievedAt] = useState<Date>(new Date());
  const [grade, setGrade] = useState<Grade>(Grade.KUP9);
  const [examiners, setExaminers] = useState("");

  const gradeOptions: ISelectOption<Grade>[] = useMemo(
    () => [
      { key: Grade.KUP9, text: t(texts.gradingItem.kup9) },
      { key: Grade.KUP8, text: t(texts.gradingItem.kup8) },
      { key: Grade.KUP7, text: t(texts.gradingItem.kup7) },
      { key: Grade.KUP6, text: t(texts.gradingItem.kup6) },
      { key: Grade.KUP5, text: t(texts.gradingItem.kup5) },
      { key: Grade.KUP4, text: t(texts.gradingItem.kup4) },
      { key: Grade.KUP3, text: t(texts.gradingItem.kup3) },
      { key: Grade.KUP2, text: t(texts.gradingItem.kup2) },
      { key: Grade.KUP1, text: t(texts.gradingItem.kup1) },
      { key: Grade.DAN1, text: t(texts.gradingItem.dan1) },
      { key: Grade.DAN2, text: t(texts.gradingItem.dan2) },
      { key: Grade.DAN3, text: t(texts.gradingItem.dan3) },
      { key: Grade.DAN4, text: t(texts.gradingItem.dan4) },
      { key: Grade.DAN5, text: t(texts.gradingItem.dan5) },
      { key: Grade.DAN6, text: t(texts.gradingItem.dan6) },
      { key: Grade.DAN7, text: t(texts.gradingItem.dan7) },
    ],
    [t]
  );

  const onChangeAchievedAt = (newValue: string) =>
    setAchievedAt(new Date(newValue));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const reset = () => {
    setAchievedAt(new Date());
    setGrade(Grade.KUP9);
    setExaminers("");
  };

  const onConfirm = () => {
    props.onAddGrading?.(achievedAt, grade, examiners);
    reset();
  };

  return {
    achievedAt,
    examiners,
    grade,
    gradeOptions,
    onChangeAchievedAt,
    onConfirm,
    onSubmit,
    setExaminers,
    setGrade,
  };
};
