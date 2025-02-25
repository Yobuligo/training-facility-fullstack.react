import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { db } from "../db/db";
import { IChartData } from "../shared/model/IChartData";

export class UserStatsRepo {
  /**
   * Returns the active users for a specific date time span.
   */
  async getActive(dateTimeSpan: IDateTimeSpan): Promise<IChartData> {
    const query = `
        WITH RECURSIVE months AS (
            # Start mit dem ersten Monat
            SELECT :startDate AS month
            UNION
            
            # Rekursive Generierung der Monate
            SELECT DATE_ADD(month, INTERVAL 1 MONTH)
            FROM months
            WHERE month < :endDate
        )

        SELECT 
            m.month,
            COUNT(u.id) AS activeMembers
        FROM 
            months m
        LEFT JOIN 
            \`user-profiles\` u
        ON 
            u.joinedOn <= LAST_DAY(STR_TO_DATE(CONCAT(m.month, '-01'), '%Y-%m-%d'))
            AND (u.resignedAt IS NULL OR u.resignedAt >= STR_TO_DATE(CONCAT(m.month, '-01'), '%Y-%m-%d'))
        GROUP BY 
            m.month
        ORDER BY 
            m.month;    
    `;

    const startDate = DateTime.toDate(dateTimeSpan.from);
    const endDate = DateTime.toDate(dateTimeSpan.to);

    db.query(query, { replacements: { startDate, endDate } });

    return { dateTimeSpan, data: [] };
  }
}
