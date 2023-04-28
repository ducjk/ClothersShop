import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { EditCustomerComponent } from './edit/edit.component';
import { IndexCustomerComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'edit/:id', title: 'Chỉnh sửa khách hàng', component: EditCustomerComponent },
      { path: 'index', component: IndexCustomerComponent },
   
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
