import sequelize from "sequelize";
import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { db } from "../db/db";
import { IChartData } from "../shared/model/IChartData";
import { IChartEntry } from "./../shared/model/IChartEntry";

export class UserStatsRepo {
  /**
   * Returns the active users for a specific date time span.
   */
  async getActive(dateTimeSpan: IDateTimeSpan): Promise<IChartData> {
    const query = `
        WITH RECURSIVE months AS (
            # start with the first month
            SELECT :startDate AS name
            UNION
            
            # recursive generation of months
            SELECT DATE_ADD(name, INTERVAL 1 MONTH)
            FROM months
            WHERE name < :endDate
        )

        SELECT 
            m.name,
            COUNT(u.id) AS value
        FROM 
            months m
        LEFT JOIN 
            \`user-profiles\` u
        ON 
            u.joinedOn <= LAST_DAY(STR_TO_DATE(CONCAT(m.name, '-01'), '%Y-%m-%d'))
            AND (u.resignedAt IS NULL OR u.resignedAt >= STR_TO_DATE(CONCAT(m.name, '-01'), '%Y-%m-%d'))
        GROUP BY 
            m.name
        ORDER BY 
            m.name;    
    `;

    const startDate = DateTime.toDate(dateTimeSpan.from);
    const endDate = DateTime.toDate(dateTimeSpan.to);
    const data = await db.query<IChartEntry>(query, {
      replacements: { startDate, endDate },
      type: sequelize.QueryTypes.SELECT,
    });

    return { dateTimeSpan, data };
  }

  /**
   * Returns the active users grouped by tariff.
   */
  async groupedByTariff(): Promise<IChartData> {
    const query = `
        SELECT prof.tariff as name, COUNT(*) as value FROM users AS usr
        INNER JOIN \`user-profiles\` AS prof
        ON prof.userId = usr.id
        WHERE usr.username != "root"
        AND prof.resignedAt IS NULL
        GROUP BY prof.tariff
        ORDER BY value DESC
    `;

    const data = await db.query<IChartEntry>(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    return { dateTimeSpan: { from: new Date(), to: new Date() }, data };
  }

  /**
   * Returns the active users grouped by gender.
   */
  async groupedByGender(): Promise<IChartData> {
    const query = `
        SELECT prof.gender as name, COUNT(*) as value FROM users AS usr
        INNER JOIN \`user-profiles\` AS prof
        ON prof.userId = usr.id
        WHERE usr.username != "root"
        AND prof.resignedAt IS NULL
        GROUP BY prof.gender
        ORDER BY value DESC
    `;

    const data = await db.query<IChartEntry>(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    return { dateTimeSpan: { from: new Date(), to: new Date() }, data };
  }
}
