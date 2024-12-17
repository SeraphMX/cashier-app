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
          <div className="w-32">
            <span className="text-lg font-semibold">Visitas</span>
            <p className="text-sm text-danger-300">
              045
            </p>
          </div>
          <NumberControls
            value={count}
            onChange={onCountChange}
          />
          <div className="w-32 text-right text-default-500">
            {count}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};