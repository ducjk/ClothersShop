import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { IndexSupplierComponent } from './index/index.component';
import { EditSupplierComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteModule } from 'src/app/shared/delete/delete.module';

@NgModule({
  declarations: [SupplierComponent, IndexSupplierComponent, EditSupplierComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DeleteModule,
  ],
})
export class SupplierModule {}
