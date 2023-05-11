import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  apiURL = environment.apiURL;

  token: string = '';
  constructor(private http: HttpClient, private cookieSerice: CookieService) {}
  getToken() {
    this.token = this.cookieSerice.get('token');
    return this.token;
  }

  setToken(token: string) {
    this.removeToken();
    this.token = token;
    this.cookieSerice.set('token', token);
  }

  refreshToken(email: string): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/refreshtoken`, { email });
  }

  removeToken() {
    this.token = '';
    this.cookieSerice.delete('token');
  }
}
