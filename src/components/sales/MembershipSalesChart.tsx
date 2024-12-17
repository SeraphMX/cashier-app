import React, { useState, useMemo } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DailyMembershipReport } from '../../types/membership';
import { getWeekDates } from '../../utils/weekDates';

interface MembershipSalesChartProps {
  reports: DailyMembershipReport[];
  selectedDate?: string;
}

const MEMBERSHIP_COLORS = {
  classic: '#17C964',
  benefits: '#006FEE',
  plus: '#F5A524',
  upgrade: '#7828C8',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-divider rounded-lg p-2">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-default-500">
          {payload[0].value} membresías
        </p>
      </div>
    );
  }
  return null;
};

export const MembershipSalesChart: React.FC<MembershipSalesChartProps> = ({ 
  reports,
  selectedDate 
}) => {
  const chartData = useMemo(() => {
    let relevantReports: DailyMembershipReport[];

    if (selectedDate) {
      // Show data for specific date
      relevantReports = reports.filter(report => report.date === selectedDate);
    } else {
      // Show current week data
      const weekDates = getWeekDates();
      relevantReports = reports.filter(report => 
        weekDates.includes(report.date)
      );
    }

    // Aggregate membership data
    const aggregatedData = relevantReports.reduce((acc, report) => {
      report.memberships.forEach(membership => {
        if (membership.count > 0) {
          acc[membership.id] = (acc[membership.id] || 0) + membership.count;
        }
      });
      return acc;
    }, {} as Record<string, number>);

    // Transform to chart format
    return Object.entries(aggregatedData).map(([id, count]) => {
      const membership = reports[0]?.memberships.find(m => m.id === id);
      return {
        id,
        name: membership?.name || id,
        value: count,
      };
    });
  }, [reports, selectedDate]);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {selectedDate ? 'Ventas del Día' : 'Ventas de la Semana'}
        </h3>
      </CardHeader>
      <CardBody>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell 
                    key={entry.id}
                    fill={MEMBERSHIP_COLORS[entry.id as keyof typeof MEMBERSHIP_COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};