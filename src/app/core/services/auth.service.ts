import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

import { Observable, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserRegister } from '../models/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(user: UserRegister): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
        }),
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.baseUrl}/check-username?username=${username}`)
      .pipe(map((users) => users.length > 0));
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.baseUrl}/check-email?email=${email}`)
      .pipe(map((users) => users.length > 0));
  }

  recoverPassword(
    usernameOrEmail: string,
    enteredOtp: string,
    newPassword: string,
  ): Observable<any> {
    const correctOtp = '1121';
    if (enteredOtp !== correctOtp) {
      return throwError(() => `არასწორი კოდი`);
    }

    const isEmail = usernameOrEmail.includes('@');
    const queryParam = isEmail
      ? `email=${usernameOrEmail}`
      : `username=${usernameOrEmail}`;

    return this.http
      .get<UserRegister[]>(`${this.baseUrl}/users?${queryParam}`)
      .pipe(
        map((users) => users[0]),
        switchMap((user) => {
          if (!user) return throwError(() => `მომხმარებელი ვერ მოიძებნა`);
          return this.http.patch<UserRegister>(
            `${this.baseUrl}/users/${user._id}`,
            { password: newPassword },
          );
        }),
      );
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/users`);
  }
}
