import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/components/country';
import { Customer } from 'src/app/components/customer';
import ValidaterForm from 'src/app/components/validaterForm';
import { CountriesService } from 'src/app/core/service/countries.service';
import { CustomerService } from 'src/app/core/service/customer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditCustomerComponent {
  editCustomerForm!: FormGroup;
  Customer!: Customer;
  maxDate!: any;

  countries: Country[] = [];

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.futureDateDisable();
    this.editCustomerForm = this.formBuilder.group({
      customerName: [''],
      email: [''],
      address: [''],
      phone: [''],
      country: [''],
      birthday: [''],
    });

    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id > 0) {
        this.customerService.getById(id).subscribe((res) => {
          this.Customer = res;
          this.editCustomerForm = this.formBuilder.group({
            customerName: [
              this.Customer.customerName,
              [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
            ],
            email: [this.Customer.email, [Validators.required, Validators.email]],
            address: [this.Customer.address, Validators.required],
            phone: [
              this.Customer.phone,
              [Validators.required, Validators.pattern('(09|03|07|08|05)+([0-9]{8})')],
            ],
            country: [this.Customer.country, Validators.required],
            birthday: [this.Customer.birthday, Validators.required],
          });
        });
      } else if (id == 0) {
        this.editCustomerForm = this.formBuilder.group({
          customerName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
          email: ['', [Validators.required, Validators.email]],
          address: ['', Validators.required],
          phone: ['', [Validators.required, Validators.pattern('(09|03|07|08|05)+([0-9]{8})')]],
          birthday: ['', [Validators.required]],
          country: ['', Validators.required],
        });
      }
    });

    this.countriesService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }
  save() {
    if (this.editCustomerForm.valid) {
      this.router.paramMap.subscribe((params) => {
        let id: number = parseInt(params.get('id')!);

        if (id == 0) {
          this.customerService.add(this.editCustomerForm.value).subscribe((res) => {
            alert('Thêm thành công');
            this.route.navigate(['/home/customer']);
          });
        } else if (id > 0) {
          this.customerService.update(this.editCustomerForm.value, id).subscribe((res) => {
            alert('Chỉnh sửa thành công');
            this.route.navigate(['/home/customer']);
          });
        }
      });
    } else {
      ValidaterForm.validateAllFormFileds(this.editCustomerForm);
      alert('Nhập còn thiếu kìa má');
    }
  }

  futureDateDisable() {
    var date: any = new Date();
    var toDayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();
    if (toDayDate < 10) {
      toDayDate = '0' + toDayDate;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.maxDate = year + '-' + month + '-' + toDayDate;
  }
}
