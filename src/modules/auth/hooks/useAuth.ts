import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/modules/auth/api/authApi";
import type { LoginResponse } from "@/modules/auth/api/authApi";

const AUTH_KEYS = {
  all: ["auth"] as const,
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data: LoginResponse) => {
      // Store in Redux via callback in component
      // React Query doesn't manage auth state directly
      queryClient.setQueryData(AUTH_KEYS.all, { user: data.user });
    },
  });
}
