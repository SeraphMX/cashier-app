import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Switch } from '@nextui-org/react';
import { FileText, X } from 'lucide-react';
import { Product } from '../../types/product';
import { TagInput } from './TagInput';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

const productTypes = [
  { value: 'producto', label: 'Producto' },
  { value: 'servicio', label: 'Servicio' },
  { value: 'promocion', label: 'Promoción' },
  { value: 'especial', label: 'Especial' },
];

const initialFormData = {
  type: 'producto',
  label: '',
  description: '',
  code: '',
  barcode: '',
  tags: [] as string[],
};

export const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [showDescription, setShowDescription] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
    setShowDescription(false);
    setShowBarcode(false);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          setFormData(initialFormData);
          setShowDescription(false);
          setShowBarcode(false);
          onClose();
        }
      }}
      size="lg"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Agregar Nuevo Producto
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Select
                  label="Tipo"
                  placeholder="Selecciona un tipo"
                  selectedKeys={[formData.type]}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  isRequired
                  defaultSelectedKeys={['producto']}
                >
                  {productTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>

                <div className="flex gap-2 items-center">
                  <Input
                    label="Etiqueta"
                    value={formData.label}
                    onValueChange={(value) => setFormData({ ...formData, label: value })}
                    isRequired
                    className="flex-1"
                  />
                  <Button
                    isIconOnly
                    variant="flat"
                    className="self-end"
                    onPress={() => setShowDescription(!showDescription)}
                    size="lg"
                  >
                    {showDescription ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {showDescription && (
                  <Input
                    label="Descripción"
                    placeholder="Ingresa la descripción"
                    value={formData.description}
                    onValueChange={(value) => setFormData({ ...formData, description: value })}
                  />
                )}

                <Input
                  label="Código"
                  value={formData.code}
                  onValueChange={(value) => setFormData({ ...formData, code: value })}
                  isRequired
                  type="number"
                />

                <div className="flex items-center gap-2">
                  <Switch
                    isSelected={showBarcode}
                    onValueChange={setShowBarcode}
                  />
                  <span className="text-small">Código de barras</span>
                </div>

                {showBarcode && (
                  <Input
                    label="Código de Barras"
                    placeholder="Ingresa el código de barras"
                    value={formData.barcode}
                    onValueChange={(value) => setFormData({ ...formData, barcode: value })}
                  />
                )}

                <TagInput
                  selectedTags={formData.tags}
                  onTagsChange={(tags) => setFormData({ ...formData, tags })}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Guardar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};