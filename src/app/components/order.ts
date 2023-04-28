import { Customer } from './customer';
import { Employee } from './employee';
import { Product } from './product';

export interface Order {
  id: number;
  orderDetail: [
    {
      ProductId: number;
      quantity: number;
      salePrice: number;
      productName: string;
      price: number;
      total:number 
    }
  ];
  EmployeeId: number;
  employeeName: string;
  customerName: string;
  CustomerId: number;
  orderTime: string;
  acceptTime: string;
  shippingTime: string;
  finishedTime: string;
  status: number;
  Customer: Customer;
}
