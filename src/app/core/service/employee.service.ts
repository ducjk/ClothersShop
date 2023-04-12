import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/components/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  auth_token = this.cookieService.get('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.auth_token,
  });
  private urlAPI = 'http://localhost:3000';
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  getEmployees(searchvalue: any = null): Observable<Employee[]> {
    let url = `${this.urlAPI}/Employees`;
    if (searchvalue != null) {
      url = `${url}?fullname_like=` + searchvalue;
    }
    return this.http.get<Employee[]>(url, { headers: this.headers });
  }
  getByid(id: number): Observable<Employee> {
    let url = `${this.urlAPI}/Employees/` + id;
    return this.http.get<Employee>(url, { headers: this.headers });
  }
  update(data: Employee[], id: number): Observable<Employee[]> {
    let url = `${this.urlAPI}/Employees/` + id;
    return this.http.put<Employee[]>(url, data, { headers: this.headers });
  }
  add(data: Employee[]): Observable<Employee[]> {
    let url = `${this.urlAPI}/Employees`;
    return this.http.post<Employee[]>(url, data, { headers: this.headers });
  }
  delete(id: number): Observable<Employee[]> {
    let url = `${this.urlAPI}/Employees/` + id;
    return this.http.delete<Employee[]>(url, { headers: this.headers });
  }
}
