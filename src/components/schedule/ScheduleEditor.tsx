import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Switch } from '@nextui-org/react';
import { formatDate } from '../../utils/date';

interface ScheduleEditorProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  startTime: string;
  isRestDay?: boolean;
  onSave: (startTime: string, isRestDay: boolean) => void;
}

export const ScheduleEditor: React.FC<ScheduleEditorProps> = ({
  isOpen,
  onClose,
  date,
  startTime,
  isRestDay = false,
  onSave,
}) => {
  const [time, setTime] = React.useState(startTime);
  const [isRest, setIsRest] = React.useState(isRestDay);

  const handleSave = () => {
    onSave(time, isRest);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Editar Horario</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-default-500">
                  {formatDate(date)}
                </p>
                
                <div className="flex items-center gap-2">
                  <Switch
                    isSelected={isRest}
                    onValueChange={setIsRest}
                    color="success"
                  />
                  <span className="text-small">Día de descanso</span>
                </div>

                {!isRest && (
                  <>
                    <Input
                      type="time"
                      label="Hora de entrada"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    <p className="text-small text-default-500">
                      La hora de salida se calculará automáticamente agregando 9 horas a la hora de entrada.
                      Si la hora calculada es después de las 11:00 PM, se ajustará a 11:00 PM.
                    </p>
                  </>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSave}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};