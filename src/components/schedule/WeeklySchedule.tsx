import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { Clock } from 'lucide-react';
import { useWeekSchedule } from '../../hooks/useWeekSchedule';
import { useSchedule } from '../../hooks/useSchedule';
import { ScheduleEditor } from './ScheduleEditor';

export const WeeklySchedule: React.FC = () => {
  const { weekDays, isCurrentDay } = useWeekSchedule();
  const { schedule, updateDaySchedule } = useSchedule();
  const [editingDate, setEditingDate] = useState<string | null>(null);

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
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {weekDays.map((day) => {
            const daySchedule = schedule[day.date];
            return (
              <TableRow 
                key={day.date} 
                className={`
                  ${isCurrentDay(day.date) ? "bg-primary-50" : ""}
                  ${daySchedule?.isRestDay ? "bg-success-50" : ""}
                `}
              >
                <TableCell className="font-medium">
                  {day.name}
                </TableCell>
                <TableCell>
                  {daySchedule?.isRestDay ? "Descanso" : daySchedule?.startTime}
                </TableCell>
                <TableCell>
                  {daySchedule?.isRestDay ? "Descanso" : daySchedule?.endTime}
                </TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => setEditingDate(day.date)}
                  >
                    <Clock className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {editingDate && (
        <ScheduleEditor
          isOpen={!!editingDate}
          onClose={() => setEditingDate(null)}
          date={editingDate}
          startTime={schedule[editingDate]?.startTime}
          isRestDay={schedule[editingDate]?.isRestDay}
          onSave={(startTime, isRestDay) => updateDaySchedule(editingDate, startTime, isRestDay)}
        />
      )}
    </div>
  );
};