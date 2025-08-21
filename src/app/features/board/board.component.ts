import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board, Task, Table } from '../board/models/board.interface';

@Component({
  selector: 'lmsx-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  board = new BehaviorSubject<Board>({
    table: [{ id: 'TODO', title: 'To Do', task: [] }],
  });

  board$ = this.board.asObservable();
}
