import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../../api/users.api";
import { useAuth } from "../../../hooks/useAuth";
import type { CreateUserFormValues } from "./createUser.schema";

export const useCreateUser = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CreateUserFormValues) =>
      createUser(values, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
