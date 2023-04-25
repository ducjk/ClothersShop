import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Customer } from 'src/app/components/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  names = 'Customers';
  name = 'Customer';
  constructor(private apiService: ApiService) {}
  getCustomer(searchvalue: any = null): Observable<Customer[]> {
    return this.apiService.getList(searchvalue, this.names, this.name);
  }

  getById(id: number): Observable<Customer> {
    return this.apiService.getById(id, this.names);
  }
  update(data: Customer, id: number): Observable<Customer> {
    return this.apiService.update(data, id, this.names);
  }
  add(data: Customer): Observable<Customer> {
    return this.apiService.add(data, this.names);
  }
  delete(id: number): Observable<any> {
    return this.apiService.delete(id, this.names);
  }
}
