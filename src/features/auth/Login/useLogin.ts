import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../../../api/auth.api";
import { useAuth } from "../../../hooks/useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setAuth(response.token, response.user);
      navigate("/dashboard");
    },
  });
};
