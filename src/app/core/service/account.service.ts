import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}
  // getList(): Observable<any> {
  //   return this.http.get<any>('http://localhost:3000/Employees/');
  // }
  // getAccountById(id: number): Observable<any> {
  //   return this.http.get<any>(`http://localhost:3000/Employees/${id}`);
  // }
  getPost(acc: any): Observable<any> {
    {
      return this.http.post<any>('http://localhost:3000/Customer', acc);
    }
  }

  onLogin(obj: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/login`, obj);
  }
}
