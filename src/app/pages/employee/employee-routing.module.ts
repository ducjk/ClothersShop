import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EditEmployeeComponent } from './edit/edit.component';
import { IndexEmployeeComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'edit/:id', title: 'Chỉnh sửa nhân viên ', component: EditEmployeeComponent },
      { path: 'index', component: IndexEmployeeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
