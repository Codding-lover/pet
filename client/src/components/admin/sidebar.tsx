import { useLocation } from "wouter";
import { useLogout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Users, 
  Image, 
  Settings, 
  LogOut,
  MessageSquare,
  BarChart3
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Posts", href: "/admin/posts" },
  { icon: FileText, label: "Pages", href: "/admin/pages" },
  { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Image, label: "Media", href: "/admin/media" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function Sidebar({ className = "" }: SidebarProps) {
  const [location, setLocation] = useLocation();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div className={`bg-gray-900 text-white h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold" data-testid="text-admin-title">
          Dog Years Admin
        </h2>
        <p className="text-gray-400 text-sm">Content Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <li key={item.href}>
                <button
                  onClick={() => setLocation(item.href)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800"
          data-testid="button-logout"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
        
        <Button
          onClick={() => setLocation("/")}
          variant="ghost"
          className="w-full flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 mt-2"
          data-testid="button-view-site"
        >
          <Home className="w-5 h-5" />
          <span>View Site</span>
        </Button>
      </div>
    </div>
  );
}