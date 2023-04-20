import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { IndexSupplierComponent } from './index/index.component';
import { EditSupplierComponent } from './edit/edit.component';
import { DeleteSupplierComponent } from './delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SupplierComponent,
    IndexSupplierComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class SupplierModule {}
