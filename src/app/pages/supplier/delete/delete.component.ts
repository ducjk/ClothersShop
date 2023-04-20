import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SupplierService } from 'src/app/core/service/supplier.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteSupplierComponent implements OnInit {
  deleteForm!: FormGroup;
  constructor(
    private supplier: SupplierService,
    private route: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.deleteForm = this.formBuilder.group({
      SupplierName: [''],
      ContactName: [''],
      Address: [''],
      Phone: [''],
      Country: [''],
      City: [''],
    });

    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      this.supplier.getByid(id).subscribe((res) => {
        let mySup = res;
        this.deleteForm = this.formBuilder.group({
          SupplierName: [{ value: mySup.supplierName, disabled: true }],
          ContactName: [{ value: mySup.contactName, disabled: true }],
          Address: [{ value: mySup.address, disabled: true }],
          Phone: [{ value: mySup.phone, disabled: true }],
          Country: [{ value: mySup.country, disabled: true }],
          City: [{ value: mySup.city, disabled: true }],
        });
      });
    });
  }
  onSubmit() {
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      this.supplier.delete(id).subscribe((res) => {
        alert('Xoa thanh cong');
        this.route.navigate(['/home/supplier']);
      });
    });
  }
}
