import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/components/supplier';
import { SupplierService } from 'src/app/core/service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  public searchForm!: FormGroup;
  suppliers: Supplier[] = [];
  constructor(private supplier: SupplierService,  private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
   
      searchValue:[]
    })
    this.supplier.getSuppliers(this.searchForm.value.searchValue).subscribe((res) => {
      this.suppliers = res;
      console.log(this.suppliers);
    });
  }
  onSearch(){
      this.supplier.getSuppliers(this.searchForm.value.searchValue).subscribe((res) =>{
        this.suppliers = res;
      })
  }
}
