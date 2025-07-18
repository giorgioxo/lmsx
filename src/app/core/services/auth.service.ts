import { Injectable, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { UserRegister } from '../models/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserKey = 'currentUser';
  private baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}users?username=${username}&password=${password}`,
      )
      .pipe(
        tap((users) => {
          if (users.length) {
            localStorage.setItem('currentUser', JSON.stringify(username[0]));
          }
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  getCurrentUser() {
    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  register(user: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(`${this.baseUrl}users`, user);
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http
      .get<any[]>(`http://localhost:3000/users?username=${username}`)
      .pipe(map((users) => users.length > 0));
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<any[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(map((users) => users.length > 0));
  }

  recoverPassword(
    usernameOrEmail: string,
    enteredOtp: string,
    newPassword: string,
  ) {
    const correctOtp = '1121';
    if (enteredOtp !== correctOtp) {
      return throwError(() => `არასწორი კოდი`);
    }

    const isEmail = usernameOrEmail.includes('@');
    const queryParam = isEmail
      ? `email=${usernameOrEmail}`
      : `username=${usernameOrEmail}`;

    return this.http
      .get<UserRegister[]>(`${this.baseUrl}users?${queryParam}`)
      .pipe(
        map((users) => users[0]),
        switchMap((user) => {
          if (!user) return throwError(() => `მომხმარებელი ვერ მოიძებნა`);
          console.log('PATCH payload:', { password: newPassword });
          return this.http.patch<UserRegister>(
            `${this.baseUrl}users/${user.id}`,
            { password: newPassword },
          );
        }),
      );
  }
}
