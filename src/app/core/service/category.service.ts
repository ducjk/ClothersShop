import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from 'src/app/components/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  names = 'Categories';
  name = 'Category';
  constructor(private apiService: ApiService) {}
  getCategories(searchvalue: any = null): Observable<Category[]> {
    return this.apiService.getList(searchvalue, this.names, this.name);
  }

  getByid(id: number): Observable<Category> {
    return this.apiService.getByid(id, this.names);
  }
  update(data: Category[], id: number): Observable<Category[]> {
    return this.apiService.update(data, id, this.names);
  }
  add(data: Category[]): Observable<Category[]> {
    return this.apiService.add(data, this.names);
  }
  delete(id: number): Observable<any> {
    return this.apiService.delete(id, this.names);
  }
}
