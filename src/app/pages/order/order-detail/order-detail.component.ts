import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/components/order';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  detailForm!: FormGroup;
  OrderDetails!: Order;
  maxDate!: any;
 sumTotal = 0;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      this.orderService.getExpandId(id).subscribe((res) => {
        this.OrderDetails = res;
        console.log(this.OrderDetails);
        this.OrderDetails.orderDetail.forEach((e) => {
         this.sumTotal= e.price * e.quantity;
        });
      });
    });
  }
}
