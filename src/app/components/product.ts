import { Category } from './category';
import { Supplier } from './supplier';

export interface Product {
  id: number;
  ProductName: string;
  Price: string;
  CategoryID: number;
  SupplierID: number;
  Unit: string;
  Photo: [];
  Size: [];
  Color: [];
  Quantity: number;
  Category: Category;
  Supplier: Supplier;
}
