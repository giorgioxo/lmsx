// src/app/auth/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    console.log('AuthInterceptor: Intercepting request to', req.url);
    console.log('AuthInterceptor: Token available:', !!token);
    console.log('AuthInterceptor: Token value:', token);

    let cloned = req;
    if (token) {
      cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      console.log('AuthInterceptor: Added Authorization header');
    } else {
      console.log('AuthInterceptor: No token available, proceeding without auth');
    }

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('AuthInterceptor: Error caught:', error.status, error.message);
        
        switch (error.status) {
          case 401:
            this.authService.logout();
            this.router.navigate(['/login']);
            break;
          case 403:
            this.router.navigate(['/unauthorized']);
            break;
          case 404:
            this.router.navigate(['/not-found']);
            break;
          case 500:
            alert('Something went wrong on the server.');
            break;
          default:
            console.warn('Unhandled error status:', error.status);
        }

        return throwError(() => error);
      }),
    );
  }
}
