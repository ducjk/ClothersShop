import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  token!: string;
  omitCalls = ['auth'];
  skipInterceptor = false;
  constructor(private router: Router, private readonly tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.omitCalls.forEach((api) => {
      if (req.url.includes(api)) {
        this.skipInterceptor = true;
      }
    });
    this.token = this.tokenService.getToken();
    if (this.token || this.skipInterceptor) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token),
        withCredentials: true,
      });
      return next.handle(tokenizedReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status === 401) {
              this.tokenService.removeToken();
              this.router.navigateByUrl('/login');
            }
          }
          return event;
        })
      );
    } else {
      this.tokenService.removeToken();
      this.router.navigateByUrl('/login');
    }
    return next.handle(req);
  }
}
