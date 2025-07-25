export interface UserRegister {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserSuccessfullyLogin {
  accessToken: string;
  refreshToken: string;
  user: UserLogin;
}

export interface UserLogin {
  _id: string;
  username: string;
  email: string;
}
