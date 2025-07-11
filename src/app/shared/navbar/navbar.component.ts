import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lmsx-navbar',
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>(); // EventEmitter, რომელიც გამოტყდება MainLayout-ში

  openSidenav() {
    this.toggleSidenav.emit(); // ამით გამოვუშვებთ toggleSidenav-ს MainLayout-ში
  }
}
