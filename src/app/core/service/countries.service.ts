import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Country } from 'src/app/components/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private urlAPI = 'http://localhost:3000';
  auth_token = this.cookieService.get('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.auth_token,
  });
  ngOnInit() {
    let url = `${this.urlAPI}/Country`;
    this.http.get<Country[]>(url, { headers: this.headers }).subscribe((res) => {
      this.countries = res;
    });
  }

  countries: Country[] = [];
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getCountries(): Country[] {
    return this.countries;
  }
}
