import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "../../../api/submissions.api";
import { useAuth } from "../../../hooks/useAuth";

export const useSubmissions = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(token as string),
    enabled: Boolean(token),
  });
};
