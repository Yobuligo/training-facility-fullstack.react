import { useState } from "react";
import { Collapse } from "../../../components/collapse/Collapse";
import { useRenderGrade } from "../../../hooks/useRenderGrade";
import { GradingAddForm } from "../gradingAddForm/GradingAddForm";
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
      {!collapse && <GradingAddForm displayMode={false} />}
    </>
  );
};
