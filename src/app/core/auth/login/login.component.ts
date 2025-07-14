import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../shared/notifications/services/notification.service';

import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, boatOutline } from 'ionicons/icons';

@Component({
  selector: 'lmsx-login',
  standalone: true,
  imports: [FormsModule, IonIcon],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService,
  ) {
    addIcons({ eyeOutline, boatOutline });
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (users) => {
        if (users.length) {
          this.notification.showSuccess('წარმატებით შეხვედი!');
          this.router.navigate(['/dashboard']);
        } else {
          this.notification.showError('არასწორი მომხმარებელი ან პაროლი');
        }
      },
      error: (err) => {
        console.error(err);
        this.notification.showError('შეცდომა ავტორიზაციაში');
      },
    });
  }
}
