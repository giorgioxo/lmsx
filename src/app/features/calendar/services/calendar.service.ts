import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarEvent } from '../models/calendar.interface';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllEvent(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(`${this.baseUrl}/calendar`);
  }
}
