import { Button } from "../../../components/button/Button";
import { Timetable } from "../../../components/timetable/timetable/Timetable";
import { Weekday } from "../../../components/timetable/Weekday";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useTrainingPlanSectionViewModel } from "./useTrainingPlanSectionViewModel";

export const TrainingPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useTrainingPlanSectionViewModel();

  return (
    <div>
      <Button onClick={viewModel.onAppend}>
        {t(texts.trainingPlanSection.addTraining)}
      </Button>
      <Timetable
        plannedBlocks={[
          {
            title: "Training für Kinder",
            color: "#893F61",
            weekdayIndex: Weekday.MONDAY,
            startTime: new Date(2024, 11, 17, 17, 30),
            endTime: new Date(2024, 11, 17, 18, 30),
          },
          {
            title: "Pause",
            color: "#e2e2e2",
            weekdayIndex: Weekday.MONDAY,
            startTime: new Date(2024, 11, 17, 18, 30),
            endTime: new Date(2024, 11, 17, 18, 45),
          },
          {
            title: "Training für alle",
            color: "#485136",
            weekdayIndex: Weekday.MONDAY,
            startTime: new Date(2024, 11, 21, 18, 45),
            endTime: new Date(2024, 11, 21, 19, 45),
          },
          {
            // title: "Training für alle",
            title: "Training für Fortgeschrittene",
            color: "#893F61",
            weekdayIndex: Weekday.WEDNESDAY,
            startTime: new Date(2024, 11, 19, 20),
            endTime: new Date(2024, 11, 19, 21),
          },
          {
            title: "Früheres Training",
            color: "#3f8976",
            weekdayIndex: Weekday.WEDNESDAY,
            startTime: new Date(2024, 11, 19, 15, 30),
            endTime: new Date(2024, 11, 19, 17, 30),
          },
          {
            title: "Training für Kinder",
            color: "#893F61",
            weekdayIndex: Weekday.TUESDAY,
            startTime: new Date(2024, 11, 19, 20, 0),
            endTime: new Date(2024, 11, 19, 21, 15),
          },
          {
            title: "Training für Kinder",
            color: "#893F61",
            weekdayIndex: Weekday.SATURDAY,
            startTime: new Date(2024, 11, 19, 20, 0),
            endTime: new Date(2024, 11, 19, 21, 15),
          },
        ]}
        timelineIntervalInMinutes={15}
      />
    </div>
  );
};
