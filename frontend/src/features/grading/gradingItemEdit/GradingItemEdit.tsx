import { useState } from "react";
import { Collapse } from "../../../components/collapse/Collapse";
import { useRenderGrade } from "../../../hooks/useRenderGrade";
import { GradingInputs } from "../gradingInputs/GradingInputs";
import { IGradingItemEditProps } from "./IGradingItemEditProps";

export const GradingItemEdit: React.FC<IGradingItemEditProps> = (props) => {
  const [collapse, setCollapse] = useState(true);
  const renderGrade = useRenderGrade();

  return (
    <>
      <Collapse
        collapsed={collapse}
        setCollapsed={setCollapse}
        title={renderGrade(props.grading.grade)}
      />
      {!collapse && (
        <GradingInputs
          achievedAt={props.grading.achievedAt}
          displayMode={false}
          examiners={props.grading.examiners}
          grade={props.grading.grade}
          place={props.grading.place}
        />
      )}
    </>
  );
};
