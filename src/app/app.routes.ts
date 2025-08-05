import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { LAYOUT_ROUTES } from './shared/layouts/layouts.route';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./shared/layouts/layouts.route').then((m) => m.LAYOUT_ROUTES),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' },
];
