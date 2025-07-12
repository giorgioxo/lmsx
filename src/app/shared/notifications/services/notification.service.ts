import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new Subject<{
    message: string;
    type: 'success' | 'error' | 'info';
  }>();

  notifications$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    this.notificationSubject.next({ message, type: 'success' });
  }

  showError(message: string) {
    this.notificationSubject.next({ message, type: 'error' });
  }

  showInfo(message: string) {
    this.notificationSubject.next({ message, type: 'info' });
  }
}
