import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { WeeklyGoals } from '../../types/goals';

interface GoalsEditorProps {
  isOpen: boolean;
  onClose: () => void;
  goals: WeeklyGoals;
  onSave: (goals: WeeklyGoals) => void;
}

export const GoalsEditor: React.FC<GoalsEditorProps> = ({
  isOpen,
  onClose,
  goals,
  onSave,
}) => {
  const [minimum, setMinimum] = useState(goals.minimum.toString());
  const [niches, setNiches] = useState(goals.niches.toString());

  const handleSave = () => {
    onSave({
      minimum: parseInt(minimum) || 0,
      niches: parseInt(niches) || 0,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Editar Metas Semanales</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  type="number"
                  label="Meta Mínima"
                  value={minimum}
                  onValueChange={setMinimum}
                />
                <Input
                  type="number"
                  label="Meta Nichos"
                  value={niches}
                  onValueChange={setNiches}
                />
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