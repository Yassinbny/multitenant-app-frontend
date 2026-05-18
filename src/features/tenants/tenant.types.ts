export type Tenant = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TenantsResponse = {
  tenants: Tenant[];
};

export type TenantResponse = {
  tenant: Tenant;
};

export type CreateTenantInput = {
  name: string;
};

export type CreateTenantAdminInput = {
  email: string;
  password: string;
};

export type CreateTenantAdminResponse = {
  admin: {
    id: string;
    email: string;
    role: "ADMIN";
    tenantId: string;
    createdAt: string;
    updatedAt: string;
  };
};
