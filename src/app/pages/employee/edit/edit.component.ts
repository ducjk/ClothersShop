import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/components/employee';
import ValidaterForm from 'src/app/components/validaterForm';
import { EmployeeService } from 'src/app/core/service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditEmployeeComponent {
  editEmployeeForm!: FormGroup;
  Employee!: Employee;
  maxDate!: any;

  selectedFile: File | undefined;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  ngOnInit(): void {
    this.futureDateDisable();
    this.editEmployeeForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      gender: [''],
      address: [''],
      phone: [''],
      birthday: [''],
      photo: [''],
    });

    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id > 0) {
        this.employeeService.getById(id).subscribe((res) => {
          this.Employee = res;
          this.editEmployeeForm = this.formBuilder.group({
            fullName: [this.Employee.fullName, Validators.required],
            email: [this.Employee.email, [Validators.required, Validators.email]],
            gender: [this.Employee.gender, Validators.required],
            address: [this.Employee.address, Validators.required],
            phone: [this.Employee.phone, Validators.required],
            birthday: [this.Employee.birthday, Validators.required],
            photo: [this.Employee.photo],
          });
        });
      } else if (id == 0) {
        this.editEmployeeForm = this.formBuilder.group({
          fullName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
          email: ['', [Validators.required, Validators.email]],
          gender: ['', Validators.required],
          address: ['', Validators.required],
          phone: ['', [Validators.required, Validators.pattern('(09|03|07|08|05)+([0-9]{8})')]],
          birthday: ['', [Validators.required]],
          photo: ['./assets/img/default-img.png'],
        });
      }
    });
  }
  save() {
    if (this.editEmployeeForm.valid) {
      this.router.paramMap.subscribe((params) => {
        let id: number = parseInt(params.get('id')!);
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('image', this.selectedFile);

          this.employeeService.postImgae(formData).subscribe(
            (response: any) => {
              this.editEmployeeForm.value.photo = response.url;
              if (id == 0) {
                this.employeeService.add(this.editEmployeeForm.value).subscribe((res) => {
                  alert('Thêm thành công');
                  this.route.navigate(['/home/employee']);
                });
              } else if (id > 0) {
                this.employeeService.update(this.editEmployeeForm.value, id).subscribe((res) => {
                  alert('Chỉnh sửa thành công');
                  this.route.navigate(['/home/employee']);
                });
              }
            },
            (error) => {
              console.error('Error uploading image:', error);
              // Handle any error scenarios
            }
          );
        } else {
          if (this.editEmployeeForm.value.photo === '') {
            this.editEmployeeForm.value.photo = './assets/img/default-img.png';

            if (id == 0) {
              this.employeeService.add(this.editEmployeeForm.value).subscribe((res) => {
                alert('Thêm thành công');
                this.route.navigate(['/home/employee']);
              });
            } else if (id > 0) {
              this.employeeService.update(this.editEmployeeForm.value, id).subscribe((res) => {
                alert('Chỉnh sửa thành công');
                this.route.navigate(['/home/employee']);
              });
            }
          }
        }
      });
    } else {
      ValidaterForm.validateAllFormFileds(this.editEmployeeForm);
      alert('Nhập còn thiếu kìa má');
    }
  }

  futureDateDisable() {
    var date: any = new Date();
    var toDayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();
    if (toDayDate < 10) {
      toDayDate = '0' + toDayDate;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.maxDate = year + '-' + month + '-' + toDayDate;
    console.log(this.maxDate);
  }
}
