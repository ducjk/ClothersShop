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
    console.log('token: ' + this.auth_token);

    let url = `${this.urlAPI}/Supplier`;
    if (searchvalue != null) {
      url = `${url}?SupplierName_like=` + searchvalue;
    }
    return this.http.get<Supplier[]>(url, { headers: this.headers });
  }
  getPost(acc: any): Observable<any> {
    {
      return this.http.post<any>('http://localhost:3000/Supplier', acc);
    }
  }
  getByid(id:number):Observable<Supplier[]>{
    let url = `${this.urlAPI}/Supplier/`+id;
    return this.http.get<Supplier[]>(url, { headers: this.headers });
  }
   update(data:Supplier[]):Observable<Supplier[]>{
    let url = `${this.urlAPI}/Supplier`+data;
    return this.http.put<Supplier[]>(url, { headers: this.headers });
  }
}
