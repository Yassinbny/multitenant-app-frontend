import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../../api/users.api";
import { useAuth } from "../../../hooks/useAuth";

export const useDeleteUser = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
