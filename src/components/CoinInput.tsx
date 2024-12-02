import React from 'react';
import { Card, CardBody, Input } from '@nextui-org/react';

interface CoinInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const CoinInput: React.FC<CoinInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Monedas</div>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            classNames={{
              base: "w-32"
            }}
            size="sm"
          />
        </div>
      </CardBody>
    </Card>
  );
};