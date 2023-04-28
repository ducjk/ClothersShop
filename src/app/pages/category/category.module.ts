import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { IndexCategoryComponent } from './index/index.component';
import { EditCategoryComponent } from './edit/edit.component';
import { DeleteModule } from 'src/app/shared/delete/delete.module';

@NgModule({
  declarations: [CategoryComponent, IndexCategoryComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    DeleteModule,
  ],
})
export class CategoryModule {}
