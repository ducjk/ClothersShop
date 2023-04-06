import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { SupplierComponent } from './pages/supplier/supplier.component';

const routes: Routes = [
  {path:'home',component:ProductComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'supplier', component: SupplierComponent},
  {
    path: '',
    children: [{ path: 'product', component: ProductComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
