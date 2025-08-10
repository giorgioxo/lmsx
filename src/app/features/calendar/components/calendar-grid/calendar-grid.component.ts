import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../../models/calendar.interface';

@Component({
  selector: 'lmsx-calendar-grid',
  imports: [CommonModule],
  templateUrl: './calendar-grid.component.html',
  styleUrl: './calendar-grid.component.scss',
  standalone: true,
})
export class CalendarGridComponent implements OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Input() currentDate: Date = new Date();

  monthDays: number[] = [];
  dayNames: string[] = [
    'კვირა',
    'ორშაბათი',
    'სამშაბათი',
    'ოთხშაბათი',
    'ხუთშაბათი',
    'პარასკევი',
    'შაბათი',
  ];
  eventsByDay: Record<number, CalendarEvent[]> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDate'] || changes['events']) {
      this.buildMonthGrid();
    }
  }

  buildMonthGrid() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const totalCells = 7 * 6;

    this.monthDays = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      this.monthDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      this.monthDays.push(day);
    }

    while (this.monthDays.length < totalCells) {
      this.monthDays.push(null);
    }

    this.eventsByDay = {};
    for (const day of this.monthDays) {
      if (day !== null) this.eventsByDay[day] = [];
    }

    if (this.events && Array.isArray(this.events)) {
      this.events.forEach((ev) => {
        const evDate = new Date(ev.startDate);
        if (evDate.getFullYear() === year && evDate.getMonth() === month) {
          const day = evDate.getDate();
          if (this.eventsByDay[day]) {
            this.eventsByDay[day].push(ev);
          }
        }
      });
    }
  }
}
