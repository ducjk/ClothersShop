import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  auth_token = this.cookieService.get('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.auth_token,
  });

  private urlAPI = environment.apiURL;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  setToken(token: string) {
    this.auth_token = token;
  }

  callAPI(url: string): Observable<any> {
    return this.http.get<any>(`${this.urlAPI}${url}`, { headers: this.headers });
  }

  getList(searchvalue: any = null, names: string, name: string): Observable<any[]> {
    let url = `${this.urlAPI}/${names}`;
    if (searchvalue != null) {
      url = `${url}?${name}Name_like=` + searchvalue;
    }
    return this.http.get<any[]>(url, { headers: this.headers });
  }
  getByid(id: number, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}/` + id;
    return this.http.get<any>(url, { headers: this.headers });
  }
  update(data: any, id: number, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}/` + id;
    return this.http.put<any>(url, data, { headers: this.headers });
  }
  add(data: any, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}`;
    return this.http.post<any>(url, data, { headers: this.headers });
  }
  delete(id: number, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}/` + id;
    return this.http.delete<any>(url, { headers: this.headers });
  }
  getExpand(searchvalue: any = null): Observable<any[]> {
    if (searchvalue != null) {
      return this.http.get<any[]>(
        `http://localhost:3000/Products?_expand=Category&_expand=Supplier&ProductName_like=${searchvalue}`,
        {
          headers: this.headers,
        }
      );
    }
    return this.http.get<any[]>(
      `http://localhost:3000/Products?_expand=Category&_expand=Supplier`,
      {
        headers: this.headers,
      }
    );
  }
}
