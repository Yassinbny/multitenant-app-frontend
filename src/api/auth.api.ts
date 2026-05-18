import { baseApi } from "./baseApi";
import type {
  LoginInput,
  LoginResponse,
  MeResponse,
} from "../features/auth/auth.types";

export const login = (input: LoginInput) => {
  return baseApi<LoginResponse>("/auth/login", {
    method: "POST",
    body: input,
  });
};

export const getMe = (token: string) => {
  return baseApi<MeResponse>("/auth/me", {
    token,
  });
};
