import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/components/user';
import { ProfileService } from 'src/app/core/service/profile.service';
import { TokenService } from 'src/app/core/service/token.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;
  public editForm!: FormGroup;

  selectedFile: File | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private profileService: ProfileService,
    private userService: UserService,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [''],
      fullName: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      photo: [''],
    });

    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');

    this.editForm = this.formBuilder.group({
      id: [{ value: this.user.id, disabled: false }],
      fullName: [{ value: this.user.fullName, disabled: false }],
      email: [{ value: this.user.email, disabled: false }],
      address: [{ value: this.user.address, disabled: false }],
      birthday: [{ value: this.user.birthday, disabled: false }],
      gender: [{ value: this.user.gender, disabled: false }],
      phone: [{ value: this.user.phone, disabled: false }],
      photo: [{ value: this.user.photo, disabled: false }],
    });
  }

  goBack() {
    this.location.back();
  }

  save() {
    const { id, ...data } = this.editForm.value;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.profileService.postImgae(formData).subscribe(
        (response: any) => {
          this.editForm.value.photo = response.url;
          data.photo = this.editForm.value.photo;

          this.profileService.updateData(data, id).subscribe(
            (res) => {
              const { id, fullName, gender, birthday, photo, email, phone, address } = res;

              this.userService.setUser({
                id,
                fullName,
                gender,
                birthday,
                photo,
                email,
                phone,
                address,
              });

              sessionStorage.setItem(
                'user',
                JSON.stringify({ id, fullName, gender, birthday, photo, email, phone, address })
              );
              let newToken = '';
              this.tokenService.refreshToken(email).subscribe((res: any) => {
                newToken = res.access_token;
                if (newToken !== '') {
                  this.cookieService.delete('token');
                  this.cookieService.set('token', newToken);
                  alert('Thay đổi thông tin thành công');
                }
              });
            },
            (error) => {
              console.log('error: ', error);
            }
          );
        },
        (error) => {
          console.error('Error uploading image:', error);
          // Handle any error scenarios
        }
      );
    } else {
      this.profileService.updateData(data, id).subscribe(
        (res) => {
          const { id, fullName, gender, birthday, photo, email, phone, address } = res;

          this.userService.setUser({
            id,
            fullName,
            gender,
            birthday,
            photo,
            email,
            phone,
            address,
          });

          sessionStorage.setItem(
            'user',
            JSON.stringify({ id, fullName, gender, birthday, photo, email, phone, address })
          );
          let newToken = '';
          this.tokenService.refreshToken(email).subscribe((res: any) => {
            newToken = res.access_token;
            if (newToken !== '') {
              this.cookieService.delete('token');
              this.cookieService.set('token', newToken);
              alert('Thay đổi thông tin thành công');
            }
          });
        },
        (error) => {
          console.log('error: ', error);
        }
      );
    }
  }
}
