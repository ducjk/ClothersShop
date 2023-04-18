import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order } from 'src/app/components/order';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  names = 'Orders';
  name = 'Order';
  constructor(private apiService: ApiService) {}
  getOrders(searchvalue: any = null): Observable<Order[]> {
    return this.apiService.getList(searchvalue, this.names, this.name);
  }

  getByid(id: number): Observable<Order> {
    return this.apiService.getByid(id, this.names);
  }
  update(data: Order, id: number): Observable<Order> {
    return this.apiService.update(data, id, this.names);
  }
  add(data: Order): Observable<Order> {
    return this.apiService.add(data, this.names);
  }
  delete(id: number): Observable<any> {
    return this.apiService.delete(id, this.names);
  }
}
