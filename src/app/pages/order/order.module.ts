import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { IndexOrderComponent } from './index/index.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [OrderComponent, IndexOrderComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class OrderModule {}
