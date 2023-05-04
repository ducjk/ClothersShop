import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { orderDetail } from 'src/app/components/order-detail';
import { Product } from 'src/app/components/product';
import { OrderDetailService } from 'src/app/core/service/order-detail.service';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss'],
})
export class EditDetailComponent implements OnInit {
  editDetail!: orderDetail;
  constructor(private route: ActivatedRoute, private orderDetailService: OrderDetailService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      this.orderDetailService.getById(id).subscribe((res) => {
        this.editDetail = res;
      });
    });
  }
}
