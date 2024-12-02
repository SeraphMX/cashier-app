export interface DenominationCount {
  value: number;
  count: number;
}

export interface MoneyState {
  bills: DenominationCount[];
  coins: number;
}