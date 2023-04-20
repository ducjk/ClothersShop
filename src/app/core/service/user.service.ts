import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/components/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private user!: User;
  private user = new BehaviorSubject<User>({
    id: 0,
    fullName: '',
    email: '',
    gender: '',
    address: '',
    phone: '',
    birthday: '',
    photo: '',
  });
  constructor() {}

  setUser(data: User) {
    this.user.next(data);
  }

  getUser() {
    return this.user.asObservable();
  }
}
