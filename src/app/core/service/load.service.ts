import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private loading = new BehaviorSubject<boolean>(false);
  constructor() {}

  show() {
    this.loading.next(true);
  }

  hidden() {
    this.loading.next(false);
  }

  getLoading() {
    return this.loading.asObservable();
  }
}
