import { getLocalDate, parseLocalDate } from './date';

export const getWeekDates = (): string[] => {
  const today = parseLocalDate(getLocalDate());
  const currentDay = today.getDay();
  
  // Adjust to start from Saturday (6)
  const startDay = new Date(today);
  startDay.setDate(today.getDate() - ((currentDay + 1) % 7));
  
  const dates: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDay);
    date.setDate(startDay.getDate() + i);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    dates.push(`${year}-${month}-${day}`);
  }
  
  return dates;
};