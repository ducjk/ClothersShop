import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/components/customer';
import { CustomerService } from 'src/app/core/service/customer.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexCustomerComponent {
  public searchForm!: FormGroup;
  totalItem = 1;
  currentPage = 1;
  limit = 5;
  listOptionLimit = [3, 4, 5, 6, 7];

  selectedDelete = false;
  idItem = 0;
  names = 'Customers';

  Customers: Customer[] = [];
  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });

    this.customerService
      .getCustomerWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.Customers = res.body;
      });
  }
  onSearch() {
    this.customerService
      .getCustomerWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.Customers = res.body;
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
      this.Customers = this.Customers.filter((item) => item.id !== this.idItem);
    }
    this.idItem = 0;
  }
}
