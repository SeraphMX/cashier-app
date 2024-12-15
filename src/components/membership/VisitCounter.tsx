import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { NumberControls } from '../common/NumberControls';

interface VisitCounterProps {
  count: number;
  onCountChange: (count: number) => void;
}

export const VisitCounter: React.FC<VisitCounterProps> = ({ count, onCountChange }) => {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="w-32 text-lg font-semibold">
            Visitas
          </div>
          <NumberControls
            value={count}
            onChange={onCountChange}
          />
          <div className="w-32 text-right text-default-500">
            {String(count).padStart(3, '0')}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};