import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/components/country';
import { CategoryService } from 'src/app/core/service/category.service';
import { CountriesService } from 'src/app/core/service/countries.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditCategoryComponent {
  public editForm!: FormGroup;
  countries: Country[] = [];
  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private country: CountriesService
  ) {}
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      CategoryName: ['', Validators.required],
      Description: ['', Validators.required],
    });

    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id != 0) {
        this.categoryService.getByid(id).subscribe((res) => {
          let mySup = res;

          this.editForm = this.formBuilder.group({
            CategoryName: [mySup.CategoryName],
            Description: [mySup.Description],
          });
        });
      } else if (id == 0) {
        this.editForm = this.formBuilder.group({
          CategoryName: ['', Validators.required],
          Description: ['', Validators.required],
        });
      }
    });
  }
  save() {
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      if (id == 0) {
        this.categoryService.add(this.editForm.value).subscribe((res) => {
          alert('Thêm thành công');
          this.route.navigate(['/home/category']);
        });
      } else if (id != 0) {
        this.categoryService.update(this.editForm.value, id).subscribe((res) => {
          alert('Chỉnh sửa thành công');
          this.route.navigate(['/home/category']);
        });
      }
    });
  }
}
