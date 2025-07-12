import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notifications/services/notification.service';

@Component({
  selector: 'lmsx-login',
  standalone: true,
  imports: [FormsModule],
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
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (users) => {
        console.log(users); // უბრალოდ ლოგი
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
