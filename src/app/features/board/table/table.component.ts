import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lmsx-board-table',

  standalone: true,
  templateUrl: './table.component.html',
})
export class BoardTableComponent {
  @Input() table!: { id: string; title: string; tasks: any[] };
  @Output() addTask = new EventEmitter<void>();
}
