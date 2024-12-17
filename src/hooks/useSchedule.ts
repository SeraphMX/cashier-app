import { useState, useCallback, useEffect } from 'react';
import { Schedule, DaySchedule } from '../types/schedule';
import { getWeekDates } from '../utils/weekDates';
import { adjustEndTime } from '../utils/scheduleTime';

const STORAGE_KEY = 'weekly_schedule';

const createInitialSchedule = (): Schedule => {
  const weekDates = getWeekDates();
  return weekDates.reduce((acc, date) => {
    acc[date] = {
      date,
      startTime: '07:00',
      endTime: '16:00',
      isRestDay: false,
    };
    return acc;
  }, {} as Schedule);
};

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : createInitialSchedule();
  });

  const updateDaySchedule = useCallback((
    date: string, 
    startTime: string, 
    isRestDay: boolean = false
  ) => {
    setSchedule(prev => {
      const endTime = isRestDay ? '' : adjustEndTime(startTime);
      const newSchedule = {
        ...prev,
        [date]: { 
          date, 
          startTime: isRestDay ? '' : startTime, 
          endTime,
          isRestDay 
        }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSchedule));
      return newSchedule;
    });
  }, []);

  // Update schedule when week changes
  useEffect(() => {
    const weekDates = getWeekDates();
    setSchedule(prev => {
      const newSchedule = { ...prev };
      let hasChanges = false;

      // Add missing dates
      weekDates.forEach(date => {
        if (!newSchedule[date]) {
          newSchedule[date] = {
            date,
            startTime: '07:00',
            endTime: '16:00',
            isRestDay: false,
          };
          hasChanges = true;
        }
      });

      // Remove old dates
      Object.keys(newSchedule).forEach(date => {
        if (!weekDates.includes(date)) {
          delete newSchedule[date];
          hasChanges = true;
        }
      });

      if (hasChanges) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSchedule));
        return newSchedule;
      }
      return prev;
    });
  }, []);

  return {
    schedule,
    updateDaySchedule,
  };
};