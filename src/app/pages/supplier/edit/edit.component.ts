import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/components/supplier';
import { SupplierService } from 'src/app/core/service/supplier.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public editForm!: FormGroup;
  countrys: any;
  constructor(
    private supplier: SupplierService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      SupplierName: ['', Validators.required],
      ContactName: ['', Validators.required],
      Address: ['', Validators.required],
      Phone: ['', Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],
    });
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id != 0) {
        this.supplier.getByid(id).subscribe((res) => {
          let mySup = res;

          this.editForm = this.formBuilder.group({
            SupplierName: [mySup.SupplierName],
            ContactName: [mySup.ContactName],
            Address: [mySup.Address],
            Phone: [mySup.Phone],
            Country: [mySup.Country],
            City: [mySup.City],
          });
        });
      } else if (id == 0) {
        this.editForm = this.formBuilder.group({
          SupplierName: ['', Validators.required],
          ContactName: ['', Validators.required],
          Address: ['', Validators.required],
          Phone: ['', Validators.required],
          Country: ['', Validators.required],
          City: ['', Validators.required],
        });
      }
    });
    this.supplier.getcountry().subscribe((res: any) => {
      this.countrys = res;
      console.log(res);
    });
  }
  save() {
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id == 0) {
        this.supplier.add(this.editForm.value).subscribe((res) => {
          alert('Thêm thành công');
          this.route.navigate(['/home/supplier']);
        });
      } else if (id != 0) {
        this.supplier.update(this.editForm.value, id).subscribe((res) => {
          alert('Chỉnh sửa thành công');
          this.route.navigate(['/home/supplier']);
        });
      }
    });
  }
}
