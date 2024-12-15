export type NavigationTab = 'counter' | 'memberships' | 'search';

export interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

export interface SalesGoal {
  name: string;
  value: number;
  color: string;
}

export interface GoalType {
  type: 'minima' | 'nichos';
  total: number;
  goals: SalesGoal[];
}

export interface ScheduleEntry {
  id: string;
  name: string;
  position: string;
  schedule: string;
}

export interface CashEvent {
  id: string;
  type: 'withdrawal' | 'shortage' | 'surplus' | 'deposit';
  amount: number;
  timestamp: string;
  description: string;
}