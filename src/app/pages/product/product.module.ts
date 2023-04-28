import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { IndexProductComponent } from './index/index.component';
import { EditProductComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteModule } from 'src/app/shared/delete/delete.module';

@NgModule({
  declarations: [ProductComponent, IndexProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DeleteModule,
  ],
})
export class ProductModule {}
