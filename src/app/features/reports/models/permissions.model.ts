import { UserRole } from './reports.model';

export type AppModuleName =
  | 'dashboard'
  | 'calendar'
  | 'courses'
  | 'students'
  | 'reports'
  | 'analytics';

export type RolePermissions = Record<UserRole, Record<AppModuleName, boolean>>;
