import { UserRegister } from '../../core/models/auth.interface';

export interface RegisterState {
  register: UserRegister | null;
  loading: boolean;
  error: string | null;
}
