import { useState, useCallback, useEffect } from 'react';
import { MembershipState, MembershipType, DailyMembershipReport } from '../types/membership';
import { getLocalDate } from '../utils/date';
import { getMembershipReport, saveMembershipReport } from '../utils/membershipStorage';

const INITIAL_MEMBERSHIPS: MembershipType[] = [
  { id: 'classic', name: 'Clásica', price: 10, count: 0 },
  { id: 'benefits', name: 'Benefits', price: 15, count: 0 },
  { id: 'plus', name: 'Plus', price: 25, count: 0 },
  { id: 'upgrade', name: 'Upgrade', price: 50, count: 0 },
];

export const useMemberships = () => {
  const [state, setState] = useState<MembershipState>({
    memberships: INITIAL_MEMBERSHIPS,
    visits: 0,
  });

  const updateMembershipCount = useCallback((id: string, count: number) => {
    setState((prev) => {
      const newState = {
        ...prev,
        memberships: prev.memberships.map((membership) =>
          membership.id === id ? { ...membership, count } : membership
        ),
        // Increment visits when a membership is added
        visits: prev.visits + (count > prev.memberships.find(m => m.id === id)?.count! ? 1 : 0)
      };
      
      saveMembershipReport(newState);
      return newState;
    });
  }, []);

  const updateVisitCount = useCallback((count: number) => {
    setState((prev) => {
      const newState = {
        ...prev,
        visits: count,
      };
      
      saveMembershipReport(newState);
      return newState;
    });
  }, []);

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
    saveMembershipReport(newState);
  }, []);

  // Load today's report if exists
  useEffect(() => {
    const today = getLocalDate();
    const savedReport = getMembershipReport(today);
    if (savedReport) {
      // Ensure all membership types are present
      const memberships = INITIAL_MEMBERSHIPS.map(initialMembership => {
        const savedMembership = savedReport.memberships.find(m => m.id === initialMembership.id);
        return savedMembership || { ...initialMembership, count: 0 };
      });

      setState({
        memberships,
        visits: savedReport.visits,
      });
    }
  }, []);

  return {
    state,
    updateMembershipCount,
    updateVisitCount,
    calculateTotal,
    resetCounts,
  };
};