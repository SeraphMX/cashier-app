import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { DenominationCount } from '../types/money';
import { NumberControls } from './NumberControls';

interface BillCounterProps {
  bill: DenominationCount;
  onCountChange: (denomination: number, count: number) => void;
}

export const BillCounter: React.FC<BillCounterProps> = ({ bill, onCountChange }) => {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="w-24 text-lg font-semibold">
            ${bill.value.toLocaleString()}
          </div>
          <NumberControls
            value={bill.count}
            onChange={(value) => onCountChange(bill.value, value)}
          />
          <div className="w-32 text-right text-default-500">
            = ${(bill.value * bill.count).toLocaleString()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};