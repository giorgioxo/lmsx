import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { LayoutsComponent } from './shared/layouts/layouts.component';
import { RegisterComponent } from './core/auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: LayoutsComponent },
  { path: 'register', component: RegisterComponent },
];
