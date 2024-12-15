import React from 'react';
import { Tabs, Tab, Card } from '@nextui-org/react';
import { WeeklySchedule } from './WeeklySchedule';
import { StaffSchedule } from './StaffSchedule';

export const ScheduleTable: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Horarios</h2>
      
      <Card>
        <Tabs aria-label="Horarios" color="primary" variant="underlined">
          <Tab key="my-schedule" title="Mis Horarios">
            <WeeklySchedule />
          </Tab>
          <Tab key="staff-schedule" title="Personal">
            <StaffSchedule />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};