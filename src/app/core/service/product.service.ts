import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from 'src/app/components/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductPhoto } from 'src/app/components/productphoto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  names = 'Products';
  name = 'Product';

  attribute = 'productName';
  constructor(private apiService: ApiService, private http: HttpClient) {}

  getProducts(searchValue: any = null): Observable<Product[]> {
    return this.apiService.getExpand(searchValue);
  }

  getProductsWithPage(searchValue: any = null, page: number, limit: number) {
    return this.apiService.getListWithPage(searchValue, page, limit, this.names, this.attribute);
  }

  getById(id: number): Observable<Product> {
    return this.apiService.getById(id, this.names);
  }

  update(data: Product, id: number): Observable<Product> {
    return this.apiService.updateWithoutAllField(data, id, this.names);
  }
  add(data: Product): Observable<Product> {
    return this.apiService.add(data, this.names);
  }
  delete(id: number): Observable<any> {
    return this.apiService.delete(id, this.names);
  }

  postImage(data: FormData) {
    return this.apiService.postImage(data);
  }

  //Product Photo
  getProductPhotos(productId: number): Observable<ProductPhoto[]> {
    return this.apiService.callAPIgetList(`ProductPhotos?ProductId=${productId}`);
  }

  getProductPhoto(id: number): Observable<ProductPhoto> {
    return this.apiService.callAPI(`ProductPhotos/${id}`);
  }

  updatePhoto(data: ProductPhoto, id: number, names: string): Observable<ProductPhoto> {
    return this.apiService.updateWithoutAllField(data, id, names);
  }

  addPhoto(data: ProductPhoto, names: string): Observable<ProductPhoto> {
    return this.apiService.add(data, names);
  }
}
