import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTenant } from "../../../api/tenants.api";
import { useAuth } from "../../../hooks/useAuth";

export const useCreateTenant = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createTenant({ name }, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
    },
  });
};
