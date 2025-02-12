export interface Seller {
  id: string;
  name: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  seller: Seller;
}

export type ProductCreateInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type ProductUpdateInput = Partial<ProductCreateInput>;

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sellerId?: string;
}

export interface ProductSortOptions {
  field: keyof Product;
  order: 'asc' | 'desc';
}
