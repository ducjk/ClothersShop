import { Customer } from './customer';
import { Employee } from './employee';
import { orderDetail } from './order-detail';
import { Product } from './product';

export interface Order {
  id: number;
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
