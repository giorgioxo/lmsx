import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from './models/calendar.interface';

@Component({
  selector: 'lmsx-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  private events$ = new BehaviorSubject<CalendarEvent[]>([]);
  event$ = this.events$.asObservable();

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.getAllEvent().subscribe((event) => {
      this.events$.next(event);
    });
  }
}
