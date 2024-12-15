export interface Product {
  id: string;
  label: string;
  code: string;
  barcode: string;
  type: string;
  description?: string;
  tags?: string[];
}

export interface ProductSearchState {
  query: string;
  products: Product[];
  filteredProducts: Product[];
}

export interface ProductTag {
  id: string;
  name: string;
}