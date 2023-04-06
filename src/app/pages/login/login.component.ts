import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountServiceService } from 'src/app/core/service/account.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/core/service/userService/user.service';
import { User } from 'src/app/components/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user!: User;
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private account: AccountServiceService,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    this.account.getList().subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email == this.loginForm.value.email && a.password == this.loginForm.value.password
          );
        });
        if (user) {
          this.loginForm.reset();
          this.router.navigate(['/']);
        } else {
          alert('Failed to login');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  onLogin() {
    this.account.onLogin(this.loginForm.value).subscribe(
      (res: any) => {
        this.cookieService.set('token', res.access_token);
        const tokenInfo = this.getDecodedAccessToken(res.access_token);
        const { id, fullname, gender, birthday, photo, email, phone, address } = tokenInfo;
        this.user = { id, fullname, gender, birthday, phone, email, photo, address };
        this.userService.setUser(this.user);

        this.router.navigate(['/']);
      },
      (err) => {
        this.loginForm.reset();
        alert('Something went wrong');
      }
    );
  }
}
