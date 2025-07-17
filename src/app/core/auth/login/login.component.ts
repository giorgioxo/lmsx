import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../shared/notifications/services/notification.service';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, boatOutline, eyeOffOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from '../../../shared/dialogs/dialogs.component';

@Component({
  selector: 'lmsx-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    IonIcon,
    DialogsComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  step: 'verifyUser' | 'verifyOtp' | 'resetPassword' = 'verifyUser';
  showRecovery: boolean = false;
  usernameOrEmail = '';
  otpCode = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService,
  ) {
    addIcons({ eyeOutline, boatOutline, eyeOffOutline });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false,
    });

    if (typeof window !== 'undefined' && localStorage) {
      const savedUsername = localStorage.getItem('savedUsername');
      const savedPassword = localStorage.getItem('savedPassword');
      if (savedUsername && savedPassword) {
        this.loginForm.patchValue({
          username: savedUsername,
          password: savedPassword,
          rememberMe: true,
        });
      }
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.notification.showError('გთხოვთ შეავსოთ ყველა ველი');
      return;
    }

    const { username, password, rememberMe } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (users) => {
        if (users.length) {
          this.notification.showSuccess('წარმატებით შეხვედი!');
          this.router.navigate(['/dashboard']);

          if (rememberMe) {
            localStorage.setItem('savedUsername', username);
            localStorage.setItem('savedPassword', password);
          } else {
            localStorage.removeItem('savedUsername');
            localStorage.removeItem('savedPassword');
          }
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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  checkUser() {
    if (!this.usernameOrEmail) {
      this.notification.showError('შეიყვანე მომხარებელი ან ელფოსტა სწორად');
      return;
    }
    const isEmail = this.usernameOrEmail.includes('@');
    const check$ = isEmail
      ? this.authService.checkEmailExists(this.usernameOrEmail)
      : this.authService.checkUsernameExists(this.usernameOrEmail);

    check$.subscribe((exists) => {
      if (exists) {
        this.notification.showSuccess('კოდი გაიგზავნა ელფოსტაზე');
        // TODO აქ უნდა გავწერო otp call ფლოუ შემდეგში... რამე ბიბლიოთეკის გამოყენებით
        this.step = 'verifyOtp';
      } else {
        this.notification.showError('მომხარებელი არ მოიძებნა');
      }
    });
  }

  verifyOtp() {
    const correctOtp = '1121';
    if (this.otpCode === correctOtp) {
      this.notification.showSuccess('კოდი სწორია');
      this.step = 'resetPassword';
    } else {
      this.notification.showError('კოდი არასწორია');
    }
  }

  submitNewPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.notification.showError('შეავსე ყველა ველი');
      return;
    }
    if (!this.newPassword !== !this.confirmPassword) {
      this.notification.showError('პაროლი არ ემთხვევა');
      return;
    }

    this.notification.showSuccess('პაროლი წარმატებით შეიცვალა');
    this.step = 'verifyUser';
    this.showRecovery = false;

    this.loginForm.patchValue({
      username: this.usernameOrEmail,
      password: '',
    });
  }
}
