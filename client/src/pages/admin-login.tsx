import { useState } from "react";
import { useLogin, useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const { isAuthenticated, isAdmin } = useAuth();
  const login = useLogin();

  // Redirect if already logged in
  if (isAuthenticated && isAdmin) {
    setLocation("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login.mutateAsync({ username, password });
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      setLocation("/admin");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage your website</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              data-testid="input-username"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              data-testid="input-password"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold gradient-primary hover:opacity-90 transition-all"
            disabled={login.isPending}
            data-testid="button-login"
          >
            {login.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Default credentials:</p>
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      </Card>
    </div>
  );
}