import { Component, ChangeDetectorRef } from '@angular/core';
import { UserService } from './core/service/user.service';
import { User } from './components/user';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { LoadService } from './core/service/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user!: User;
  token!: string;
  loading = false;
  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private loadingService: LoadService,
    private cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.getLoading().subscribe((load) => {
      this.loading = load;
      this.cdf.detectChanges();
    });

    this.token = this.cookieService.get('token');
    if (this.token) {
      const tokenInfo = this.getDecodedAccessToken(this.token);
      if (tokenInfo) {
        const { id, fullName, gender, birthday, photo, email, phone, address } = tokenInfo;
        this.user = { id, fullName, gender, birthday, phone, email, photo, address };
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

  title = 'DucHanhShop';
}
