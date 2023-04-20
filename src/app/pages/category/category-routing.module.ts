import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { EditCategoryComponent } from './edit/edit.component';
import { IndexCategoryComponent } from './index/index.component';
import { DeleteCategoryComponent } from './delete/delete.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'edit/:id', title: 'Chỉnh sửa nhà cung cấp', component: EditCategoryComponent },
      { path: 'index', component: IndexCategoryComponent },
      {
        path: 'delete/:id',
        title: 'Xóa nhà cung cấp',
        component: DeleteCategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
