export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}
