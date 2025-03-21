import { useState } from "react";
import { Grade } from "../../../shared/types/Grade";
import { KickTechnique } from "../../../shared/types/KickTechnique";
import { IGradingItemEditProps } from "./IGradingItemEditProps";

export const useGradingItemEditViewModel = (props: IGradingItemEditProps) => {
  const [collapse, setCollapse] = useState(true);

  const publishChange = () => props.onChange?.(props.grading);

  const onAchievedAtChange = (achievedAt: Date) => {
    props.grading.achievedAt = achievedAt;
    publishChange();
  };

  const onDelete = () => props.onDelete?.(props.grading);

  const onExaminersChange = (examiners: string) => {
    props.grading.examiners = examiners;
    publishChange();
  };

  const onGradeChange = (grade: Grade) => {
    props.grading.grade = grade;
    publishChange();
  };

  const onKickTechniqueChange = (kickTechnique: KickTechnique) => {
    props.grading.kickTechnique = kickTechnique;
    publishChange();
  };

  const onPlaceChange = (place: string) => {
    props.grading.place = place;
    publishChange();
  };

  return {
    collapse,
    onAchievedAtChange,
    onDelete,
    onExaminersChange,
    onGradeChange,
    onKickTechniqueChange,
    onPlaceChange,
    setCollapse,
  };
};
