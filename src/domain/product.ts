export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}


// domain/product.ts
export interface Productss {
  id: string;
  title: string;
  image: string;
  price: { [key: string]: string };
  description: string;
}