// import { Component, inject, OnInit } from '@angular/core';
// import { CalendarService } from '../../services/calendar.service';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { CalendarEvent } from '../../models/calendar.interface';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'lmsx-calendar-container',
//   imports: [CommonModule],
//   templateUrl: './calendar-container.component.html',
//   styleUrl: './calendar-container.component.scss',
// })
// export class CalendarContainerComponent implements OnInit {
//   private calendarService = inject(CalendarService);
//   private events$ = new BehaviorSubject<CalendarEvent[]>([]);
//   calendarEvent$ = this.events$.asObservable();

//   ngOnInit(): void {
//     this.calendarService.getAllEvent().subscribe((event) => {
//       this.events$.next(event);
//     });
//   }
// }
import { Component, inject, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { BehaviorSubject } from 'rxjs';
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
  private calendarService = inject(CalendarService);
  private events$ = new BehaviorSubject<CalendarEvent[]>([]);
  calendarEvent$ = this.events$.asObservable();

  ngOnInit(): void {
    this.calendarService.getAllEvent().subscribe((event) => {
      this.events$.next(event);
    });
  }
}
