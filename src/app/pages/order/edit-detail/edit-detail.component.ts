import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  @Output() closePopup = new EventEmitter<boolean>();
  editDetail!: orderDetail;
  editForm!: FormGroup;
  id!: number;
  selectedDelete = false;
  idItem = 0;
  names = 'OrderDetails';
  orderDetail!: orderDetail[];
  constructor(
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      productName: [''],
      quantity: [''],
    });
    this.route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id')!);
      this.orderDetailService.getById(this.id).subscribe((res) => {
        this.editDetail = res;
        this.editForm.controls['productName'].setValue(this.editDetail.productName);
        this.editForm.controls['quantity'].setValue(this.editDetail.quantity);
      });
    });
  }
  onUpdate() {
    this.orderDetailService.update(this.editForm.value, this.id).subscribe((res) => {
      alert('Chỉnh sửa thành công');
      console.log(res);
      this.router.navigate(['/home/order']);
    });
  }
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
      this.orderDetail = this.orderDetail.filter((item) => item.id !== this.idItem);
    }
    this.idItem = 0;
  }
}
