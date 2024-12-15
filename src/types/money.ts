export interface DenominationCount {
  value: number;
  count: number;
}

export interface MoneyState {
  bills: DenominationCount[];
  coins: number;
}

export interface CashWithdrawal {
  id: string;
  amount: number;
  details: MoneyState;
  timestamp: string;
}