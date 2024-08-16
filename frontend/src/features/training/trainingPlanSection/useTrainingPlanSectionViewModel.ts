import { useState } from "react";
import { IPlannedBlock } from "../../../components/timetable/IPlannedBlocks";
import { Weekday } from "../../../core/types/Weekday";

export const useTrainingPlanSectionViewModel = () => {
  const [plannedBlocks, setPlannedBlocks] = useState<IPlannedBlock[]>([]);
  const [index, setIndex] = useState(0);

  const onAppend = () => {
    let plannedBlock: IPlannedBlock | undefined;
    switch (index) {
      case 0: {
        plannedBlock = {
          id: index.toString(),
          title: "Training für Kinder",
          color: "#893F61",
          weekday: Weekday.MONDAY,
          startTime: new Date(2024, 11, 17, 17, 30),
          endTime: new Date(2024, 11, 17, 18, 30),
        };
        break;
      }
      case 1: {
        plannedBlock = {
          id: index.toString(),
          title: "Pause",
          color: "#e2e2e2",
          weekday: Weekday.MONDAY,
          startTime: new Date(2024, 11, 17, 18, 30),
          endTime: new Date(2024, 11, 17, 18, 45),
        };
        break;
      }
      case 2: {
        plannedBlock = {
          id: index.toString(),
          title: "Training für alle",
          color: "#485136",
          weekday: Weekday.MONDAY,
          startTime: new Date(2024, 11, 21, 18, 45),
          endTime: new Date(2024, 11, 21, 19, 45),
        };
        break;
      }
      case 3: {
        plannedBlock = {
          // title: "Training für alle",
          id: index.toString(),
          title: "Training für Fortgeschrittene",
          color: "#893F61",
          weekday: Weekday.WEDNESDAY,
          startTime: new Date(2024, 11, 19, 20),
          endTime: new Date(2024, 11, 19, 21),
        };
        break;
      }
      case 4: {
        plannedBlock = {
          id: index.toString(),
          title: "Früheres Training",
          color: "#3f8976",
          weekday: Weekday.WEDNESDAY,
          startTime: new Date(2024, 11, 19, 15, 30),
          endTime: new Date(2024, 11, 19, 17, 30),
        };
        break;
      }
      case 5: {
        plannedBlock = {
          id: index.toString(),
          title: "Training für Kinder",
          color: "#893F61",
          weekday: Weekday.TUESDAY,
          startTime: new Date(2024, 11, 19, 20, 0),
          endTime: new Date(2024, 11, 19, 21, 15),
        };
        break;
      }
      case 6: {
        plannedBlock = {
          id: index.toString(),
          title: "Training für Kinder",
          color: "#893F61",
          weekday: Weekday.SATURDAY,
          startTime: new Date(2024, 11, 19, 20, 0),
          endTime: new Date(2024, 11, 19, 21, 15),
        };
        break;
      }
    }

    setPlannedBlocks((previous) => {
      if (plannedBlock) {
        previous.push(plannedBlock!);
      }

      return [...previous];
    });
    setIndex((previous) => previous + 1);
  };

  return { onAppend, plannedBlocks };
};
