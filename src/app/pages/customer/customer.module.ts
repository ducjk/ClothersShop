import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { IndexCustomerComponent } from './index/index.component';
import { EditCustomerComponent } from './edit/edit.component';

@NgModule({
  declarations: [CustomerComponent, IndexCustomerComponent, EditCustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class CustomerModule {}
