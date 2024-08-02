import { DateTime } from "../services/date/DateTime";
import { GradingMeta, IGrading } from "../shared/model/IGrading";
import { Repository } from "./core/Repository";
import { DummyGradings } from "./DummyGradings";

export class GradingApi extends Repository<IGrading> {
  constructor() {
    super(GradingMeta);
  }

  async findByUserId(userId: string): Promise<IGrading[]> {
    return DummyGradings.filter((grading) => grading.userId === userId).sort(
      (left, right) => DateTime.compare(right.achievedAt, left.achievedAt)
    );
  }
}
