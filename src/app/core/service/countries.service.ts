import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Country } from 'src/app/components/country';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countries: Country[] = [];

  constructor(private apiService: ApiService) {}

  getCountries(): Country[] {
    if (this.countries.length === 0) {
      this.apiService.callAPI('/Countries').subscribe((res) => {
        this.countries = res;
      });
    }

    return this.countries;
  }
}
