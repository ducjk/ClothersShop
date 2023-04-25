import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  p: number = 1;
  i: number = 1;
  orders: Order[] = [];
  constructor(private orderService: OrderService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.orderService.getOrders(this.searchForm.value.searchValue).subscribe((res) => {
      this.orders = res;
    });
  }
}
