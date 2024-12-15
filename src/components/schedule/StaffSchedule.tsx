import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

const staffSchedule = [
  { name: 'Edgar', schedules: ['14:30 - 23:00', 'Descanso', '14:30 - 23:02', '14:30 - 23:03', '14:30 - 23:04', '14:30 - 23:05', '14:30 - 23:06'] },
  { name: 'Patricia', schedules: ['14:30 - 23:01', 'Descanso', '14:30 - 23:02', '14:30 - 23:03', '14:30 - 23:04', '14:30 - 23:05', '14:30 - 23:06'] },
  { name: 'Candida', schedules: ['14:30 - 23:02', 'Descanso', '14:30 - 23:02', '14:30 - 23:03', '14:30 - 23:04', '14:30 - 23:05', '14:30 - 23:06'] },
  { name: 'Fernanda', schedules: ['14:30 - 23:02', 'Descanso', '14:30 - 23:02', '14:30 - 23:03', '14:30 - 23:04', '14:30 - 23:05', '14:30 - 23:06'] },
  { name: 'Barbara', schedules: ['14:30 - 23:04', 'Descanso', '14:30 - 23:02', '14:30 - 23:03', '14:30 - 23:04', '14:30 - 23:05', '14:30 - 23:06'] },
  { name: 'Sarahi', schedules: ['14:30 - 23:05', 'Descanso', '14:30 - 23:02', '14:30 - 23:03', '14:30 - 23:04', '14:30 - 23:05', '14:30 - 23:06'] },
  { name: 'Edgar', schedules: ['14:30 - 23:06', 'Descanso', '14:30 - 23:02', '14:30 - 23:03', '14:30 - 23:04', '14:30 - 23:05', '14:30 - 23:06'] },
  { name: 'Nohemi', schedules: ['14:30 - 23:07', 'Descanso', '14:30 - 23:02', '14:30 - 23:03', '14:30 - 23:04', '14:30 - 23:05', '14:30 - 23:06'] },
];

const days = ['Sábado', 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export const StaffSchedule: React.FC = () => {
  return (
    <div className="p-4">
      <Table 
        removeWrapper 
        aria-label="Horario del personal"
        classNames={{
          th: "bg-default-100",
          td: "py-2 px-3",
        }}
      >
        <TableHeader>
          <TableColumn className="w-24">Nombre</TableColumn>
          {days.map((day) => (
            <TableColumn key={day}>{day}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {staffSchedule.map((staff, index) => (
            <TableRow key={`${staff.name}-${index}`}>
              <TableCell className="font-medium">{staff.name}</TableCell>
              {staff.schedules.map((schedule, idx) => (
                <TableCell 
                  key={idx}
                  className={schedule === 'Descanso' ? 'text-danger' : ''}
                >
                  {schedule}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};