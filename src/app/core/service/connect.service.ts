// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
// import { Observable } from 'rxjs';
// import { Country } from 'src/app/components/country';

// @Injectable({
//   providedIn: 'root',
// })
// export class ConnectService {
//   auth_token = this.cookieService.get('token');
//   headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + this.auth_token,
//   });
//   private urlAPI = 'http://localhost:3000';

//   constructor(private http: HttpClient, private cookieService: CookieService) {}
//   getLists(name: string, searchvalue: any = null): Observable<any> {
//     let url = `${this.urlAPI}/${name}`;
//     if (searchvalue != null) {
//       url = `${url}?${name}Name_like=` + searchvalue;
//     }
//     return this.http.get(url, { headers: this.headers });
//   }
//   getByid(name: string,id: number): Observable<any> {
//     let url = `${this.urlAPI}/Suppliers/` + id;
//     return this.http.get(url, { headers: this.headers });
//   }
//   update(data: any[], id: number): Observable<any[]> {
//     let url = `${this.urlAPI}/anys/` + id;
//     return this.http.put<any[]>(url, data, { headers: this.headers });
//   }
//   add(data: any[]): Observable<any[]> {
//     let url = `${this.urlAPI}/anys`;
//     return this.http.post<any[]>(url, data, { headers: this.headers });
//   }
//   delete(id: number): Observable<any[]> {
//     let url = `${this.urlAPI}/anys/` + id;
//     return this.http.delete<any[]>(url, { headers: this.headers });
//   }
//   getcountry(): Observable<Country[]> {
//     let url = `${this.urlAPI}/Countries`;
//     return this.http.get<Country[]>(url, { headers: this.headers });
//   }
// }
