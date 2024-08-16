import { Time } from "../types/Time";

class TimeConverterDefault {
  findEarliestTime(dates: Date[]): Date {
    return this.sortTimes(dates)[0];
  }

  findLatestTime(dates: Date[]): Date {
    return this.sortTimes(dates)[dates.length - 1];
  }

  getTimeDifferenceInMinutes(earlierDate: Date, laterDate: Date) {
    const hours = laterDate.getHours() - earlierDate.getHours();
    const minutes = laterDate.getMinutes() - earlierDate.getMinutes();
    return hours * 60 + minutes;
  }

  addMinutes(oldDate: Date, minutes: number): Date {
    //turn minutes to milliseconds by multiplying with 60k
    return new Date(oldDate.getTime() + minutes * 60000);
  }

  getDateTimeAsString(date: Date): string {
    return `${date.getHours()}:${
      date.getMinutes() === 0 ? "00" : date.getMinutes()
    }`;
  }

  getTimeAsString(time: Time): string {
    return `${time[0]}:${time[1] === 0 ? "00" : time[1]}`;
  }

  private sortTimes(dates: Date[]): Date[] {
    return dates.sort((a, b) => {
      if (a.getHours() === b.getHours()) {
        return a.getMinutes() - b.getMinutes();
      } else {
        return a.getHours() - b.getHours();
      }
    });
  }
}
export const TimeConverter = new TimeConverterDefault();
