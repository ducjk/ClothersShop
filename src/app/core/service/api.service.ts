import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlAPI = environment.apiURL;

  constructor(private http: HttpClient) {}

  callAPI(url: string): Observable<any> {
    return this.http.get<any>(`${this.urlAPI}/${url}`);
  }

  callAPIgetList(url: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlAPI}/${url}`);
  }

  getList(searchvalue: any = null, names: string, name: string): Observable<any[]> {
    let url = `${this.urlAPI}/${names}`;
    if (searchvalue != null) {
      url = `${url}?${name}_like=` + searchvalue;
    }
    return this.http.get<any[]>(url);
  }

  getListWithPage(
    searchValue: any = null,
    page: number,
    limit: number,
    names: string,
    attribute: string
  ): Observable<HttpResponse<any[]>> {
    let url = `${this.urlAPI}/${names}?_page=${page}&_limit=${limit}`;
    if (searchValue != null) {
      url = `${url}&${attribute}_like=` + searchValue;
    }

    return this.http.get<any[]>(url, { observe: 'response' });
  }
  getListWithPageOrStatus(
    searchValue: any = null,
    status: any = null,
    page: number,
    limit: number,
    names: string,
    attribute: string
  ): Observable<HttpResponse<any[]>> {
    let url = `${this.urlAPI}/${names}?_page=${page}&_limit=${limit}`;
    if (searchValue != null) {
      if (status != -5) url = `${url}&${attribute}_like=${searchValue}&status=${status}`;
      else url = `${url}&${attribute}_like=${searchValue}`;
    }

    return this.http.get<any[]>(url, { observe: 'response' });
  }

  getById(id: number, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}/` + id;
    return this.http.get<any>(url);
  }
  update(data: any, id: number, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}/` + id;
    return this.http.put<any>(url, data);
  }

  updateWithoutAllField(data: any, id: number, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}/` + id;
    return this.http.patch<any>(url, data);
  }

  add(data: any, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}`;
    return this.http.post<any>(url, data);
  }
  postImage(data: any): Observable<any> {
    let url = `${this.urlAPI}/images`;
    return this.http.post<any>(url, data);
  }
  delete(id: number, names: string): Observable<any> {
    let url = `${this.urlAPI}/${names}/` + id;
    return this.http.delete<any>(url);
  }
  getExpand(searchvalue: any = null): Observable<any[]> {
    if (searchvalue != null) {
      return this.http.get<any[]>(
        `${this.urlAPI}/Products?_expand=Category&_expand=Supplier&productName_like=${searchvalue}`
      );
    }
    return this.http.get<any[]>(`${this.urlAPI}/Products?_expand=Category&_expand=Supplier`);
  }
}
