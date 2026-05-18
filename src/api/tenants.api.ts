import { baseApi } from "./baseApi";
import type {
  CreateTenantAdminInput,
  CreateTenantAdminResponse,
  CreateTenantInput,
  TenantResponse,
  TenantsResponse,
} from "../features/tenants/tenant.types";

export const getTenants = (token: string) => {
  return baseApi<TenantsResponse>("/tenants", {
    token,
  });
};

export const createTenant = (input: CreateTenantInput, token: string) => {
  return baseApi<TenantResponse>("/tenants", {
    method: "POST",
    body: input,
    token,
  });
};

export const createTenantAdmin = (
  tenantId: string,
  input: CreateTenantAdminInput,
  token: string,
) => {
  return baseApi<CreateTenantAdminResponse>(`/tenants/${tenantId}/admins`, {
    method: "POST",
    body: input,
    token,
  });
};
export const deleteTenant = (tenantId: string, token: string) => {
  return baseApi<void>(`/tenants/${tenantId}`, {
    method: "DELETE",
    token,
  });
};
