import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutsComponent } from './shared/layouts/layouts.component';

@Component({
  selector: 'lmsx-root',
  imports: [LayoutsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'lmsx';
}
