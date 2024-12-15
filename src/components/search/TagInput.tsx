import React, { useMemo } from 'react';
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react';
import { X } from 'lucide-react';

interface TagInputProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const defaultTags = [
  'Nuevo', 'Promoción', 'Descuento', 'Limitado',
  'Popular', 'Recomendado', 'Exclusivo', 'Temporada'
];

export const TagInput: React.FC<TagInputProps> = ({
  selectedTags,
  onTagsChange,
}) => {
  const [value, setValue] = React.useState('');
  const [availableTags, setAvailableTags] = React.useState(defaultTags);

  const filteredTags = useMemo(() => {
    return availableTags.filter(tag => 
      !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, availableTags, selectedTags]);

  const handleSelectionChange = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
      setValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value && !filteredTags.includes(value)) {
      const newTag = value.trim();
      if (newTag && !selectedTags.includes(newTag)) {
        setAvailableTags([...availableTags, newTag]);
        onTagsChange([...selectedTags, newTag]);
        setValue('');
      }
    }
  };

  return (
    <div className="space-y-2">
      <Autocomplete
        label="Etiquetas"
        placeholder="Agregar etiqueta"
        value={value}
        onValueChange={setValue}
        onKeyDown={handleKeyDown}
        onSelectionChange={handleSelectionChange}
        className="max-w-full"
      >
        {filteredTags.map((tag) => (
          <AutocompleteItem key={tag} value={tag}>
            {tag}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            onClose={() => handleRemoveTag(tag)}
            variant="flat"
            color="primary"
            className="capitalize"
          >
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
};