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

  p = 1;
  m = 0;
  constructor(private product: ProductService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.product.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
  onSearch() {
    this.product.getProducts(this.searchForm.value.searchValue).subscribe((res) => {
      this.products = res;
    });
  }
}
