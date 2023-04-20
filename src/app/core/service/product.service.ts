import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from 'src/app/components/product';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  names = 'Products';
  name = 'Product';
  constructor(private apiService: ApiService, private http: HttpClient) {}
  // getProducts(searchvalue: any = null): Observable<Product[]> {
  //   return this.apiService.getList(searchvalue, this.names, this.name);
  // }
  getProducts(searchValue:any=null): Observable<Product[]> {
    return this.apiService.getExpand(searchValue);
  }

  getById(id: number): Observable<Product> {
    return this.apiService.getById(id, this.names);
  }
  update(data: Product, id: number): Observable<Product> {
    return this.apiService.update(data, id, this.names);
  }
  add(data: Product): Observable<Product> {
    return this.apiService.add(data, this.names);
  }
  delete(id: number): Observable<any> {
    return this.apiService.delete(id, this.names);
  }
}
