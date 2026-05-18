import type { UserRole } from "../auth/auth.types";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
};

export type UsersResponse = {
  users: User[];
};

export type CreateUserInput = {
  email: string;
  password: string;
};

export type CreateUserResponse = {
  user: User;
};
