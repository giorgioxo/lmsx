import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from '../notifications/notification/notification.component';

@Component({
  selector: 'lmsx-layouts',
  imports: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    RouterOutlet,
    NotificationComponent,
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {}
