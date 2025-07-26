export interface RegisterState {
  register: UserRegister | null;
  loading: boolean;
  error: string | null;
}

export interface UserRegister {
  info: string;
}
