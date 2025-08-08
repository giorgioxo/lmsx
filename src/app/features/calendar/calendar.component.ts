import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'lmsx-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  constructor(private calendarService: CalendarService) {
    this.calendarService.getAllEvent().subscribe({
      next: (events) => console.log('Success:', events),
      error: (error) => console.error('Error:', error),
    });
  }
}
