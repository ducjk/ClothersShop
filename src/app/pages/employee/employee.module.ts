import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IndexEmployeeComponent } from './index/index.component';
import { EditEmployeeComponent } from './edit/edit.component';

import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    EmployeeComponent,
    IndexEmployeeComponent,
    EditEmployeeComponent,
 
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSelectModule,
  ],
})
export class EmployeeModule {}
