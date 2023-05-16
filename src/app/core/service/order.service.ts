import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order } from 'src/app/components/order';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  names = 'Orders';
  name = 'Order';
  attribute = 'customerName';
  constructor(private apiService: ApiService, private http: HttpClient) {}
  getOrders(searchvalue: any = null): Observable<Order[]> {
    return this.apiService.getList(searchvalue, this.names, this.name);
  }
  getOrderWithPage(searchValue: any = null, page: number, limit: number) {
    return this.apiService.getListWithPage(searchValue, page, limit, this.names, this.attribute);
  }
  getOrderWithPageOfStatus(searchValue: any = null, status: number, page: number, limit: number) {
    return this.apiService.getListWithPageOrStatus(
      searchValue,
      status,
      page,
      limit,
      this.names,
      this.attribute
    );
  }

  getExpand(searchvalue: any = null): Observable<any[]> {
    if (searchvalue != null) {
      return this.http.get<any[]>(
        `http://localhost:3000/Orders?_expand=Employee&_expand=Customer&customerName_like=${searchvalue}`
      );
    }
    return this.http.get<any[]>(`http://localhost:3000/Orders?_expand=Employee&_expand=Customer`);
  }
  getExpandId(id: number): Observable<Order> {
    return this.http.get<Order>(
      `http://localhost:3000/Orders/${id}?&_expand=Employee&_expand=Customer`
    );
  }
  getById(id: number): Observable<Order> {
    return this.apiService.getById(id, this.names);
  }
  update(data: Order, id: number): Observable<Order> {
    return this.apiService.update(data, id, this.names);
  }
  updateAllField(data: Order, id: number): Observable<Order> {
    return this.apiService.updateWithoutAllField(data, id, this.names);
  }
  add(data: Order): Observable<Order> {
    return this.apiService.add(data, this.names);
  }
  delete(id: number): Observable<any> {
    return this.apiService.delete(id, this.names);
  }
}
