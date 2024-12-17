import { useState, useCallback } from 'react';
import { WeeklyGoals } from '../types/goals';

const STORAGE_KEY = 'weekly_goals';

const DEFAULT_GOALS: WeeklyGoals = {
  minimum: 45,
  niches: 30,
};

export const useWeeklyGoals = () => {
  const [goals, setGoals] = useState<WeeklyGoals>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_GOALS;
  });

  const updateGoals = useCallback((newGoals: WeeklyGoals) => {
    setGoals(newGoals);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newGoals));
  }, []);

  return {
    goals,
    updateGoals,
  };
};