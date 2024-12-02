import React from 'react';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Calculator, RefreshCw } from 'lucide-react';

interface TotalDisplayProps {
  total: number;
  onReset: () => void;
}

export const TotalDisplay: React.FC<TotalDisplayProps> = ({ total, onReset }) => {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calculator className="w-6 h-6 text-primary" />
            <div>
              <div className="text-sm text-default-500">Total</div>
              <div className="text-2xl font-bold text-primary">
                ${total.toLocaleString()}
              </div>
            </div>
          </div>
          <Button
            color="danger"
            variant="flat"
            startContent={<RefreshCw className="w-4 h-4" />}
            onClick={onReset}
          >
            Reiniciar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};