export interface CashEvent {
  id: string;
  type: 'withdrawal' | 'shortage' | 'surplus' | 'deposit' | 'initial' | 'withdrawal-fund';
  amount: number;
  timestamp: string;
  description: string;
  details?: any;
}

export interface DailyReport {
  date: string;
  events: CashEvent[];
  totalWithdrawals: number;
  totalDeposits: number;
  totalShortages: number;
  totalSurplus: number;
  initialFund: number;
  currentFund: number;
}