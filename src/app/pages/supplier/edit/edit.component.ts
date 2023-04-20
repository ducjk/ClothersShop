import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SupplierService } from 'src/app/core/service/supplier.service';
import { Country } from 'src/app/components/country';
import { CountriesService } from 'src/app/core/service/countries.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditSupplierComponent implements OnInit {
  public editForm!: FormGroup;
  countries: Country[] = [];
  constructor(
    private supplier: SupplierService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private country: CountriesService
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
        this.supplier.getById(id).subscribe((res) => {
          let mySup = res;

          this.editForm = this.formBuilder.group({
            SupplierName: [mySup.supplierName],
            ContactName: [mySup.contactName],
            Address: [mySup.address],
            Phone: [mySup.phone],
            Country: [mySup.country],
            City: [mySup.city],
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
    this.country.getCountries().subscribe((res) => {
      this.countries = res;
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
