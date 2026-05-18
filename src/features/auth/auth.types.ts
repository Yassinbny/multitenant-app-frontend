export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
  tenantId: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type MeResponse = {
  user: {
    userId: string;
    tenantId: string;
    role: UserRole;
    iat?: number;
    exp?: number;
  };
};
