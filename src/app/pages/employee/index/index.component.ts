import { HttpResponse } from '@angular/common/http';
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
  totalItem = 1;
  currentPage = 1;
  limit = 5;
  listOptionLimit = [3, 4, 5, 6, 7];

  selectedDelete = false;
  idItem = 0;
  names = 'Employees';

  Employees: Employee[] = [];

  constructor(private employee: EmployeeService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });

    this.employee
      .getEmployeesWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.Employees = res.body;
      });
  }
  onSearch() {
    this.employee
      .getEmployeesWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.Employees = res.body;
      });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onSearch();
  }

  onChangeLimit(value: string): void {
    this.limit = +value;
    this.onSearch();
  }

  // deleteItem

  showDeleteMessage(id: number) {
    this.selectedDelete = true;
    this.idItem = id;
  }

  removeAction() {
    this.selectedDelete = false;
    this.idItem = 0;
  }

  removedItem(check: boolean) {
    if (check) {
      this.Employees = this.Employees.filter((item) => item.id !== this.idItem);
    }
    this.idItem = 0;
  }
}
