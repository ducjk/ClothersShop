import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/components/order';
import { Supplier } from 'src/app/components/supplier';
import { EmployeeService } from 'src/app/core/service/employee.service';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexOrderComponent {
  public searchForm!: FormGroup;
  totalItem = 1;
  currentPage = 1;
  limit = 5;
  listOptionLimit = [3, 4, 5, 6, 7];

  orders: Order[] = [];
  constructor(private orderService: OrderService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
      status: -5,
    });
    this.orderService
      .getOrderWithPageOfStatus(
        this.searchForm.value.searchValue,
        this.searchForm.value.status,
        this.currentPage,
        this.limit
      )
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.orders = res.body;
      });
  }
  onSearch() {
    this.orderService
      .getOrderWithPageOfStatus(
        this.searchForm.value.searchValue,
        parseInt(this.searchForm.value.status),
        this.currentPage,
        this.limit
      )
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.orders = res.body;
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
}
