import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountServiceService {
  constructor(private http: HttpClient) {}
  getList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/Employees/');
  }
  getAccountById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/Employees/${id}`);
  }
  getPost(acc: any): Observable<any> {
    {
      return this.http.post<any>('http://localhost:3000/Customer', acc);
    }
  }

  onLogin(obj: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', obj);
  }
}