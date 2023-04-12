import { Component } from '@angular/core';
import { UserService } from './core/service/user.service';
import { User } from './components/user';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user!: User;
  token!: string;
  constructor(private userService: UserService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    if (this.token) {
      const tokenInfo = this.getDecodedAccessToken(this.token);

      if (tokenInfo) {
        const { id, fullname, gender, birthday, photo, email, phone, address } = tokenInfo;
        this.user = { id, fullname, gender, birthday, phone, email, photo, address };
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
        this.userService.setUser(this.user);
      }
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  title = 'ThucTapProject';
}
