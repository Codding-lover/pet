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

interface AuthResponse {
  user?: User;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export function useAuth() {
  const { data, isLoading } = useQuery<AuthResponse>({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  return {
    user: data?.user,
    isLoading,
    isAuthenticated: !!data?.user,
    isAdmin: data?.user?.role === 'admin',
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiRequest('POST', '/api/auth/login', credentials);
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
      await apiRequest('POST', '/api/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/admin/login';
    },
  });
}