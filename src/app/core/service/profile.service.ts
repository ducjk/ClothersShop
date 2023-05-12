import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from 'src/app/components/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  names = 'Users';
  constructor(private apiService: ApiService) {}

  updateData(data: User, id: number): Observable<User> {
    return this.apiService.updateWithoutAllField(data, id, this.names);
  }

  postImgae(data: FormData) {
    return this.apiService.postImage(data);
  }
}
