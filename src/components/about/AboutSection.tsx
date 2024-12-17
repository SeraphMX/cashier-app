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
              en el manejo de membresías, conteo de dinero y gestión de códigos. El objetivo es hacer más 
              eficiente el trabajo del personal de cajas y mejorar la experiencia tanto para socios como asociados.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Características principales</h3>
             <p className="text-default-500">
              La aplicacion cuenta con diferentes modulos y funciones entre las que destacan:
            </p>
            <ul className="list-disc list-inside text-default-500 space-y-1">
              <li>Contador de dinero intuitivo</li>
              <li>Registro de movimientos de caja </li>              
              <li>Contador de membresías, upgrades y visitas "045"</li>
              <li>Búsqueda de productos que no pasan normalmente o promociones actuales, creando códigos de barras (que puedes leer usando el lector)</li>
              <li>Control de metas de ventas</li>
              <li>Gestión de horarios</li>   
            </ul>
          </div>

          <div>            
            <h3 className="text-lg font-semibold mb-2">Sobre el manejo de los datos</h3>
            <p className="text-default-500">
              En este momento todos los datos que al macena la app, se guardan unicamente en tu dispositivo , por lo que si los eliminas no podre ayudarte a recuperarlos, en una futura actualización probablemente agregue una opcion para sincronizar algunos datos en la nube para habilitar funciones avanzadas o dinamicas grupales.
            </p>
          </div>

           <div>            
            <h3 className="text-lg font-semibold mb-2">Acerca del desarrollador</h3>
            <p className="text-default-500">
              Mi nombre es Edgar Moreira y soy tu compañero en la línea de cajas... tengo experiencia de más de 18 años como programador y desarrollador de aplicaciones y sistemas. Esta es la primera vez que trabajo en otra industria diferente a tecnología y llevo apenas unos meses laborando en esta tienda, durante mi tiempo aqui he visto la necesidad de desarrollar esta aplicación para optimizar mi trabajo y he decidido compartirla con mis compañeros y mejorar la experiencia de los asociados que trabajamos en cajas. Espero que esta app, sea tan útil para ti como lo es para mi en el día a día y te agradezco que la uses. Todos los comentarios y propuestas serán bien recibidos y tratare de mantenerla disponnible indefinidamente (incluso si ya no trabajo aqui). Esta version de pruebas se actualiza de manera automatica y constante.
            </p>

             <p className="text-default-500">
              Aunque la aplicación esta desarrollada sin animo de lucro, puedes apoyar al proyecto con alguna donación, comentario o sugerencia.  O bien puedes recomendar mi trabajo con alguien más que necesite desarrollar alguna idea.
            </p>
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