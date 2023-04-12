import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/service/category.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteCategoryComponent {
  deleteForm!: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private route: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.deleteForm = this.formBuilder.group({
      CategoryName: [''],
      Description: [''],
    });

    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      this.categoryService.getByid(id).subscribe((res) => {
        let mySup = res;
        this.deleteForm = this.formBuilder.group({
          CategoryName: [{ value: mySup.CategoryName, disabled: true }],
          Description: [{ value: mySup.Description, disabled: true }],
        });
      });
    });
  }
  onSubmit() {
    this.router.paramMap.subscribe((params) => {
      let id: number = parseInt(params.get('id')!);
      this.categoryService.delete(id).subscribe((res) => {
        alert('Xoa thanh cong');
        this.route.navigate(['/home/category']);
      });
    });
  }
}
