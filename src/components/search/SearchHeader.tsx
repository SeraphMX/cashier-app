import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { Search, Scan, Plus } from 'lucide-react';

interface SearchHeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
  onScanClick: () => void;
  onAddClick: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  query,
  onQueryChange,
  onScanClick,
  onAddClick,
}) => {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-background/70 backdrop-blur-md border-b border-divider">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar por código o etiqueta..."
            startContent={<Search className="w-4 h-4 text-default-400" />}
            classNames={{
              input: "text-small",
            }}
            className="flex-1"
          />
          <Button
            isIconOnly
            color="primary"
            variant="flat"
            onPress={onScanClick}
          >
            <Scan className="w-5 h-5" />
          </Button>
          <Button
            isIconOnly
            color="primary"
            onPress={onAddClick}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};