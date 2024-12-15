import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { MembershipType } from '../../types/membership';
import { NumberControls } from '../common/NumberControls';

interface MembershipCounterProps {
  membership: MembershipType;
  onCountChange: (id: string, count: number) => void;
}

export const MembershipCounter: React.FC<MembershipCounterProps> = ({ 
  membership, 
  onCountChange 
}) => {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="w-32 flex flex-col">
            <span className="text-lg font-semibold">{membership.name}</span>
            <span className="text-sm text-default-500">
              ${membership.price.toLocaleString()}
            </span>
          </div>
          <NumberControls
            value={membership.count}
            onChange={(value) => onCountChange(membership.id, value)}
          />
          <div className="w-32 text-right text-default-500">
            = ${(membership.price * membership.count).toLocaleString()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};