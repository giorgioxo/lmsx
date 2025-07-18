import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  passwordMatchValidator,
  strongPasswordValidator,
} from '../../../shared/validators/auth.validator';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../shared/notifications/services/notification.service';
import { DialogsComponent } from '../../../shared/dialogs/dialogs.component';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
@Component({
  selector: 'lmsx-reset-password',
  imports: [DialogsComponent, ReactiveFormsModule, CommonModule, IonIcon],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  @Output() passwordResetDone = new EventEmitter<void>();

  resetForm!: FormGroup;

  showPassword: boolean = false;
  step: 'verifyUser' | 'verifyOtp' | 'resetPassword' = 'verifyUser';
  dialogTitle = 'ანგარიშის აღდგენა';

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private authService: AuthService,
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        usernameOrEmail: ['', Validators.required],
        otpCode: ['', Validators.required],
        newPassword: ['', [Validators.required, strongPasswordValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator },
    );
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

          this.resetForm.reset();
          this.passwordResetDone.emit();
        },
        error: (err) => {
          const errorMessage =
            typeof err === 'string' ? err : 'შეცდომა პაროლის აღდგენაში';
          this.notification.showError(errorMessage);
        },
      });
    this.passwordResetDone.emit();
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
