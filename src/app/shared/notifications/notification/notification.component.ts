import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'lmsx-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  notification: { message: string; type: string } | null = null;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe((notification) => {
      this.notification = notification;
      setTimeout(() => (this.notification = null), 3000);
    });
  }
}
