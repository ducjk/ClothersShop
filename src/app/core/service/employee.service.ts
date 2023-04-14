import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/components/employee';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  names = 'Employees';
  name = 'Employee';
  constructor(private apiService: ApiService) {}
  getSuppliers(searchvalue: any = null): Observable<Employee[]> {
    return this.apiService.getList(searchvalue, this.names, this.name);
  }

  getByid(id: number): Observable<Employee> {
    return this.apiService.getByid(id, this.names);
  }
  update(data: Employee[], id: number): Observable<Employee> {
    return this.apiService.update(data, id, this.names);
  }
  add(data: Employee[]): Observable<Employee> {
    return this.apiService.add(data, this.names);
  }
  delete(id: number): Observable<any> {
    return this.apiService.delete(id, this.names);
  }
}
