import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarEvent } from '../models/calendar.interface';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getAllEvent(): Observable<CalendarEvent[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CalendarEvent[]>(`${this.baseUrl}/calendar`, {
      headers,
    });
  }
}
