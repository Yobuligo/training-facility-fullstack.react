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

  return {
    gradings,
    isLoading,
  };
};
