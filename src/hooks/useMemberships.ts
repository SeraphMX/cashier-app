import { useState, useCallback, useEffect } from 'react';
import { MembershipState, MembershipType, DailyMembershipReport } from '../types/membership';

const INITIAL_MEMBERSHIPS: MembershipType[] = [
  { id: 'classic', name: 'Clásica', price: 10, count: 0 },
  { id: 'benefits', name: 'Benefits', price: 15, count: 0 },
  { id: 'plus', name: 'Plus', price: 25, count: 0 },
];

export const useMemberships = () => {
  const [state, setState] = useState<MembershipState>({
    memberships: INITIAL_MEMBERSHIPS,
    visits: 0,
  });

  const saveDailyReport = useCallback((newState: MembershipState) => {
    const today = new Date().toISOString().split('T')[0];
    const report: DailyMembershipReport = {
      date: today,
      memberships: newState.memberships,
      visits: newState.visits,
      totalAmount: newState.memberships.reduce(
        (sum, membership) => sum + membership.price * membership.count,
        0
      ),
    };

    localStorage.setItem(`membershipReport_${today}`, JSON.stringify(report));
  }, []);

  const updateMembershipCount = useCallback((id: string, count: number) => {
    setState((prev) => {
      const newState = {
        ...prev,
        memberships: prev.memberships.map((membership) =>
          membership.id === id ? { ...membership, count } : membership
        ),
      };
      
      saveDailyReport(newState);
      return newState;
    });
  }, [saveDailyReport]);

  const updateVisitCount = useCallback((count: number) => {
    setState((prev) => {
      const newState = {
        ...prev,
        visits: count,
      };
      
      saveDailyReport(newState);
      return newState;
    });
  }, [saveDailyReport]);

  const calculateTotal = useCallback((state: MembershipState): number => {
    return state.memberships.reduce(
      (sum, membership) => sum + membership.price * membership.count,
      0
    );
  }, []);

  const resetCounts = useCallback(() => {
    const newState = {
      memberships: INITIAL_MEMBERSHIPS,
      visits: 0,
    };
    setState(newState);
    saveDailyReport(newState);
  }, [saveDailyReport]);

  const getDailyReport = useCallback((date: string): DailyMembershipReport | null => {
    const savedReport = localStorage.getItem(`membershipReport_${date}`);
    return savedReport ? JSON.parse(savedReport) : null;
  }, []);

  // Load today's report if exists
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedReport = getDailyReport(today);
    if (savedReport) {
      setState({
        memberships: savedReport.memberships,
        visits: savedReport.visits,
      });
    }
  }, [getDailyReport]);

  return {
    state,
    updateMembershipCount,
    updateVisitCount,
    calculateTotal,
    resetCounts,
    getDailyReport,
  };
};