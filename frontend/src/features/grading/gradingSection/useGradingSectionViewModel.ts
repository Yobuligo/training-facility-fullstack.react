import { useCallback, useEffect, useState } from "react";
import { GradingApi } from "../../../api/GradingApi";
import { IGrading } from "../../../shared/model/IGrading";
import { IGradingSectionProps } from "./IGradingSectionProps";

export const useGradingSectionViewModel = (props: IGradingSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gradings, setGradings] = useState<IGrading[]>([]);

  const loadGradings = useCallback(async () => {
    setIsLoading(true);
    const gradingApi = new GradingApi();
    const gradings = await gradingApi.findByUserId(props.userId);
    setGradings(gradings);
    setIsLoading(false);
  }, [props.userId]);

  useEffect(() => {
    loadGradings();
  }, [loadGradings]);

  const onAddGrading = () => {};

  const onDelete = (grading: IGrading) => {
    setGradings((previous) => {
      const index = previous.findIndex((item) => item.id === grading.id);
      if (index !== -1) {
        previous.splice(index, 1);
        const gradingApi = new GradingApi();
        gradingApi.deleteGrading(grading);
      }
      return [...previous];
    });
  };

  return {
    gradings,
    isLoading,
    onAddGrading,
    onDelete,
  };
};
