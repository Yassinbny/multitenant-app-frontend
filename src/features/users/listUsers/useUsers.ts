import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/users.api";
import { useAuth } from "../../../hooks/useAuth";

export const useUsers = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(token as string),
    enabled: Boolean(token),
  });
};
