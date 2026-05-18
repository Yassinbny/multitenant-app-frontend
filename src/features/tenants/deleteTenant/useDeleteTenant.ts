import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTenant } from "../../../api/tenants.api";
import { useAuth } from "../../../hooks/useAuth";

export const useDeleteTenant = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) => deleteTenant(tenantId, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
    },
  });
};
