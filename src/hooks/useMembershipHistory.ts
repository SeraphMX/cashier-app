import { useState, useEffect } from 'react';
import { DailyMembershipReport } from '../types/membership';
import { parseLocalDate } from '../utils/date';

export const useMembershipHistory = () => {
  const [reports, setReports] = useState<DailyMembershipReport[]>([]);

  useEffect(() => {
    const loadReports = () => {
      const allReports: DailyMembershipReport[] = [];
      const keys = Object.keys(localStorage);
      
      keys.forEach(key => {
        if (key.startsWith('membershipReport_')) {
          try {
            const report = JSON.parse(localStorage.getItem(key) || '');
            if (report) {
              allReports.push(report);
            }
          } catch (error) {
            console.error('Error parsing report:', error);
          }
        }
      });

      // Sort reports by date in descending order (most recent first)
      allReports.sort((a, b) => {
        const dateA = parseLocalDate(a.date);
        const dateB = parseLocalDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      setReports(allReports);
    };

    loadReports();
    
    // Reload reports when localStorage changes
    window.addEventListener('storage', loadReports);
    
    return () => {
      window.removeEventListener('storage', loadReports);
    };
  }, []);

  return reports;
};