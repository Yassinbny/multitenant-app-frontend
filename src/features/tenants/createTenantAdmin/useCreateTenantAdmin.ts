import { useMutation } from "@tanstack/react-query";
import { createTenantAdmin } from "../../../api/tenants.api";
import { useAuth } from "../../../hooks/useAuth";
import type { CreateTenantAdminFormValues } from "./createTenantAdmin.schema";

type UseCreateTenantAdminParams = {
  tenantId: string;
};

export const useCreateTenantAdmin = ({
  tenantId,
}: UseCreateTenantAdminParams) => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (values: CreateTenantAdminFormValues) =>
      createTenantAdmin(tenantId, values, token as string),
  });
};
