import React from 'react';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { DailyMembershipReport } from '../../types/membership';
import { formatDate } from '../../utils/date';
import { calculateEffectiveness, calculateDailyMemberships, calculateWeeklySummary } from '../../utils/membershipMetrics';

interface MembershipSalesHistoryProps {
  reports: DailyMembershipReport[];
  onDateSelect?: (date: string) => void;
  selectedDate?: string;
}

const typeColors = {
  classic: "success",
  benefits: "primary",
  plus: "warning",
  upgrade: "secondary",
} as const;

const SalesReport = ({ report, isWeekly = false }: { report: DailyMembershipReport, isWeekly?: boolean }) => {
  const effectiveness = calculateEffectiveness(report);
  const totalMemberships = calculateDailyMemberships(report);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center w-full">
        <p className="text-small font-semibold">
          {isWeekly ? 'Resumen Semanal' : formatDate(report.date)}
        </p>
        <Chip size="sm" variant="flat" color="primary">
          ${report.totalAmount.toLocaleString()}
        </Chip>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
        {report.memberships
          .filter(membership => membership.count > 0)
          .map((membership) => (
            <div 
              key={membership.id}
              className="flex justify-between items-center"
            >
              <Chip
                size="md"
                variant="flat"
                color={typeColors[membership.id as keyof typeof typeColors]}
              >
                {membership.name}
              </Chip>
              <span className="text-small text-default-500 ml-2">
                x{membership.count}
              </span>
            </div>
        ))}
      </div>
      {report.visits > 0 && (
        <div className="flex justify-between items-center w-full pt-3">
          <div className="flex gap-2">
            <Chip isDisabled size="sm" variant="bordered" color="default">
              Visitas: {report.visits}
            </Chip>
            <Chip isDisabled size="sm" variant="dot" color="success">
              Titulares: {totalMemberships}
            </Chip>
          </div>
          <div className="flex gap-2">
            <Chip 
              size="sm" 
              variant="flat" 
              color={effectiveness >= 50 ? "success" : "warning"}
            >
              {effectiveness}% Efectividad
            </Chip>
          </div>
        </div>
      )}
    </div>
  );
};

export const MembershipSalesHistory: React.FC<MembershipSalesHistoryProps> = ({ 
  reports,
  onDateSelect,
  selectedDate,
}) => {
  const weeklySummary = !selectedDate ? calculateWeeklySummary(reports) : null;

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Historial de Ventas</h3>
        {selectedDate && (
          <Chip
            variant="flat"
            color="primary"
            className="cursor-pointer"
            onClick={() => onDateSelect?.(undefined)}
          >
            Ver semana
          </Chip>
        )}
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4 w-full">
          {weeklySummary && (
            <Card shadow="sm" className="w-full bg-primary-50/50">
              <CardBody>
                <SalesReport report={weeklySummary} isWeekly={true} />
              </CardBody>
            </Card>
          )}

          {reports.map((report) => (
            <Card 
              key={report.date} 
              shadow="sm"
              isPressable={!!onDateSelect}
              className={`w-full ${selectedDate === report.date ? "border-2 border-primary" : ""}`}
              onPress={() => onDateSelect?.(report.date)}
            >
              <CardBody>
                <SalesReport report={report} />
              </CardBody>
            </Card>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};