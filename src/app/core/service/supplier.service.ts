import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private urlAPI='http://localhost:3000';
  constructor(private http:HttpClient) { }
  getSuppliers():Observable<any>{
    const url=`${this.urlAPI}/supplier`
    return this.http.get<any>(url);
  }
  getPost(acc :any):Observable<any>{{
    return this.http.post<any>("http://localhost:3000/Supplier",acc);
  }

}
}
