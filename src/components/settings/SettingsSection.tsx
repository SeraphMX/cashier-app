import React, { useState } from 'react';
import { Card, CardBody, Switch, RadioGroup, Radio, Button, Divider } from '@nextui-org/react';
import { AlertTriangle } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';
import { ConfirmationModal } from '../common/ConfirmationModal';

export const SettingsSection: React.FC = () => {
  const { settings, updateSettings, clearAllData } = useSettings();
  const [showClearDataModal, setShowClearDataModal] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Configuración</h2>
      
      <Card>
        <CardBody className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Modo de Pruebas</h3>
            <div className="flex items-center gap-2">
              <Switch
                isSelected={settings.testMode}
                onValueChange={(value) => updateSettings({ ...settings, testMode: value })}
                color="warning"
              />
              <span className="text-small">
                Activar modo de pruebas
              </span>
            </div>
            <p className="text-small text-default-500 mt-2">
              En modo de pruebas, los datos no se guardarán permanentemente y se mostrarán indicadores especiales.
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-semibold mb-4">Perfil de Usuario</h3>
            <RadioGroup
              value={settings.profile}
              onValueChange={(value) => updateSettings({ ...settings, profile: value })}
            >
              <Radio value="cashier">Cajero</Radio>
              <Radio value="services">Servicios</Radio>
              <Radio value="supervisor">Supervisor</Radio>
            </RadioGroup>
            <p className="text-small text-default-500 mt-2">
              El perfil determina las funciones disponibles y el nivel de acceso.
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-semibold mb-4">Datos de la Aplicación</h3>
            <p className="text-small text-default-500 mb-4">
              Puedes eliminar todos los datos almacenados localmente. Esta acción no se puede deshacer.
            </p>
            <Button
              color="danger"
              variant="flat"
              startContent={<AlertTriangle className="w-4 h-4" />}
              onPress={() => setShowClearDataModal(true)}
            >
              Eliminar Todos los Datos
            </Button>
          </div>
        </CardBody>
      </Card>

      <ConfirmationModal
        isOpen={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        onConfirm={() => {
          clearAllData();
          setShowClearDataModal(false);
        }}
        title="Eliminar Todos los Datos"
        message="¿Estás seguro que deseas eliminar todos los datos de la aplicación? Esta acción no se puede deshacer y perderás todo el historial de ventas, horarios y configuraciones."
        confirmLabel="Eliminar Datos"
      />
    </div>
  );
};