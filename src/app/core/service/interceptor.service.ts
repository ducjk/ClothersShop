import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, filter, take, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private refreshingTokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tokenRefreshedSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private router: Router, private readonly tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token) {
      req = this.addTokenToRequest(req, token);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/auth/refresh')) {
          if (this.refreshingTokenSubject.value) {
            return this.tokenRefreshedSubject.pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((newToken) => {
                req = this.addTokenToRequest(req, newToken!);
                return next.handle(req);
              })
            );
          } else {
            this.refreshingTokenSubject.next(true);

            return this.refreshToken().pipe(
              switchMap((newToken) => {
                this.tokenRefreshedSubject.next(newToken);

                req = this.addTokenToRequest(req, newToken);
                return next.handle(req);
              }),
              catchError((refreshError: HttpErrorResponse) => {
                if (refreshError.status === 401) {
                  this.handleUnauthorizedError();
                } else {
                  console.error('Token refresh failed:', refreshError.message);
                }
                return throwError(refreshError);
              }),
              finalize(() => {
                this.refreshingTokenSubject.next(false);
              })
            );
          }
        }

        if (error.status === 400) {
          console.error('Login failed:', error.message);
        }

        return throwError(error);
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Handle successful responses here if needed
        }
        return event;
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private refreshToken(): Observable<string> {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const email = user.email;
    return this.tokenService.refreshToken(email).pipe(
      map((response: any) => {
        const newToken = response.access_token;

        this.tokenService.setToken(newToken);

        return newToken;
      })
    );
  }

  private handleUnauthorizedError(): void {
    this.tokenService.removeToken();
    this.router.navigateByUrl('/login');
  }
}
