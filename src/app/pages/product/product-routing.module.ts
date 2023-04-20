import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { EditProductComponent } from './edit/edit.component';
import { IndexProductComponent } from './index/index.component';
import { DeleteProductComponent } from './delete/delete.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'edit/:id', title: 'Chỉnh sửa nhà cung cấp', component: EditProductComponent },
      { path: 'index', component: IndexProductComponent },
      {
        path: 'delete/:id',
        title: 'Xóa nhà cung cấp',
        component: DeleteProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
