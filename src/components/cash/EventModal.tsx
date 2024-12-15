import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react';
import { CashEvent } from '../../types/cash';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, type?: CashEvent['type']) => void;
  type: CashEvent['type'];
  initialAmount?: number;
}

const eventTypes = [
  { value: 'deposit', label: 'Dotación' },
  { value: 'shortage', label: 'Faltante' },
  { value: 'surplus', label: 'Sobrante' },
];

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  type,
  initialAmount,
}) => {
  const [amount, setAmount] = useState('');
  const [selectedType, setSelectedType] = useState<CashEvent['type']>('deposit');

  useEffect(() => {
    if (initialAmount !== undefined) {
      setAmount(initialAmount.toString());
    } else if (type === 'initial') {
      setAmount('500');
    } else {
      setAmount('');
    }
  }, [initialAmount, type, isOpen]);

  const handleSubmit = () => {
    if (amount) {
      onSubmit(parseFloat(amount), type === 'deposit' ? selectedType : undefined);
      setAmount('');
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'initial':
        return 'Agregar Fondo Inicial';
      case 'withdrawal-fund':
        return 'Registrar Retiro de Fondo';
      default:
        return 'Registrar Evento';
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          setAmount('');
          onClose();
        }
      }}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{getTitle()}</ModalHeader>
            <ModalBody>
              {type === 'deposit' && (
                <Select
                  label="Tipo de Evento"
                  selectedKeys={[selectedType]}
                  onChange={(e) => setSelectedType(e.target.value as CashEvent['type'])}
                >
                  {eventTypes.map((eventType) => (
                    <SelectItem key={eventType.value} value={eventType.value}>
                      {eventType.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
              
              <Input
                type="number"
                label="Monto"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};