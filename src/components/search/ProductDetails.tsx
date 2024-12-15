import React, { useState } from 'react';
import { Card, CardBody, Chip, Divider, Button } from '@nextui-org/react';
import { Trash2 } from 'lucide-react';
import { Product } from '../../types/product';
import { generateEAN13 } from '../../utils/barcode';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface ProductDetailsProps {
  product: Product;
  onDelete?: () => void;
}

const typeColors = {
  producto: "success",
  servicio: "primary",
  promocion: "warning",
  especial: "secondary",
} as const;

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const barcodeData = product.barcode || generateEAN13(product.code);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold mb-2">{product.label}</h3>
          {product.description && (
            <p className="text-default-500">{product.description}</p>
          )}
        </div>
        {onDelete && (
          <Button
            isIconOnly
            color="danger"
            variant="light"
            onPress={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        )}
      </div>

      <Divider />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-small text-default-500 mb-1">Tipo</p>
          <Chip
            color={typeColors[product.type as keyof typeof typeColors] || "default"}
            variant="flat"
            className="capitalize"
          >
            {product.type}
          </Chip>
        </div>
        <div>
          <p className="text-small text-default-500 mb-1">Código</p>
          <p className="font-semibold">{product.code}</p>
        </div>
      </div>

      {product.tags && product.tags.length > 0 && (
        <div>
          <p className="text-small text-default-500 mb-2">Etiquetas</p>
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag) => (
              <Chip
                key={tag}
                size="sm"
                variant="flat"
                color="primary"
                className="capitalize"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardBody className="text-center">
          <p className="text-small text-default-500 mb-2">Código de Barras</p>
          <img
            src={`https://bwipjs-api.metafloor.com/?bcid=ean13&text=${barcodeData}&scale=3&includetext`}
            alt="Barcode"
            className="mx-auto"
          />
        </CardBody>
      </Card>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onDelete}
        title="Eliminar Producto"
        message={`¿Estás seguro que deseas eliminar el producto "${product.label}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  );
};