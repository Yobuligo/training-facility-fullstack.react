import { DateTime } from "../services/date/DateTime";
import { GradingMeta, IGrading } from "../shared/model/IGrading";
import { Repository } from "./core/Repository";
import { DummyGradings } from "./DummyGradings";

export class GradingApi extends Repository<IGrading> {
  constructor() {
    super(GradingMeta);
  }

  async deleteGrading(grading: IGrading): Promise<boolean> {
    const index = DummyGradings.findIndex((item) => item.id === grading.id);
    if (index !== -1) {
      DummyGradings.splice(index, 1);
      return true;
    }
    return false;
  }

  async findByUserId(userId: string): Promise<IGrading[]> {
    return DummyGradings.filter((grading) => grading.userId === userId).sort(
      (left, right) => DateTime.compare(right.achievedAt, left.achievedAt)
    );
  }
}
