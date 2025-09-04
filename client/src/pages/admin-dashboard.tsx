import AdminLayout from "@/components/admin/layout";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { FileText, MessageSquare, Image, Users } from "lucide-react";

interface DashboardStats {
  posts: number;
  testimonials: number;
  media: number;
  users: number;
}

export default function AdminDashboard() {
  const { data: postsData } = useQuery({
    queryKey: ["/api/admin/posts"],
  });

  const { data: testimonialsData } = useQuery({
    queryKey: ["/api/admin/testimonials"],
  });

  const { data: mediaData } = useQuery({
    queryKey: ["/api/admin/media"],
  });

  const stats: DashboardStats = {
    posts: postsData?.length || 0,
    testimonials: testimonialsData?.length || 0,
    media: mediaData?.length || 0,
    users: 1, // For now, just show 1 (admin)
  };

  const statCards = [
    {
      title: "Posts",
      value: stats.posts,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Media Files",
      value: stats.media,
      icon: Image,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Users",
      value: stats.users,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-dashboard-title">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome to your Dog Years Calculator admin panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6" data-testid={`stat-${stat.title.toLowerCase()}`}>
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              data-testid="button-new-post"
            >
              <FileText className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold">Create New Post</h3>
              <p className="text-sm text-gray-600">Write a new article or page</p>
            </button>
            
            <button
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              data-testid="button-new-testimonial"
            >
              <MessageSquare className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold">Add Testimonial</h3>
              <p className="text-sm text-gray-600">Add a new user testimonial</p>
            </button>
            
            <button
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              data-testid="button-upload-media"
            >
              <Image className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold">Upload Media</h3>
              <p className="text-sm text-gray-600">Upload images and files</p>
            </button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              Welcome to your admin dashboard! Start by creating your first post or managing testimonials.
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}