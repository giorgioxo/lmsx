import { UserSuccessfullyLogin } from '../../core/models/auth.interface';

export interface LoginState {
  user: UserSuccessfullyLogin | null;
  loading: boolean;
  error: string | null;
}
