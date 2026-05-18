import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../../api/tenants.api";
import { useAuth } from "../../../hooks/useAuth";

export const useTenants = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["tenants"],
    queryFn: () => getTenants(token as string),
    enabled: Boolean(token),
  });
};
