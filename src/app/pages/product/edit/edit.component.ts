import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/components/category';
import { Product } from 'src/app/components/product';
import { Supplier } from 'src/app/components/supplier';
import ValidaterForm from 'src/app/components/validaterForm';
import { CategoryService } from 'src/app/core/service/category.service';
import { ProductService } from 'src/app/core/service/product.service';
import { SupplierService } from 'src/app/core/service/supplier.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditProductComponent {
  product!: Product;
  listOfAttribute = [];

  categories: Category[] = [];
  suppliers!: Supplier[];
  editForm!: FormGroup;
  maxDate!: any;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {}
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      productName: [''],
      price: [''],
      CategoryId: [''],
      SupplierId: [''],
      unit: [''],
      photo: [''],
      quantity: [''],
      size: [''],
      color: [''],
    });
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id > 0) {
        this.productService.getById(id).subscribe((res) => {
          this.product = res;
          this.editForm = this.formBuilder.group({
            productName: [this.product.productName, Validators.required],
            price: [this.product.price, Validators.required],
            CategoryId: [this.product.CategoryId, Validators.required],
            SupplierId: [this.product.SupplierId, Validators.required],
            unit: [this.product.unit, Validators.required],
            photo: [this.product.photo, Validators.required],
            quantity: [this.product.quantity, Validators.required],
            size: [this.product.size, Validators.required],
            color: [this.product.color, Validators.required],
          });
        });
      } else if (id == 0) {
        this.editForm = this.formBuilder.group({
          productName: ['', Validators.required],
          price: ['', Validators.required],
          CategoryId: ['', Validators.required],
          SupplierId: ['', Validators.required],
          unit: ['', Validators.required],
          photo: ['', Validators.required],
          quantity: ['', Validators.required],
          size: ['', Validators.required],
          color: ['', Validators.required],
        });
      }
    });
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
    this.supplierService.getSuppliers().subscribe((res) => {
      this.suppliers = res;
    });
  }
  save() {
    if (this.editForm.valid) {
      this.router.paramMap.subscribe((params) => {
        let id: number = parseInt(params.get('id')!);
        if (id == 0) {
          this.productService.add(this.editForm.value).subscribe((res) => {
            alert('Thêm thành công');
            this.route.navigate(['/home/product']);
          });
        } else if (id > 0) {
          this.productService.update(this.editForm.value, id).subscribe((res) => {
            alert('Chỉnh sửa thành công');
            this.route.navigate(['/home/product']);
          });
        }
      });
    } else {
      ValidaterForm.validateAllFormFileds(this.editForm);
      alert('Nhập còn thiếu kìa má');
    }
  }

  showDeleteMessage(id: number) {}
}
