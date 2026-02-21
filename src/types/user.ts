export interface User {
  name: string;
  email: string;
}

export type CreateUserDTO = Pick<User, 'name' | 'email'>;
