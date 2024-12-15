import React from 'react';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Calculator, RefreshCw, ArrowDownCircle } from 'lucide-react';

interface TotalDisplayProps {
  total: number;
  onReset: () => void;
  onWithdraw?: () => void;
}

export const TotalDisplay: React.FC<TotalDisplayProps> = ({ 
  total, 
  onReset,
  onWithdraw 
}) => {
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
          <div className="flex gap-2">
            {onWithdraw && (
              <Button
                color="primary"
                variant="flat"
                startContent={<ArrowDownCircle className="w-4 h-4" />}
                onClick={onWithdraw}
              >
                Retiro
              </Button>
            )}
            <Button
              color="danger"
              variant="flat"
              startContent={<RefreshCw className="w-4 h-4" />}
              onClick={onReset}
            >
              Reiniciar
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};