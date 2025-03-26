export interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  role?: Role;
}

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserForm extends Omit<User, 'id'> {
  password: string;
  password_confirmation: string;
}
