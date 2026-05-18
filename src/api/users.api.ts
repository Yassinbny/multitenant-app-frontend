import { baseApi } from "./baseApi";
import type {
  CreateUserInput,
  CreateUserResponse,
  UsersResponse,
} from "../features/users/user.types";

export const getUsers = (token: string) => {
  return baseApi<UsersResponse>("/users", {
    token,
  });
};

export const createUser = (input: CreateUserInput, token: string) => {
  return baseApi<CreateUserResponse>("/users", {
    method: "POST",
    body: input,
    token,
  });
};
export const deleteUser = (userId: string, token: string) => {
  return baseApi<void>(`/users/${userId}`, {
    method: "DELETE",
    token,
  });
};
