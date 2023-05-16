import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { IndexOrderComponent } from './index/index.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { CreateOrderComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexOrderComponent },
      { path: 'orderDetail/:id', component: OrderDetailComponent },
      { path: 'editDetail/:id', component: EditDetailComponent },
      { path: 'create', title: 'Tạo mới hóa đơn', component: CreateOrderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
