import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/components/order';
import { orderDetail } from 'src/app/components/order-detail';
import { OrderDetailService } from 'src/app/core/service/order-detail.service';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  detailForm!: FormGroup;
  OrderDetails!: orderDetail[];
  maxDate!: any;
  sumTotal = 0;
  Order!: Order;
  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private orderDetailService: OrderDetailService
  ) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      this.orderDetailService.getOrderDetail(id).subscribe((res) => {
        this.OrderDetails = res;
        this.OrderDetails.forEach((e) => {
          this.sumTotal = e.price * e.quantity;
        });
        console.log(this.OrderDetails);
      });
      this.orderService.getExpandId(id).subscribe((res) => {
        this.Order = res;
      });
    });
  }
}
