import { Component, inject, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  pipe,
  startWith,
  Subject,
} from 'rxjs';
import { CalendarEvent } from '../../models/calendar.interface';
import { CommonModule } from '@angular/common';
import { CalendarGridComponent } from '../../components/calendar-grid/calendar-grid.component';

@Component({
  selector: 'lmsx-calendar-container',
  standalone: true,
  imports: [CommonModule, CalendarGridComponent],
  templateUrl: './calendar-container.component.html',
  styleUrl: './calendar-container.component.scss',
})
export class CalendarContainerComponent implements OnInit {
  currentDate = new Date();
  currentView: 'month' | 'week' | 'day' = 'month';
  searchEvent$ = new BehaviorSubject<string>('');
  events = new BehaviorSubject<CalendarEvent[]>([]);
  filteredEvents: Observable<CalendarEvent[]>;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.calendarService.getAllEvent().subscribe({
      next: (events) => {
        this.events.next(events);
        this.filterEvents();
      },
      error: (err) => {
        console.error('Error loading events', err);
      },
    });
  }

  filterEvents() {
    this.filteredEvents = combineLatest([
      this.events,
      this.searchEvent$.pipe(startWith('')),
    ]).pipe(
      map(([events, search]) =>
        events.filter((ev) =>
          ev.title.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    );
  }
}
