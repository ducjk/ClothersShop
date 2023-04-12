import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditEmployeeComponent {
  public editEmployeeForm!: FormGroup;

  constructor(
    private employee: EmployeeService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.editEmployeeForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      anh: ['', Validators.required],
    });

    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id != 0) {
        this.employee.getByid(id).subscribe((res) => {
          let myEmployee = res;

          this.editEmployeeForm = this.formBuilder.group({
            fullname: [myEmployee.fullname],
            email: [myEmployee.email],
            gender: [myEmployee.gender],
            address: [myEmployee.address],
            phone: [myEmployee.phone],
            birthday: [myEmployee.birthday],
            anh: [myEmployee.photo],
          });
        });
      } else if (id == 0) {
        this.editEmployeeForm = this.formBuilder.group({
          fullname: ['', Validators.required],
          email: ['', Validators.required],
          gender: ['', Validators.required],
          address: ['', Validators.required],
          phone: ['', Validators.required],
          birthday: ['', Validators.required],
          anh: ['', Validators.required],
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
      } else if (id != 0) {
        this.employee.update(this.editEmployeeForm.value, id).subscribe((res) => {
          alert('Chỉnh sửa thành công');
          this.route.navigate(['/home/employee']);
        });
      }
    });
  }
  onSelectImg(e:any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files)
      reader.onload=(event:any) =>{
        this.editEmployeeForm.value.anh=event.target.result

      }
    }

  }
}
