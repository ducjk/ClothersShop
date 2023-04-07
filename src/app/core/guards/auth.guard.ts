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
  isLogined!: boolean;
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isLogined = !!this.userService.getUser();
    if (!this.isLogined) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return this.isLogined;
  }
}
