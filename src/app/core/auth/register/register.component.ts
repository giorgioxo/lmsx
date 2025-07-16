import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { UserRegister } from '../../models/auth.interface';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../shared/notifications/services/notification.service';
import {
  emailFormatValidator,
  emailTakenValidator,
  georgianNameValidator,
  passwordMatchValidator,
  strongPasswordValidator,
  usernameTakenValidator,
  usernameValidator,
} from '../../../shared/validators/auth.validator';

@Component({
  selector: 'lmsx-register',
  imports: [ReactiveFormsModule, RouterModule, IonIcon, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, georgianNameValidator()]],
        lastName: ['', [Validators.required, georgianNameValidator()]],
        username: [
          '',
          [Validators.required, usernameValidator()],
          [usernameTakenValidator(this.authService)],
        ],
        email: [
          '',
          [Validators.required, emailFormatValidator()],
          [emailTakenValidator(this.authService)],
        ],
        password: ['', [Validators.required, strongPasswordValidator()]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator },
    );
  }

  register() {
    if (this.registerForm.invalid) return;

    const user: UserRegister = this.registerForm.value;

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.notification.showSuccess('თქვენ წარმატებით დარეგისტრირდით');
      },
      error: (err) => {
        this.notification.showError('არასწორი კრედენტიალები');
        console.error('რეგისტრაციის შეცდომა', err);
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
