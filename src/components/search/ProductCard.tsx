import React, { useState } from 'react';
import { Card, CardBody, Chip, Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { Product } from '../../types/product';
import { ProductDetails } from './ProductDetails';

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => Promise<boolean>;
}

const typeColors = {
  producto: "success",
  servicio: "primary",
  promocion: "warning",
  especial: "secondary",
} as const;

export const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (onDelete && await onDelete(product.id)) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Card isPressable onPress={() => setIsModalOpen(true)} className="w-full">
        <CardBody>
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{product.label}</p>
                {product.description && (
                  <p className="text-small text-default-500">
                    {product.description}
                  </p>
                )}
                <p className="text-small text-default-500">
                  {product.code}
                </p>
              </div>
              <Chip
                color={typeColors[product.type as keyof typeof typeColors] || "default"}
                variant="flat"
                className="capitalize"
              >
                {product.type}
              </Chip>
            </div>
            
            {product.tags && product.tags.length > 0 && (
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
            )}
          </div>
        </CardBody>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Detalles del Producto</ModalHeader>
              <ModalBody className="pb-6">
                <ProductDetails product={product} onDelete={handleDelete} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};