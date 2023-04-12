import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/components/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;
  public editForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');

    this.editForm = this.formBuilder.group({
      fullname: [{ value: this.user.fullname, disabled: false }],
      email: [{ value: this.user.email, disabled: true }],
      address: [{ value: this.user.address, disabled: false }],
      birthday: [{ value: this.user.birthday, disabled: false }],
      gender: [{ value: this.user.gender, disabled: false }],
      phone: [{ value: this.user.phone, disabled: false }],
    });
  }
  save() {}
}
