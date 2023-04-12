import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/components/employee';
import { EmployeeService } from 'src/app/core/service/employee.service';

@Component({
  selector: 'app-index-employee',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexEmployeeComponent implements OnInit {
  public searchForm!: FormGroup;
  p: number = 1;
  i: number = 1;
  Employees: Employee[] = [];
  constructor(private employee: EmployeeService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.employee.getEmployees(this.searchForm.value.searchValue).subscribe((res) => {
      this.Employees = res;
    });
  }
  onSearch() {
    this.employee.getEmployees(this.searchForm.value.searchValue).subscribe((res) => {
      this.Employees = res;
    });
  }
}
