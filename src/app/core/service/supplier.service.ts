import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/components/supplier';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  names = 'Suppliers';
  name = 'Supplier';
  constructor(private apiService: ApiService) {}
  getSuppliers(searchvalue: any = null): Observable<Supplier[]> {
    return this.apiService.getList(searchvalue, this.names, this.name);
  }

  getByid(id: number): Observable<Supplier> {
    return this.apiService.getByid(id, this.names);
  }
  update(data: Supplier[], id: number): Observable<Supplier> {
    return this.apiService.update(data, id, this.names);
  }
  add(data: Supplier[]): Observable<Supplier> {
    return this.apiService.add(data, this.names);
  }
  delete(id: number): Observable<any> {
    return this.apiService.delete(id, this.names);
  }
}
