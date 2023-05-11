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

  getPost(acc: any): Observable<any> {
    {
      return this.http.post<any>('http://localhost:3000/Customer', acc);
    }
  }

  onLogin(obj: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/login`, obj);
  }

  refreshToken(email: string): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/refreshtoken`, email);
  }
}
