import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import {
  passwordMatchValidator,
  strongPasswordValidator,
} from '../../../shared/validators/auth.validator';
import { error } from 'console';

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
  resetForm!: FormGroup;
  showPassword: boolean = false;

  dialogTitle: string = '';

  step: 'verifyUser' | 'verifyOtp' | 'resetPassword' = 'verifyUser';
  showRecovery: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService,
  ) {
    addIcons({ eyeOutline, boatOutline, eyeOffOutline });
  }

  ngOnInit() {
    this.resetForm = this.fb.group(
      {
        usernameOrEmail: ['', Validators.required],
        otpCode: ['', Validators.required],
        newPassword: ['', [Validators.required, strongPasswordValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator },
    );

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

    this.dialogTitle = 'ანგარიშის აღდგენა';
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
    const { usernameOrEmail } = this.resetForm.value;

    if (!usernameOrEmail) {
      this.notification.showError('შეიყვანე მომხარებელი ან ელფოსტა სწორად');
      return;
    }
    const isEmail = usernameOrEmail.includes('@');
    const check$ = isEmail
      ? this.authService.checkEmailExists(usernameOrEmail)
      : this.authService.checkUsernameExists(usernameOrEmail);

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
    const { otpCode } = this.resetForm.value;
    if (otpCode === correctOtp) {
      this.notification.showSuccess('კოდი სწორია');
      this.step = 'resetPassword';
    } else {
      this.notification.showError('კოდი არასწორია');
    }
  }

  submitNewPassword() {
    if (this.resetForm.invalid) {
      this.notification.showError('შეავსე ყველა ველი სწორად');
      return;
    }

    const { newPassword, usernameOrEmail, otpCode } = this.resetForm.value;

    this.authService
      .recoverPassword(usernameOrEmail, otpCode, newPassword)
      .subscribe({
        next: () => {
          this.notification.showSuccess('პაროლი წარმატებით შეიცვალა');
          this.step = 'verifyUser';
          this.showRecovery = false;
          this.resetForm.reset();
        },
        error: (err) => {
          const errorMessage =
            typeof err === 'string' ? err : 'შეცდომა პაროლის აღდგენაში';
          this.notification.showError(errorMessage);
        },
      });
  }
}
