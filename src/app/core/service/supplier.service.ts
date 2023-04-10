import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Supplier } from 'src/app/components/supplier';
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  auth_token = this.cookieService.get('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.auth_token,
  });
  private urlAPI = 'http://localhost:3000';
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  getSuppliers(searchvalue: any = null): Observable<Supplier[]> {
    let url = `${this.urlAPI}/Supplier`;
    if (searchvalue != null) {
      url = `${url}?SupplierName_like=` + searchvalue;
    }
    return this.http.get<Supplier[]>(url, { headers: this.headers });
  }
  getByid(id: number): Observable<Supplier> {
    let url = `${this.urlAPI}/Supplier/` + id;
    return this.http.get<Supplier>(url, { headers: this.headers });
  }
  update(data: Supplier[], id: number): Observable<Supplier[]> {
    let url = `${this.urlAPI}/Supplier/` + id;
    return this.http.put<Supplier[]>(url, data, { headers: this.headers });
  }
  add(data: Supplier[]): Observable<Supplier[]> {
    let url = `${this.urlAPI}/Supplier`;
    return this.http.post<Supplier[]>(url, data, { headers: this.headers });
  }
  delete(id: number): Observable<Supplier[]> {
    let url = `${this.urlAPI}/Supplier/` + id;
    return this.http.delete<Supplier[]>(url, { headers: this.headers });
  }
  getcountry(): any {
    let url = `${this.urlAPI}/Country`;
    return this.http.get(url, { headers: this.headers });
  }
}
