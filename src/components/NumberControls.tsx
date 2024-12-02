import React from 'react';
import { Button, Input } from '@nextui-org/react';
import { Minus, Plus } from 'lucide-react';

interface NumberControlsProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export const NumberControls: React.FC<NumberControlsProps> = ({
  value,
  onChange,
  min = 0,
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        onClick={handleDecrement}
        isDisabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <Input
        type="number"
        min={min}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        classNames={{
          input: "text-center",
          base: "w-24"
        }}
        size="sm"
      />
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        onClick={handleIncrement}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};