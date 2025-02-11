import { useEffect, useState } from "react";
import { useGradingSelectOptions } from "../../hooks/useGradingSelectOption";
import { Grade } from "../../../shared/types/Grade";
import { IGradingInputsProps } from "./IGradingInputsProps";

export const useGradingInputViewModel = (props: IGradingInputsProps) => {
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

  const gradeOptions = useGradingSelectOptions();

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
