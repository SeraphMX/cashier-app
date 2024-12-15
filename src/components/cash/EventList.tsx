import React from 'react';
import { Card, CardBody, Chip } from '@nextui-org/react';
import { ArrowDownCircle, ArrowUpCircle, AlertTriangle, PlusCircle, DollarSign } from 'lucide-react';
import { CashEvent } from '../../types/cash';

interface EventListProps {
  events: CashEvent[];
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'initial':
      return <DollarSign className="w-5 h-5 text-success" />;
    case 'withdrawal':
    case 'withdrawal-fund':
      return <ArrowDownCircle className="w-5 h-5 text-danger" />;
    case 'shortage':
      return <AlertTriangle className="w-5 h-5 text-danger" />;
    case 'surplus':
      return <AlertTriangle className="w-5 h-5 text-warning" />;
    case 'deposit':
      return <PlusCircle className="w-5 h-5 text-success" />;
    default:
      return null;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'initial':
      return 'success';
    case 'withdrawal':
    case 'withdrawal-fund':
    case 'shortage':
      return 'danger';
    case 'surplus':
      return 'warning';
    case 'deposit':
      return 'success';
    default:
      return 'default';
  }
};

export const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Card key={event.id}>
          <CardBody>
            <div className="flex items-center gap-4">
              {getEventIcon(event.type)}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{event.description}</p>
                    <p className="text-small text-default-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Chip
                    color={getEventColor(event.type)}
                    variant="flat"
                  >
                    ${event.amount.toLocaleString()}
                  </Chip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};