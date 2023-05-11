import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/components/category';
import { Product } from 'src/app/components/product';
import { Supplier } from 'src/app/components/supplier';
import { ProductPhoto } from 'src/app/components/productphoto';
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
  ProductPhotos: ProductPhoto[] = [];
  ProductPhoto!: ProductPhoto;
  Priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  categories: Category[] = [];
  suppliers: Supplier[] = [];

  editForm!: FormGroup;
  editPhotoForm!: FormGroup;
  maxDate!: any;

  selectedDelete = false;
  idItem = 0;
  names = 'ProductPhotos';

  selectedFile: File | undefined;
  selectedPhoto: File | undefined;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private _elementRef: ElementRef
  ) {}

  getListPhoto(id: number) {
    this.productService.getProductPhotos(id).subscribe((res) => {
      this.ProductPhotos = res;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onPhotoSelected(event: any) {
    this.selectedPhoto = event.target.files[0] as File;
  }

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
            photo: [this.product.photo],
            quantity: [this.product.quantity, Validators.required],
          });
          this.getListPhoto(this.product.id);
        });
      } else if (id == 0) {
        this.editForm = this.formBuilder.group({
          productName: ['', Validators.required],
          price: ['', Validators.required],
          CategoryId: ['', Validators.required],
          SupplierId: ['', Validators.required],
          unit: ['', Validators.required],
          photo: ['./assets/img/default-img.png', Validators.required],
          quantity: ['', Validators.required],
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
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('image', this.selectedFile);

          this.productService.postImage(formData).subscribe(
            (response: any) => {
              this.editForm.value.photo = response.url;
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
            },
            (error) => {
              console.error('Error uploading image:', error);
              // Handle any error scenarios
            }
          );
        } else {
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
        }
      });
    } else {
      ValidaterForm.validateAllFormFileds(this.editForm);
      alert('Nhập còn thiếu kìa má');
    }
  }

  // Photo

  showEditForm(id: number) {
    if (id > 0) {
      this.productService.getProductPhoto(id).subscribe((res) => {
        this.ProductPhoto = res;

        const modal = this._elementRef.nativeElement.querySelector('.editModel');
        modal.showModal();

        this.editPhotoForm = this.formBuilder.group({
          description: [this.ProductPhoto.description, Validators.required],
          priority: [this.ProductPhoto.priority, Validators.required],
          color: [this.ProductPhoto.color, Validators.required],
          urlImg: [this.ProductPhoto.urlImg],
        });
      });
    } else if (id === 0) {
      this.ProductPhoto = {
        id: 0,
        description: '',
        priority: '1',
        color: '',
        urlImg: '',
        ProductId: this.product.id,
      };
      const modal = this._elementRef.nativeElement.querySelector('.editModel');
      modal.showModal();

      this.editPhotoForm = this.formBuilder.group({
        description: ['', Validators.required],
        priority: ['', Validators.required],
        color: ['', Validators.required],
        urlImg: ['./assets/img/default-img.png'],
        ProductId: [this.ProductPhoto.ProductId],
      });
    }
  }

  savePhoto() {
    if (this.editPhotoForm.valid) {
      if (this.selectedPhoto) {
        const formData = new FormData();
        formData.append('image', this.selectedPhoto);

        this.productService.postImage(formData).subscribe((res: any) => {
          this.editPhotoForm.value.urlImg = res.url;

          if (
            this.editPhotoForm.value.priority !== this.ProductPhoto.priority ||
            this.editPhotoForm.value.description !== this.ProductPhoto.description ||
            this.editPhotoForm.value.color !== this.ProductPhoto.color ||
            this.selectedPhoto
          ) {
            if (this.ProductPhoto.id !== 0) {
              this.productService
                .updatePhoto(this.editPhotoForm.value, this.ProductPhoto.id, 'ProductPhotos')
                .subscribe((res) => {
                  alert('Chỉnh sửa thành công');
                  this.getListPhoto(this.product.id);
                });
            } else if (this.ProductPhoto.id === 0) {
              this.productService
                .addPhoto(this.editPhotoForm.value, 'ProductPhotos')
                .subscribe((res) => {
                  alert('Thêm thành công');
                  this.getListPhoto(this.product.id);
                });
            }
          }
        });
      } else {
        if (
          (this.editPhotoForm.value.priority !== this.ProductPhoto.priority ||
            this.editPhotoForm.value.description !== this.ProductPhoto.description ||
            this.editPhotoForm.value.color !== this.ProductPhoto.color) &&
          this.ProductPhoto.id !== 0
        ) {
          this.productService
            .updatePhoto(this.editPhotoForm.value, this.ProductPhoto.id, 'ProductPhotos')
            .subscribe((res) => {
              alert('Chỉnh sửa thành công');
              this.getListPhoto(this.product.id);
            });
        } else if (this.ProductPhoto.id === 0) {
          this.productService
            .addPhoto(this.editPhotoForm.value, 'ProductPhotos')
            .subscribe((res) => {
              alert('Thêm thành công');
              this.getListPhoto(this.product.id);
            });
        }
      }
    }
  }

  showImg(url: string) {
    console.log('url: ', url);

    this.editPhotoForm.value.photo = url;
  }

  changeImg(_event: any) {}

  closeModal(_event: any) {
    const modal = this._elementRef.nativeElement.querySelector('.editModel');
    const modalDimensions = modal.getBoundingClientRect();

    if (
      _event.clientX < modalDimensions.left ||
      _event.clientX > modalDimensions.right ||
      _event.clientY < modalDimensions.top ||
      _event.clientY > modalDimensions.bottom
    ) {
      modal.close();
    }
  }

  closeModalWithCancel() {
    const modal = this._elementRef.nativeElement.querySelector('.editModel');
    modal.close();
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
      this.ProductPhotos = this.ProductPhotos.filter((item) => item.id !== this.idItem);
    }
    this.idItem = 0;
  }
}
