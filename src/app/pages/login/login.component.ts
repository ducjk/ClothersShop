import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/core/service/account.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/components/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl!: string;
  user!: User;
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private account: AccountService,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.cookieService.get('token')) {
      this.cookieService.deleteAll('token');
    }
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
        if (this.cookieService.get('token')) {
          this.cookieService.deleteAll('token');
        }
        this.cookieService.set('token', res.access_token);
        const tokenInfo = this.getDecodedAccessToken(res.access_token);
        const { id, fullName, gender, birthday, photo, email, phone, address } = tokenInfo;
        this.user = { id, fullName, gender, birthday, phone, email, photo, address };
        sessionStorage.setItem('user', JSON.stringify(this.user));

        this.userService.setUser(this.user);

        this.router.navigateByUrl(this.returnUrl);
      },
      (err) => {
        this.loginForm.reset();
        alert('Something went wrong');
      }
    );
  }
}
