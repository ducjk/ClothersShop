import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { IndexProductComponent } from './index/index.component';
import { EditProductComponent } from './edit/edit.component';
import { DeleteProductComponent } from './delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ProductComponent,
    IndexProductComponent,
    EditProductComponent,
    DeleteProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class ProductModule {}
