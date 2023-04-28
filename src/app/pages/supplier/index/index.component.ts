import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Supplier } from 'src/app/components/supplier';
import { SupplierService } from 'src/app/core/service/supplier.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexSupplierComponent implements OnInit {
  public searchForm!: FormGroup;
  totalItem = 1;
  currentPage = 1;
  limit = 5;
  listOptionLimit = [3, 4, 5, 6, 7];

  selectedDelete = false;
  idItem = 0;
  names = 'Suppliers';

  Suppliers: Supplier[] = [];

  constructor(private supplierService: SupplierService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.supplierService
      .getSuppliersWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.Suppliers = res.body;
      });
  }

  // filter

  onSearch() {
    this.supplierService
      .getSuppliersWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.Suppliers = res.body;
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
      this.Suppliers = this.Suppliers.filter((item) => item.id !== this.idItem);
    }
    this.idItem = 0;
  }
}
