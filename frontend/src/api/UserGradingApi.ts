import { IUserGrading, UserGradingMeta } from "../shared/model/IUserGrading";
import { Repository } from "./core/Repository";

export class UserGradingApi extends Repository<IUserGrading> {
  constructor() {
    super(UserGradingMeta);
  }

  async findByUserId(userId: string): Promise<IUserGrading[]> {
    // return DummyGradings.filter((grading) => grading.userProfileId === userId).sort(
    //   (left, right) => DateTime.compare(right.achievedAt, left.achievedAt)
    // );
    throw new Error();
  }
}
