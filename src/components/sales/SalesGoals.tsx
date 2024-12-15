import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Target, Users, Star } from 'lucide-react';

const membershipData = [
  { name: 'Clásica', value: 20, color: '#17C964' },
  { name: 'Benefits', value: 15, color: '#006FEE' },
  { name: 'Plus', value: 10, color: '#F5A524' },
];

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

export const SalesGoals: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Metas Semanales</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-small text-default-500">Meta Mínima</p>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-small text-default-500">Meta Nichos</p>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">30</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-small text-default-500">Mis Membresías</p>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-warning/10">
                <Star className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">25</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">
            Distribución de Membresías
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {membershipData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
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
    </div>
  );
};