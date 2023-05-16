import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { IndexOrderComponent } from './index/index.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

import { DeleteModule } from '../../shared/delete/delete.module';
import { CreateOrderComponent } from './create/create.component';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    OrderComponent,
    IndexOrderComponent,
    OrderDetailComponent,
   
    CreateOrderComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DeleteModule,
    MatMenuModule,
  ],
})
export class OrderModule {}
