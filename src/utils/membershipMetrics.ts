import { DailyMembershipReport, MembershipType } from '../types/membership';
import { getWeekDates } from './weekDates';

export const calculateEffectiveness = (report: DailyMembershipReport): number => {
  if (!report.visits) return 0;

  // Count total memberships excluding upgrades
  const totalMemberships = report.memberships.reduce((sum, membership) => 
    membership.id !== 'upgrade' ? sum + membership.count : sum, 
    0
  );

  // Calculate percentage and round to nearest integer
  return Math.round((totalMemberships / report.visits) * 100);
};

export const calculateWeeklyMemberships = (reports: DailyMembershipReport[]): number => {
  const weekDates = getWeekDates();
  
  return reports
    .filter(report => weekDates.includes(report.date))
    .reduce((total, report) => {
      const membershipCount = report.memberships.reduce((sum, membership) => 
        membership.id !== 'upgrade' ? sum + membership.count : sum,
        0
      );
      return total + membershipCount;
    }, 0);
};

export const calculateDailyMemberships = (report: DailyMembershipReport): number => {
  return report.memberships.reduce((sum, membership) => 
    membership.id !== 'upgrade' ? sum + membership.count : sum,
    0
  );
};

export const calculateWeeklySummary = (reports: DailyMembershipReport[]): DailyMembershipReport | null => {
  const weekDates = getWeekDates();
  const weeklyReports = reports.filter(report => weekDates.includes(report.date));
  
  if (weeklyReports.length === 0) return null;

  // Initialize membership structure from first report
  const memberships: MembershipType[] = weeklyReports[0].memberships.map(m => ({
    ...m,
    count: 0
  }));

  // Aggregate data
  const summary = weeklyReports.reduce((acc, report) => {
    // Sum visits
    acc.visits += report.visits;

    // Sum total amount
    acc.totalAmount += report.totalAmount;

    // Sum membership counts
    report.memberships.forEach(reportMembership => {
      const membership = acc.memberships.find(m => m.id === reportMembership.id);
      if (membership) {
        membership.count += reportMembership.count;
      }
    });

    return acc;
  }, {
    date: weekDates[0], // Use first day of week as reference
    visits: 0,
    totalAmount: 0,
    memberships: memberships
  });

  return summary;
};