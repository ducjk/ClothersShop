import { Injectable } from '@angular/core';
import { User } from 'src/app/components/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: User;
  constructor() {}

  setUser(data: User) {
    this.user = data;
  }

  getUser() {
    return this.user;
  }
}
