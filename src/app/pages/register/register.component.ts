import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/service/account.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registersForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private account: AccountService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registersForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cfpassword: [''],
    });
  }
  signup() {
    if (this.registersForm.value.Password == this.registersForm.value.cfpassword)
      this.account.getPost(this.registersForm).subscribe(
        (res) => {
          alert('Đăng Ký Thành Công');
          this.registersForm.reset();
          this.router.navigate(['/login']);
        },
        (err) => {
          alert('Error');
        }
      );
    else alert('xác nhận mật khẩu không đúng');
    this.registersForm.reset();
  }
}
