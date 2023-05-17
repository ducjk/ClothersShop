import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { LoadService } from './load.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  token!: string;
  omitCalls = ['auth'];
  skipInterceptor = false;

  constructor(
    private router: Router,
    private readonly tokenService: TokenService,
    private loadingService: LoadService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

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
        delay(600),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Token expired or invalid, perform your desired action here
            this.handleUnauthorizedError();
          }
          // You can handle other error codes here if needed
          return throwError(error);
        }),
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Handle successful responses here if needed
          }
          return event;
        }),
        finalize(() => {
          this.loadingService.hidden();
        })
      );
    } else {
      // Token is missing, perform your desired action here
      this.handleUnauthorizedError();
    }

    return next.handle(req);
  }

  private handleUnauthorizedError(): void {
    alert('Phiên đăng nhập đã hết hạn, vui lòng đănng nhập lại!');
    this.tokenService.removeToken();
    this.router.navigateByUrl('/login');
  }
}
