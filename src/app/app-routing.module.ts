import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { MasterComponent } from './shared/master/master.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { EditSupplierComponent } from './pages/supplier/edit/edit.component';
import { IndexSupplierComponent } from './pages/supplier/index/index.component';
import { DeleteSupplierComponent } from './pages/supplier/delete/delete.component';
import { CategoryComponent } from './pages/category/category.component';
import { EditCategoryComponent } from './pages/category/edit/edit.component';
import { IndexCategoryComponent } from './pages/category/index/index.component';
import { DeleteCategoryComponent } from './pages/category/delete/delete.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'supplier', pathMatch: 'full' },
      { path: 'product', component: ProductComponent },
      {
        path: 'category',
        component: CategoryComponent,
        children: [
          { path: '', redirectTo: 'index', pathMatch: 'full' },
          { path: 'edit/:id', component: EditCategoryComponent },
          { path: 'index', component: IndexCategoryComponent },
          {
            path: 'delete/:id',
            component: DeleteCategoryComponent,
          },
        ],
      },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'supplier',
        component: SupplierComponent,
        children: [
          { path: '', redirectTo: 'index', pathMatch: 'full' },
          { path: 'edit/:id', component: EditSupplierComponent },
          { path: 'index', component: IndexSupplierComponent },
          {
            path: 'delete/:id',
            component: DeleteSupplierComponent,
          },
        ],
      },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
