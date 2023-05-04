import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { orderDetail } from 'src/app/components/order-detail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  names = 'OrderDetails';
  name = 'OrderId';
  constructor(private apiService: ApiService, private http: HttpClient) {}
  getOrderDetail(searchValue: any = null): Observable<orderDetail[]> {
    return this.apiService.getList(searchValue, this.names, this.name);
  }
  getById(id: number): Observable<orderDetail> {
    return this.apiService.getById(id, this.names);
  }
}
