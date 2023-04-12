import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/components/supplier';
import { SupplierService } from 'src/app/core/service/supplier.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexSupplierComponent implements OnInit {
  public searchForm!: FormGroup;
  p: number = 1;
  i: number = 1;
  suppliers: Supplier[] = [];
  constructor(private supplier: SupplierService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.supplier.getSuppliers(this.searchForm.value.searchValue).subscribe((res) => {
      this.suppliers = res;
    });
  }
  onSearch() {
    this.supplier.getSuppliers(this.searchForm.value.searchValue).subscribe((res) => {
      this.suppliers = res;
    });
  }
}
