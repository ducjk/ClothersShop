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
  totalItem = 1;
  currentPage = 1;
  limit = 5;
  listOptionLimit = [3, 4, 5, 6, 7];

  selectedDelete = false;
  idItem = 0;
  names = 'Categories';

  Categories: Category[] = [];

  constructor(private categorySevice: CategoryService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.categorySevice
      .getCategoriesWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.Categories = res.body;
      });
  }
  onSearch() {
    this.categorySevice
      .getCategoriesWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.Categories = res.body;
      });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onSearch();
  }

  onChangeLimit(value: string): void {
    this.limit = +value;
    this.onSearch();
  }

  // deleteItem

  showDeleteMessage(id: number) {
    this.selectedDelete = true;
    this.idItem = id;
  }

  removeAction() {
    this.selectedDelete = false;
    this.idItem = 0;
  }

  removedItem(check: boolean) {
    if (check) {
      this.Categories = this.Categories.filter((item) => item.id !== this.idItem);
    }
    this.idItem = 0;
  }
}
