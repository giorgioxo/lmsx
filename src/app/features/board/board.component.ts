import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, Table, BoardState } from '../board/models/board.interface';
import { BoardTableComponent } from './table/table.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lmsx-board',
  standalone: true,
  imports: [BoardTableComponent, AsyncPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  boardState = new BehaviorSubject<BoardState>({
    tables: [
      { id: 'TODO', title: 'To do', tasks: [] },
      { id: 'PROCESS', title: 'Process', tasks: [] },
      { id: 'FINISH', title: 'Finish', tasks: [] },
    ],
  });

  board$ = this.boardState.asObservable();

  addTask(tableId: string) {
    const current = this.boardState.value;
    const newTask: Task = { id: Date.now().toString(), title: 'New Task' };

    const updated: BoardState = {
      ...current,
      tables: current.tables.map((t) =>
        t.id === tableId ? { ...t, tasks: [...t.tasks, newTask] } : t,
      ),
    };

    this.boardState.next(updated);
  }
}
