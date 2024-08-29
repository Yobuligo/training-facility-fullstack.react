import { DateTime } from "../core/services/date/DateTime";
import { UserGradingMeta, IUserGrading } from "../shared/model/IUserGrading";
import { Repository } from "./core/Repository";
import { DummyGradings } from "./DummyGradings";

export class UserGradingApi extends Repository<IUserGrading> {
  constructor() {
    super(UserGradingMeta);
  }

  async findByUserId(userId: string): Promise<IUserGrading[]> {
    return DummyGradings.filter((grading) => grading.userId === userId).sort(
      (left, right) => DateTime.compare(right.achievedAt, left.achievedAt)
    );
  }
}
