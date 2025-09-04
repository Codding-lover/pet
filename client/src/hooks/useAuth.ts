import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  return {
    user: user?.user as User | undefined,
    isLoading,
    isAuthenticated: !!user?.user,
    isAdmin: user?.user?.role === 'admin',
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/admin/login';
    },
  });
}