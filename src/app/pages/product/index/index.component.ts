import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/components/product';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexProductComponent {
  public searchForm!: FormGroup;
  products!: Product[];

  totalItem = 1;
  currentPage = 1;
  limit = 5;
  listOptionLimit = [3, 4, 5, 6, 7];

  selectedDelete = false;
  idItem = 0;
  names = 'Products';

  index = 0;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.productService
      .getProductsWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.products = res.body;
      });
  }

  // filter

  onSearch() {
    this.productService
      .getProductsWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.products = res.body;
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
      this.products = this.products.filter((item) => item.id !== this.idItem);
    }
    this.idItem = 0;
  }
}
