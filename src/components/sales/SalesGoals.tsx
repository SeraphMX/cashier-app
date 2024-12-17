import React, { useState } from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Target, Users, Star, Settings } from 'lucide-react';
import { MembershipSalesHistory } from './MembershipSalesHistory';
import { MembershipSalesChart } from './MembershipSalesChart';
import { GoalsEditor } from './GoalsEditor';
import { useMembershipHistory } from '../../hooks/useMembershipHistory';
import { useWeeklyGoals } from '../../hooks/useWeeklyGoals';
import { calculateWeeklyMemberships } from '../../utils/membershipMetrics';

export const SalesGoals: React.FC = () => {
  const reports = useMembershipHistory();
  const { goals, updateGoals } = useWeeklyGoals();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [isEditing, setIsEditing] = useState(false);

  const weeklyTotal = calculateWeeklyMemberships(reports);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Metas Semanales</h2>
        <Button
          variant="flat"
          color="primary"
          startContent={<Settings className="w-4 h-4" />}
          onPress={() => setIsEditing(true)}
        >
          Editar Metas
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardBody>
             <p className="text-small text-default-500 text-center font-semibold pb-2">Meta Mínima</p>
            <div className="flex items-center gap-4">
             
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                
                <p className="text-2xl font-bold">{goals.minimum}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-small text-default-500 text-center font-semibold pb-2">Meta Nichos</p>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                
                <p className="text-2xl font-bold">{goals.niches}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-small text-default-500 text-center font-semibold pb-2"> Membresías</p>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-warning/10">
                <Star className="w-6 h-6 text-warning" />
              </div>
              <div>
                
                <p className="text-2xl font-bold">{weeklyTotal}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <MembershipSalesChart 
        reports={reports}
        selectedDate={selectedDate}
      />

      <MembershipSalesHistory 
        reports={reports}
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
      />

      <GoalsEditor 
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        goals={goals}
        onSave={updateGoals}
      />
    </div>
  );
};