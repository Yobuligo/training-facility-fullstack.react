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
  async getActive(): Promise<IChartData> {
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
        LEFT JOIN \`users\` AS usr
        ON usr.id = u.userId
        WHERE usr.username != "root"
        GROUP BY 
            m.name
        ORDER BY 
            m.name;    
    `;

    // Calculate last month to get entry for current month
    const to = new Date();
    to.setMonth(to.getMonth() - 1);

    const dateTimeSpan: IDateTimeSpan = {
      from: new Date("2024-05-01"),
      to,
    };
    const startDate = DateTime.toDate(dateTimeSpan.from);
    const endDate = DateTime.toDate(dateTimeSpan.to);
    let data = await db.query<IChartEntry>(query, {
      replacements: { startDate, endDate },
      type: sequelize.QueryTypes.SELECT,
    });

    // entry first entry to start by 0
    data = [{ name: "2024-04-01", value: 0 }, ...data];
    return { dateTimeSpan, data };
  }

  /**
   * Returns the active users grouped by tariff.
   */
  async groupedByTariff(): Promise<IChartData> {
    const query = `
        SELECT prof.tariff AS name, COUNT(*) AS value FROM users AS usr
        INNER JOIN \`user-profiles\` AS prof
          ON prof.userId = usr.id
        WHERE usr.username != "root"
          AND prof.resignedAt IS NULL
        GROUP BY prof.tariff
        ORDER BY value DESC
    `;

    return await this.selectAndCreateChartData(query);
  }

  /**
   * Returns the active users grouped by gender.
   */
  async groupedByGender(): Promise<IChartData> {
    const query = `
        SELECT prof.gender AS name, COUNT(*) AS value FROM users AS usr
        INNER JOIN \`user-profiles\` AS prof
          ON prof.userId = usr.id
        WHERE usr.username != "root"
          AND prof.resignedAt IS NULL
        GROUP BY prof.gender
        ORDER BY value DESC
    `;

    return await this.selectAndCreateChartData(query);
  }

  /**
   * Returns the active users grouped by grade.
   */
  async groupedByGrade(): Promise<IChartData> {
    const query = `
      SELECT grading.grade AS name, COUNT(*) AS value FROM users AS usr
      INNER JOIN \`user-profiles\` AS prof
        ON prof.userId = usr.id
      LEFT JOIN \`user-gradings\` AS grading
        ON grading.userProfileId = prof.id
        AND grading.grade = (
          SELECT MAX(grade)
          FROM \`user-gradings\`
          WHERE userProfileId = prof.id
        )
      WHERE usr.username != "root" 
        AND prof.resignedAt IS NULL
      GROUP BY grading.grade
      ORDER BY grading.grade ASC    
    `;

    // Set chart entry name for students without grading to -1, instead of null
    return await this.selectAndCreateChartData(query, (chartEntry) => {
      if (chartEntry.name === null) {
        chartEntry.name = "-1";
      }
    });
  }

  private async selectAndCreateChartData(
    query: string,
    convert?: (chartEntries: IChartEntry) => void
  ): Promise<IChartData> {
    const chartEntries = await db.query<IChartEntry>(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (convert) {
      chartEntries.forEach((chartEntry) => convert(chartEntry));
    }
    return {
      dateTimeSpan: { from: new Date(), to: new Date() },
      data: chartEntries,
    };
  }
}
