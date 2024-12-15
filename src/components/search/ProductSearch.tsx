import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { Search, Scan, Plus } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { BarcodeScanner } from './BarcodeScanner';
import { ProductForm } from './ProductForm';

interface ProductSearchProps {
  query: string;
  products: Product[];
  onQueryChange: (query: string) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => Promise<boolean>;
  onDeleteProduct: (id: string) => Promise<boolean>;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  query,
  products,
  onQueryChange,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleBarcodeScan = (barcode: string) => {
    onQueryChange(barcode);
  };

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    const success = await onAddProduct(product);
    if (success) {
      setIsFormOpen(false);
    }
  };

  return (
    <div className="space-y-4">
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
          onPress={() => setIsScannerOpen(true)}
        >
          <Scan className="w-5 h-5" />
        </Button>
        <Button
          isIconOnly
          color="primary"
          onPress={() => setIsFormOpen(true)}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onDelete={onDeleteProduct}
          />
        ))}
      </div>

      <BarcodeScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleBarcodeScan}
      />

      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};