import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'lmsx-reports-grid',
  imports: [],
  templateUrl: './reports-grid.component.html',
  styleUrl: './reports-grid.component.scss',
})
export class ReportsGridComponent {
  func() {
    const obj = {};
    const arr = [1, 2, 3, 45, 5, 6, 21, 3, 123, 12, 31, 23, 12];
    let maxKey = 0;
    let maxValue = 0;
    for (let num of arr) {
      obj[num] = obj[num] + 1;

      if (obj[num] > maxKey) {
        maxKey = obj[num];
        maxValue = num;
      }
    }
    return { value: maxValue, count: maxKey };
  }
}
