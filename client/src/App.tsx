import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminPosts from "@/pages/admin-posts";
import AdminPages from "@/pages/admin-pages";
import AdminMedia from "@/pages/admin-media";
import AdminUsers from "@/pages/admin-users";
import AdminSettings from "@/pages/admin-settings";
import AdminTestimonials from "@/pages/admin-testimonials";
import AdminBasic from "@/pages/admin-basic";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/posts" component={AdminPosts} />
      <Route path="/admin/pages" component={AdminPages} />
      <Route path="/admin/media" component={AdminMedia} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin/testimonials" component={AdminTestimonials} />
      <Route path="/admin/navigation" component={AdminBasic} />
      <Route path="/admin/elements" component={AdminBasic} />
      <Route path="/admin/pages/dynamic" component={AdminBasic} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
