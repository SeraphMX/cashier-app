import React, { useState } from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { BarcodeScanner } from './BarcodeScanner';
import { ProductForm } from './ProductForm';
import { SearchHeader } from './SearchHeader';

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
      <SearchHeader
        query={query}
        onQueryChange={onQueryChange}
        onScanClick={() => setIsScannerOpen(true)}
        onAddClick={() => setIsFormOpen(true)}
      />
      
      <div className="grid grid-cols-1 gap-2 pt-16">
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