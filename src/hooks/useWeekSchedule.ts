import { useMemo } from 'react';

interface WeekDay {
  name: string;
  date: string;
}

export const useWeekSchedule = () => {
  const weekDays = useMemo(() => {
    const days = [];
    const today = new Date();
    const currentDay = today.getDay();
    
    // Adjust to start from Saturday (6)
    const startDay = new Date(today);
    startDay.setDate(today.getDate() - ((currentDay + 1) % 7));
    
    const dayNames = [
      'Sábado', 'Domingo', 'Lunes', 'Martes',
      'Miércoles', 'Jueves', 'Viernes'
    ];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDay);
      date.setDate(startDay.getDate() + i);
      
      days.push({
        name: dayNames[i],
        date: date.toISOString().split('T')[0],
      });
    }
    
    return days;
  }, []);

  const isCurrentDay = (date: string) => {
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  };

  return {
    weekDays,
    isCurrentDay,
  };
};