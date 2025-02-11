import { useState } from "react";
import { useGradingSelectOptions } from "../../hooks/useGradingSelectOptions";
import { useKickTechniqueSelectOptions } from "../../hooks/useKickTechniqueSelectOptions";
import { Grade } from "../../../shared/types/Grade";
import { KickTechnique } from "../../../shared/types/KickTechnique";
import { IGradingAddFormProps } from "./IGradingAddFormProps";

export const useGradingAddFormViewModel = (props: IGradingAddFormProps) => {
  const [achievedAt, setAchievedAt] = useState<Date>(new Date());
  const [grade, setGrade] = useState<Grade>(Grade.KUP9);
  const [kickTechnique, setKickTechnique] = useState<KickTechnique>(
    KickTechnique.NOT_RELEVANT
  );
  const [examiners, setExaminers] = useState("");
  const [place, setPlace] = useState("");

  const gradeOptions = useGradingSelectOptions();

  const kickTechniqueOptions = useKickTechniqueSelectOptions();

  const onChangeAchievedAt = (newValue: string) =>
    setAchievedAt(new Date(newValue));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const reset = () => {
    setAchievedAt(new Date());
    setGrade(Grade.KUP9);
    setExaminers("");
    setPlace("");
  };

  const onConfirm = () => {
    props.onAddGrading?.(achievedAt, grade, kickTechnique, place, examiners);
    reset();
  };

  return {
    achievedAt,
    examiners,
    grade,
    gradeOptions,
    kickTechnique,
    kickTechniqueOptions,
    onChangeAchievedAt,
    onConfirm,
    onSubmit,
    place,
    setExaminers,
    setGrade,
    setKickTechnique,
    setPlace,
  };
};
