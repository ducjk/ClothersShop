import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AccountServiceService } from 'src/app/core/service/account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private account: AccountServiceService,
    private router: Router
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
}
