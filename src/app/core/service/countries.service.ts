import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Country } from 'src/app/components/country';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countries: Country[] = [];

  constructor(private apiService: ApiService) {}

  getCountries(): Observable<Country[]> {
    return this.apiService.callAPI('Countries');
  }
}
