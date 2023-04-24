import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token: string = '';
  constructor(private cookieSerice: CookieService) {}
  getToken() {
    this.token = this.cookieSerice.get('token');
    return this.token;
  }

  removeToken() {
    this.token = '';
    this.cookieSerice.delete('token');
  }
}
