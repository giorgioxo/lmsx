import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lmsx-login',
  standalone: true, // აუცილებელია თუ standalone კომპონენტია
  imports: [FormsModule], // მხოლოდ მოდულები ან standalone კომპონენტები აქ
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // სწორია styleUrls (მრავალრიცხოვანი)
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (users) => {
        console.log(users);
        if (users.length) {
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Invalid Credentials');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
