import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/userService/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLogined = false;
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (typeof this.userService.getUser() !== 'undefined') {
      this.isLogined = true;
    }
    if (!this.isLogined) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return this.isLogined;
  }
}
