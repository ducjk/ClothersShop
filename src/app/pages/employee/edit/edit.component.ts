import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/components/employee';
import { EmployeeService } from 'src/app/core/service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditEmployeeComponent {
  editEmployeeForm!: FormGroup;
  Employee!: Employee;
  submited=false
  img: string = 'http://dummyimage.com/176x196.png/dddddd/000000';
  constructor(
    private employee: EmployeeService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.editEmployeeForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      gender: [''],
      address: [''],
      phone: [''],
      birthday: [''],
      anh: [''],
    });

    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id > 0) {
        this.employee.getByid(id).subscribe((res) => {
          this.Employee = res;
          this.editEmployeeForm = this.formBuilder.group({
            fullname: [this.Employee.fullname, Validators.required],
            email: [this.Employee.email, [Validators.required, Validators.email]],
            gender: [this.Employee.gender, Validators.required],
            address: [this.Employee.address, Validators.required],
            phone: [this.Employee.phone, Validators.required],
            birthday: [this.Employee.birthday, Validators.required],
            anh: [this.Employee.photo],
          });
        });
      } else if (id == 0) {
        this.editEmployeeForm = this.formBuilder.group({
          fullname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          gender: ['', Validators.required],
          address: ['', Validators.required],
          phone: ['', Validators.required],
          birthday: ['', Validators.required],
          anh: [''],
        });
      }
    });
  }
  save() {
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id == 0) {
        this.employee.add(this.editEmployeeForm.value).subscribe((res) => {
          alert('Thêm thành công');
          this.route.navigate(['/home/employee']);
        });
      } else if (id > 0) {
        this.employee.update(this.editEmployeeForm.value, id).subscribe((res) => {
          alert('Chỉnh sửa thành công');
          this.route.navigate(['/home/employee']);
        });
      }
    });
  }
  uploadPhoto() {}
}
