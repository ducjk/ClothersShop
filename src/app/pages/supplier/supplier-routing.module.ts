import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { EditSupplierComponent } from './edit/edit.component';
import { IndexSupplierComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'edit/:id', title: 'Chỉnh sửa nhà cung cấp', component: EditSupplierComponent },
      { path: 'index', component: IndexSupplierComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
