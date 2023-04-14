import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/components/user';
import { ProfileService } from 'src/app/core/service/profile.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;
  public editForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private profileService: ProfileService,
    private userService: UserService,
    private ref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [''],
      fullname: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');

    this.editForm = this.formBuilder.group({
      id: [{ value: this.user.id, disabled: false }],
      fullname: [{ value: this.user.fullname, disabled: false }],
      email: [{ value: this.user.email, disabled: false }],
      address: [{ value: this.user.address, disabled: false }],
      birthday: [{ value: this.user.birthday, disabled: false }],
      gender: [{ value: this.user.gender, disabled: false }],
      phone: [{ value: this.user.phone, disabled: false }],
    });
  }

  goBack() {
    this.location.back();
  }

  save() {
    const { id, ...data } = this.editForm.value;
    this.profileService.updateData(data, id).subscribe(
      (res) => {
        console.log('res', res);

        const { id, fullname, gender, birthday, photo, email, phone, address } = res;
        this.userService.setUser({ id, fullname, gender, birthday, photo, email, phone, address });

        sessionStorage.setItem('user', JSON.stringify(this.userService.getUser()));
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
}
