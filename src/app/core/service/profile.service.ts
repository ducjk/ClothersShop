import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from 'src/app/components/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  names = 'users';
  constructor(private apiService: ApiService) {}

  updateData(data: User, id: number): Observable<User> {
    return this.apiService.update(data, id, this.names);
  }
}
