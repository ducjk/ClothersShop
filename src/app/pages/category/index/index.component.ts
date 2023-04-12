import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/components/category';
import { CategoryService } from 'src/app/core/service/category.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexCategoryComponent {
  public searchForm!: FormGroup;
  p: number = 1;
  i: number = 1;
  categories: Category[] = [];
  constructor(private categorySevice: CategoryService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.categorySevice.getCategories(this.searchForm.value.searchValue).subscribe((res) => {
      this.categories = res;
    });
  }
  onSearch() {
    this.categorySevice.getCategories(this.searchForm.value.searchValue).subscribe((res) => {
      this.categories = res;
    });
  }
}
