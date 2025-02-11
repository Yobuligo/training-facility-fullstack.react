import { useEffect, useState } from "react";
import { Grade } from "../../../shared/types/Grade";
import { KickTechnique } from "../../../shared/types/KickTechnique";
import { useGradingSelectOptions } from "../../hooks/useGradingSelectOptions";
import { useKickTechniqueSelectOptions } from "../../hooks/useKickTechniqueSelectOptions";
import { IGradingInputsProps } from "./IGradingInputsProps";

export const useGradingInputViewModel = (props: IGradingInputsProps) => {
  const [achievedAt, setAchievedAt] = useState<Date>(props.achievedAt);
  const [grade, setGrade] = useState<Grade>(props.grade);
  const [kickTechnique, setKickTechnique] = useState<KickTechnique>(
    props.kickTechnique
  );
  const [examiners, setExaminers] = useState(props.examiners);
  const [place, setPlace] = useState(props.place);

  useEffect(() => {
    if (achievedAt !== props.achievedAt) {
      setAchievedAt(props.achievedAt);
    }

    if (grade !== props.grade) {
      setGrade(props.grade);
    }

    if (kickTechnique !== props.kickTechnique) {
      setKickTechnique(props.kickTechnique);
    }

    if (examiners !== props.examiners) {
      setExaminers(props.examiners);
    }

    if (place !== props.place) {
      setPlace(props.place);
    }
  }, [achievedAt, examiners, grade, kickTechnique, place, props]);

  const gradeOptions = useGradingSelectOptions();

  const kickTechniqueOptions = useKickTechniqueSelectOptions();

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

  const onKickTechniqueChange = (kickTechnique: KickTechnique) => {
    setKickTechnique(kickTechnique);
    props.onKickTechniqueChange?.(kickTechnique);
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
    kickTechnique,
    kickTechniqueOptions,
    onChangeAchievedAt,
    onExaminersChange,
    onGradeChange,
    onKickTechniqueChange,
    onPlaceChange,
    place,
  };
};
