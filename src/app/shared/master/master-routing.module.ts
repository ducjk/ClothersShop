import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      { path: '', redirectTo: 'supplier', pathMatch: 'full' },
      {
        path: 'supplier',
        title: 'Nhà cung cấp',
        loadChildren: () =>
          import('../../pages/supplier/supplier.module').then((m) => m.SupplierModule),
      },
      {
        path: 'profile',
        title: 'Profile',
        loadChildren: () =>
          import('../../pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'category',
        title: 'Loại hàng',
        loadChildren: () =>
          import('../../pages/category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'employee',
        title: 'Nhân viên',
        loadChildren: () =>
          import('../../pages/employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'order',
        title: 'Hóa đơn',
        loadChildren: () => import('../../pages/order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'product',
        title: 'Sản phẩm',
        loadChildren: () =>
          import('../../pages/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'customer',
        title: 'Khách hàng',
        loadChildren: () =>
          import('../../pages/customer/customer.module').then((m) => m.CustomerModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [CommonModule, RouterModule],
})
export class MasterRoutingModule {}
