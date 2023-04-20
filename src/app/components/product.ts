import { Category } from './category';
import { Supplier } from './supplier';

export interface Product {
  id: number;
  productName: string;
  price: string;
  CategoryId: number;
  SupplierId: number;
  unit: string;
  photo: [];
  size: [];
  color: [];
  quantity: number;
  Category: Category;
  Supplier: Supplier;
}
