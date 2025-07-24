import { Injectable, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { UserRegister } from '../models/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserKey = 'currentUser';
  private baseUrl = 'http://localhost:3000/api/auth'; // აქ Base URL დაავარებელი

  constructor(private http: HttpClient) {}

  register(user: UserRegister): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
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
          return this.http.patch<UserRegister>(
            `${this.baseUrl}users/${user.id}`,
            { password: newPassword },
          );
        }),
      );
  }

  getToken() {
    return of();
  }
}
