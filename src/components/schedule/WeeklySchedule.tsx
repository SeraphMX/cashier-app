import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useWeekSchedule } from '../../hooks/useWeekSchedule';

export const WeeklySchedule: React.FC = () => {
  const { weekDays, isCurrentDay } = useWeekSchedule();

  return (
    <div className="p-4">
      <Table 
        removeWrapper 
        aria-label="Horario semanal"
        classNames={{
          th: "bg-default-100",
        }}
      >
        <TableHeader>
          <TableColumn>DÍA</TableColumn>
          <TableColumn>ENTRADA</TableColumn>
          <TableColumn>SALIDA</TableColumn>
        </TableHeader>
        <TableBody>
          {weekDays.map((day) => (
            <TableRow 
              key={day.date} 
              className={isCurrentDay(day.date) ? "bg-primary-50" : ""}
            >
              <TableCell className="font-medium">
                {day.name}
              </TableCell>
              <TableCell>7:00</TableCell>
              <TableCell>15:00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};