import { useState, useCallback, useEffect } from 'react';
import { Product, ProductSearchState } from '../types/product';
import { supabase } from '../lib/supabase';
import { sortProductsByType } from '../utils/productSort';
import type { RealtimeChannel } from '@supabase/supabase-js';

export const useProducts = () => {
  const [state, setState] = useState<ProductSearchState>({
    query: '',
    products: [],
    filteredProducts: [],
  });

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('codigos')
        .select('*')
        .order('label');

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      const products = data.map(item => ({
        id: item.id,
        label: item.label,
        code: item.code,
        barcode: item.barcode || '',
        type: item.type,
        description: item.description || '',
        tags: item.tags ? item.tags.split(',').map(tag => tag.trim()) : [],
      }));

      setState(prev => ({
        ...prev,
        products,
        filteredProducts: sortProductsByType(filterProducts(products, prev.query)),
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('codigos')
        .insert([{
          label: product.label,
          code: product.code,
          barcode: product.barcode || null,
          type: product.type,
          description: product.description || null,
          tags: product.tags?.length ? product.tags.join(',') : null,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding product:', error);
        return false;
      }

      // Refresh products list
      await fetchProducts();
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('codigos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        return false;
      }

      // Refresh products list
      await fetchProducts();
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const filterProducts = useCallback((products: Product[], query: string) => {
    const searchTerm = query.toLowerCase();
    return products.filter((product) => (
      product.code?.toLowerCase().includes(searchTerm) ||
      product.label?.toLowerCase().includes(searchTerm) ||
      product.type?.toLowerCase().includes(searchTerm) ||
      product.barcode?.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    ));
  }, []);

  const updateQuery = useCallback((query: string) => {
    setState((prev) => ({
      ...prev,
      query,
      filteredProducts: sortProductsByType(filterProducts(prev.products, query)),
    }));
  }, [filterProducts]);

  useEffect(() => {
    let channel: RealtimeChannel;

    const setupRealtime = async () => {
      await fetchProducts();

      channel = supabase
        .channel('products_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'codigos',
          },
          async () => {
            await fetchProducts();
          }
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return {
    query: state.query,
    products: state.filteredProducts,
    updateQuery,
    addProduct,
    deleteProduct,
  };
};