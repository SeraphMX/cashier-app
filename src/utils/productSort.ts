export const PRODUCT_TYPE_ORDER = {
  promocion: 1,
  servicio: 2,
  especial: 3,
  producto: 4,
};

export const sortProductsByType = <T extends { type: string }>(products: T[]): T[] => {
  return [...products].sort((a, b) => {
    const typeA = (a.type || '').toLowerCase();
    const typeB = (b.type || '').toLowerCase();
    
    const orderA = PRODUCT_TYPE_ORDER[typeA as keyof typeof PRODUCT_TYPE_ORDER] || 999;
    const orderB = PRODUCT_TYPE_ORDER[typeB as keyof typeof PRODUCT_TYPE_ORDER] || 999;
    
    return orderA - orderB;
  });
};