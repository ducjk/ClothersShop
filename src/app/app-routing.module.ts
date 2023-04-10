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
import { EditComponent } from './pages/supplier/edit/edit.component';
import { IndexComponent } from './pages/supplier/index/index.component';
import { DeleteComponent } from './pages/supplier/delete/delete.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'supplier', pathMatch: 'full' },
      { path: 'product', component: ProductComponent },
      { path: 'category', component: SupplierComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'supplier',
        component: SupplierComponent,
        children: [
          { path: 'edit/:id', component: EditComponent },
          { path: '', redirectTo: 'index', pathMatch: 'full' },
          { path: 'index', component: IndexComponent },
          {
            path: 'delete/:id',
            component: DeleteComponent,
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
