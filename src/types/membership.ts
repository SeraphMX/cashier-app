export interface MembershipType {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface MembershipState {
  memberships: MembershipType[];
  visits: number;
}

export interface DailyMembershipReport {
  date: string;
  memberships: MembershipType[];
  visits: number;
  totalAmount: number;
}