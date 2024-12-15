import React from 'react';
import { Card, CardBody, Button, Link } from '@nextui-org/react';
import { Heart, MessageSquarePlus } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Acerca de la Aplicación</h2>
      
      <Card>
        <CardBody className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">¿Por qué se creó esta app?</h3>
            <p className="text-default-500">
              Esta aplicación fue desarrollada para simplificar y agilizar las tareas diarias
              en el manejo de membresías, conteo de dinero y gestión de inventario. Nuestro
              objetivo es hacer más eficiente el trabajo del personal y mejorar la experiencia
              tanto para los empleados como para los clientes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Características principales</h3>
            <ul className="list-disc list-inside text-default-500 space-y-1">
              <li>Contador de dinero intuitivo</li>
              <li>Gestión de membresías</li>
              <li>Búsqueda de productos con códigos de barras</li>
              <li>Control de metas de ventas</li>
              <li>Gestión de horarios del personal</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              color="primary"
              variant="flat"
              startContent={<Heart className="w-4 h-4" />}
              as={Link}
              href="https://ko-fi.com/cashierapp"
              target="_blank"
              className="w-full"
            >
              Apoyar el Proyecto
            </Button>
            
            <Button
              color="secondary"
              variant="flat"
              startContent={<MessageSquarePlus className="w-4 h-4" />}
              as={Link}
              href="https://forms.gle/xyz123"
              target="_blank"
              className="w-full"
            >
              Enviar Sugerencias
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};