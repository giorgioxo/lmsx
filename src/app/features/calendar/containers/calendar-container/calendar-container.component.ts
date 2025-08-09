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
import {
  CalendarEvent,
  CreateCalendarEvent,
} from '../../models/calendar.interface';
import { CommonModule } from '@angular/common';
import { CalendarGridComponent } from '../../components/calendar-grid/calendar-grid.component';
import { CalendarDialogComponent } from '../../components/calendar-dialog/calendar-dialog.component';

@Component({
  selector: 'lmsx-calendar-container',
  standalone: true,
  imports: [CommonModule, CalendarGridComponent, CalendarDialogComponent],
  templateUrl: './calendar-container.component.html',
  styleUrl: './calendar-container.component.scss',
})
export class CalendarContainerComponent implements OnInit {
  currentDate = new Date();
  currentView: 'month' | 'week' | 'day' = 'month';
  searchEvent$ = new BehaviorSubject<string>('');
  events = new BehaviorSubject<CalendarEvent[]>([]);
  filteredEvents: Observable<CalendarEvent[]>;

  showDialog = false;
  selectedEventForEdit = null;

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

  prevMonth() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    this.currentDate = new Date(year, month - 1, 1);
  }

  nextMonth() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    this.currentDate = new Date(year, month + 1, 1);
  }

  openDialog(eventData: CreateCalendarEvent | null = null) {
    this.selectedEventForEdit = eventData || {
      title: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  saveEvent(eventData: CreateCalendarEvent) {
    console.log('დატანილი ინფორმაცია:', eventData);
    // აქ შეგიძლია სერვისის მოწოდება ან სხვა ლოგიკა
    this.closeDialog();
  }
}
