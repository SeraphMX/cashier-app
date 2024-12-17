export interface DaySchedule {
  date: string;
  startTime: string;
  endTime: string;
  isRestDay?: boolean;
}

export type Schedule = {
  [date: string]: DaySchedule;
};