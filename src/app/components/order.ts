import { Customer } from './customer';
import { Employee } from './employee';

export interface Order {
  id: number;
  orderList: [];
  EmployeeId: number;
  CustomerId: number;
  orderTime: string;
  acceptTime: string;
  shippingTime: string;
  finishedTime: string;
  status: number;
  Employee: Employee;
  Customer: Customer;
}
