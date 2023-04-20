import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/service/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteEmployeeComponent {
  public deleteEmployeeForm!: FormGroup;

  constructor(
    private employee: EmployeeService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.deleteEmployeeForm = this.formBuilder.group({
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

      this.employee.getByid(id).subscribe((res) => {
        let myEmployee = res;

        this.deleteEmployeeForm = this.formBuilder.group({
          fullname: [{ value: myEmployee.fullName, disabled: true }],
          email: [{ value: myEmployee.email, disabled: true }],
          gender: [{ value: myEmployee.gender, disabled: true }],
          address: [{ value: myEmployee.address, disabled: true }],
          phone: [{ value: myEmployee.phone, disabled: true }],
          birthday: [{ value: myEmployee.birthday, disabled: true }],
          anh: [myEmployee.photo],
        });
      });
    });
  }

  onSubmit() {
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      this.employee.delete(id).subscribe((res) => {
        alert('Xoa thanh cong');
        this.route.navigate(['/home/employee']);
      });
    });
  }
}
