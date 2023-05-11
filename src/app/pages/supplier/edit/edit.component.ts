import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SupplierService } from 'src/app/core/service/supplier.service';
import { Country } from 'src/app/components/country';
import { CountriesService } from 'src/app/core/service/countries.service';
import ValidaterForm from 'src/app/components/validaterForm';

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
    private countriesService: CountriesService
  ) {}
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      supplierName: ['', Validators.required],
      contactName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id != 0) {
        this.supplier.getById(id).subscribe((res) => {
          let mySup = res;

          this.editForm = this.formBuilder.group({
            supplierName: [mySup.supplierName, Validators.required],
            contactName: [mySup.contactName, Validators.required],
            address: [mySup.address, Validators.required],
            phone: [
              mySup.phone,
              [Validators.required, Validators.pattern('(09|03|07|08|05)+([0-9]{8})')],
            ],
            country: [mySup.country, Validators.required],
            city: [mySup.city, Validators.required],
          });
        });
      } else if (id == 0) {
        this.editForm = this.formBuilder.group({
          supplierName: ['', Validators.required],
          contactName: ['', Validators.required],
          address: ['', Validators.required],
          phone: ['', [Validators.required, Validators.pattern('(09|03|07|08|05)+([0-9]{8})')]],
          country: ['', Validators.required],
          city: ['', Validators.required],
        });
      }
    });
    this.countriesService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }
  save() {
    if (this.editForm.valid) {
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
    } else {
      ValidaterForm.validateAllFormFileds(this.editForm);
      alert('Vui lòng nhập đầy đủ thông tin');
    }
  }
}
