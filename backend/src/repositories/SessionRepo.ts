import { Session } from "../model/Session";
import { ISession } from "../model/types/ISession";

export class SessionRepo {
  async deleteByUserId(userId: string): Promise<boolean> {
    const deletedRows = await Session.destroy({ where: { userId } });
    return deletedRows === 1;
  }

  async deleteBySid(sid: string): Promise<boolean> {
    const deletedRows = await Session.destroy({ where: { sid } });
    return deletedRows === 1;
  }

  async findBySid(sid: string): Promise<ISession | undefined> {
    const data = await Session.findByPk(sid);
    return data?.toJSON();
  }

  async updateUserId(sid: string, userId: string): Promise<boolean> {
    const [updatedRows] = await Session.update({ userId }, { where: { sid } });
    return updatedRows === 1;
  }
}
