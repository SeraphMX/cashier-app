import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { ArrowDownCircle, PlusCircle, DollarSign, Trash2 } from 'lucide-react';
import { CashEvent } from '../../types/cash';
import { useCashRegister } from '../../hooks/useCashRegister';
import { EventModal } from './EventModal';
import { EventList } from './EventList';
import { ConfirmationModal } from '../common/ConfirmationModal';

export const CashRegister: React.FC = () => {
  const { 
    events, 
    addEvent, 
    closeRegister, 
    openRegister, 
    hasInitialFund,
    canWithdrawFund,
    hasFundWithdrawn,
    getInitialFundAmount,
    isRegisterClosed,
    clearAllData 
  } = useCashRegister();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isClearDataModalOpen, setIsClearDataModalOpen] = useState(false);
  const [eventType, setEventType] = useState<CashEvent['type']>('initial');

  const handleAddEvent = (amount: number, selectedType?: CashEvent['type']) => {
    const type = selectedType || eventType;
    addEvent({
      type,
      amount,
      description: type === 'withdrawal-fund' ? 'Retiro de Fondo' : 
                  type === 'shortage' ? 'Faltante' :
                  type === 'surplus' ? 'Sobrante' :
                  type === 'deposit' ? 'Dotación' :
                  type === 'initial' ? 'Fondo Inicial' : 'Retiro'
    });
    setIsEventModalOpen(false);
  };

  const handleCloseRegister = () => {
    closeRegister();
    setIsCloseModalOpen(false);
  };

  const handleClearData = () => {
    clearAllData();
    setIsClearDataModalOpen(false);
  };

  return (
    <div className="space-y-4 pb-16">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Registro de Caja</h2>
        
        <div className="flex flex-wrap gap-2">
          {isRegisterClosed ? (
            <Button
              color="success"
              startContent={<DollarSign className="w-4 h-4" />}
              onPress={openRegister}
            >
              Abrir Caja
            </Button>
          ) : (
            <>
              {!hasInitialFund && (
                <Button
                  color="success"
                  startContent={<DollarSign className="w-4 h-4" />}
                  onPress={() => {
                    setEventType('initial');
                    setIsEventModalOpen(true);
                  }}
                >
                  Iniciar Caja
                </Button>
              )}
              
              {hasInitialFund && (
                <>
                  <Button
                    color="primary"
                    startContent={<PlusCircle className="w-4 h-4" />}
                    onPress={() => {
                      setEventType('deposit');
                      setIsEventModalOpen(true);
                    }}
                  >
                    Registrar Evento
                  </Button>
                  {canWithdrawFund && (
                    <Button
                      color="danger"
                      variant="flat"
                      startContent={<ArrowDownCircle className="w-4 h-4" />}
                      onPress={() => {
                        setEventType('withdrawal-fund');
                        setIsEventModalOpen(true);
                      }}
                    >
                      Retiro de Fondo
                    </Button>
                  )}
                  {hasFundWithdrawn && (
                    <Button
                      color="danger"
                      variant="flat"
                      startContent={<DollarSign className="w-4 h-4" />}
                      onPress={() => setIsCloseModalOpen(true)}
                    >
                      Cerrar Caja
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <EventList events={events} />

      <div className="fixed bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md border-t border-divider p-2">
        <div className="max-w-2xl mx-auto">
          <Button
            color="danger"
            variant="flat"
            startContent={<Trash2 className="w-4 h-4" />}
            onPress={() => setIsClearDataModalOpen(true)}
            fullWidth
          >
            Test Mode: Limpiar Datos
          </Button>
        </div>
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleAddEvent}
        type={eventType}
        initialAmount={eventType === 'withdrawal-fund' ? getInitialFundAmount() : undefined}
      />

      <ConfirmationModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleCloseRegister}
        title="Cerrar Caja"
        message="¿Estás seguro que deseas cerrar la caja? Esta acción no se puede deshacer."
        confirmLabel="Cerrar Caja"
      />

      <ConfirmationModal
        isOpen={isClearDataModalOpen}
        onClose={() => setIsClearDataModalOpen(false)}
        onConfirm={handleClearData}
        title="Limpiar Datos"
        message="¿Estás seguro que deseas eliminar todos los datos del registro de caja? Esta acción no se puede deshacer."
        confirmLabel="Eliminar Datos"
      />
    </div>
  );
};