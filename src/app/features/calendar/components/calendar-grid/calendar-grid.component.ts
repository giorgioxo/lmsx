import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lmsx-calendar-grid',
  imports: [CommonModule],
  templateUrl: './calendar-grid.component.html',
  styleUrl: './calendar-grid.component.scss',
  standalone: true,
})
export class CalendarGridComponent {
  cells = Array(36); // or Array.from({length: 36})
}
