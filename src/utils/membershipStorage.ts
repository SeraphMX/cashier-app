import { MembershipState, DailyMembershipReport } from '../types/membership';
import { getLocalDate } from './date';

export const saveMembershipReport = (state: MembershipState) => {
  const today = getLocalDate();
  const report: DailyMembershipReport = {
    date: today,
    memberships: state.memberships,
    visits: state.visits,
    totalAmount: state.memberships.reduce(
      (sum, membership) => sum + membership.price * membership.count,
      0
    ),
  };

  localStorage.setItem(`membershipReport_${today}`, JSON.stringify(report));
};

export const getMembershipReport = (date: string): DailyMembershipReport | null => {
  const savedReport = localStorage.getItem(`membershipReport_${date}`);
  return savedReport ? JSON.parse(savedReport) : null;
};