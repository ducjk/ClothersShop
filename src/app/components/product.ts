import { Category } from './category';
import { Supplier } from './supplier';

export interface Product {
  id: number;
  productName: string;
  price: number;
  CategoryId: number;
  SupplierId: number;
  unit: string;
  photo: string;
  quantity: number;
}
