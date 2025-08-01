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
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from '../../../shared/dialogs/dialogs.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Observable } from 'rxjs';

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
    ResetPasswordComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  showResetDialog = false;
  users$: Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService,
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
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
    this.users$ = this.authService.getAllUser();
  }
  refresh() {
    this.users$ = this.authService.getAllUser();
  }

  login() {
    if (this.loginForm.invalid) {
      this.notification.showError('გთხოვთ შეავსოთ ყველა ველი');
      return;
    }

    const { username, password, rememberMe } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        if (res && res.accessToken) {
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

  openResetPasswordDialog() {
    this.showResetDialog = !this.showResetDialog;
    console.log('2jer reseti');
  }

  closeResetPasswordDialog() {
    this.showResetDialog = !this.showResetDialog;
    console.log('wqei reset closeze');
  }
}
