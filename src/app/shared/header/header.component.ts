import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/components/user';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user!: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private cookie: CookieService
  ) {}
  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.setUser({
      id: 0,
      fullname: '',
      email: '',
      gender: '',
      address: '',
      phone: '',
      birthday: '',
      photo: '',
    });
    sessionStorage.removeItem('user');
    this.cookie.delete('token');
    this.router.navigate(['/login']);
  }
}
