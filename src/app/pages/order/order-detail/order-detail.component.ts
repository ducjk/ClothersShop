import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  value!: number;
  id!: number;
  selectedDelete = false;
  idItem = 0;
  names = 'OrderDetails';
  day = new Date();
  today = '';
  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private orderDetailService: OrderDetailService
  ) {
    this.today = formatDate(this.day, 'dd-MM-yyyy hh:mm:ss a', 'en-US', 'UCT+7');
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id')!);
      this.orderDetailService.getOrderDetail(this.id).subscribe((res) => {
        this.OrderDetails = res;
        console.log(this.OrderDetails);
        this.OrderDetails.forEach((e) => {
          this.sumTotal = e.price * e.quantity;
        });
      });
      this.orderService.getExpandId(this.id).subscribe((res) => {
        this.Order = res;
      });
    });
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
      this.OrderDetails = this.OrderDetails.filter((item) => item.id !== this.idItem);
    }
    this.idItem = 0;
    this.sumTotal = 0;
  }

  onStatus(value: string): void {
    const i = parseInt(value);
    this.orderService.getExpandId(this.id).subscribe(
      (res) => {
        this.Order = res;

        if (i === 1 && this.Order.status === 0) {
          this.Order.status = 1;
          this.Order.acceptTime = this.today;
          this.orderService.updateAllField(this.Order, this.id).subscribe((res) => {
            confirm('Xác nhận thành công');
          });
        } else if (i === 2 && this.Order.status === 1) {
          this.Order.status = 2;
          this.orderService.updateAllField(this.Order, this.id).subscribe((res) => {
            confirm('Xác nhận chuyển hàng thành công');
          });
        } else if (i === 3 && this.Order.status === 2) {
          this.Order.status = 3;
          this.Order.finishedTime  = this.today;
          this.orderService.updateAllField(this.Order, this.id).subscribe((res) => {
            confirm('Hoàn tất đơn hàng thành công');
          });
        } else if (i === -1 && this.Order.status === 0) {
          this.Order.status = -1;
          this.orderService.updateAllField(this.Order, this.id).subscribe((res) => {
            confirm('Từ chối đơn hàng thành công');
          });
        } else if (i === -2) {
          if (this.Order.status <= 1 && this.Order.status >= 0) {
            this.Order.status = -2;
            this.orderService.updateAllField(this.Order, this.id).subscribe((res) => {
              confirm('Hủy đơn hàng thành công');
            });
          }
        }
      },
      (error) => {
        console.log('Thao tác thất bại');
      }
    );
  }
}
