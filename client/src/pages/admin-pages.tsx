import { useState } from "react";
import AdminLayout from "@/components/admin/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, FileText } from "lucide-react";

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: string;
  type: string;
  featuredImage?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPages() {
  const [showForm, setShowForm] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    status: "draft",
    type: "page",
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pages, isLoading } = useQuery({
    queryKey: ["/api/admin/posts"],
    queryFn: () => fetch("/api/admin/posts?type=page", { credentials: "include" }).then(res => res.json()),
  });

  const createPage = useMutation({
    mutationFn: async (pageData: any) => {
      return apiRequest("POST", "/api/admin/posts", { ...pageData, type: "page" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      setShowForm(false);
      resetFormData();
      toast({ title: "Success", description: "Page created successfully" });
    },
  });

  const updatePage = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiRequest("PUT", `/api/admin/posts/${id}`, { ...data, type: "page" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      setShowForm(false);
      setEditingPage(null);
      toast({ title: "Success", description: "Page updated successfully" });
    },
  });

  const deletePage = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      toast({ title: "Success", description: "Page deleted successfully" });
    },
  });

  const resetFormData = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      status: "draft",
      type: "page",
      featuredImage: "",
      metaTitle: "",
      metaDescription: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPage) {
      updatePage.mutate({ id: editingPage.id, data: formData });
    } else {
      const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      createPage.mutate({ ...formData, slug });
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      excerpt: page.excerpt || "",
      status: page.status,
      type: page.type,
      featuredImage: page.featuredImage || "",
      metaTitle: "",
      metaDescription: "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingPage(null);
    resetFormData();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading pages...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const pagesData = pages?.filter((item: Page) => item.type === 'page') || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="text-pages-title">Pages</h1>
            <p className="text-gray-600">Manage your static pages</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2"
            data-testid="button-new-page"
          >
            <Plus className="w-4 h-4" />
            <span>New Page</span>
          </Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingPage ? "Edit Page" : "Create New Page"}
              </h2>
              <Button variant="outline" onClick={resetForm} data-testid="button-cancel">
                Cancel
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    data-testid="input-slug"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                  data-testid="textarea-content"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  placeholder="Brief description..."
                  data-testid="textarea-excerpt"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger data-testid="select-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="trash">Trash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    placeholder="https://..."
                    data-testid="input-featured-image"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={createPage.isPending || updatePage.isPending} data-testid="button-save">
                  {editingPage ? "Update Page" : "Create Page"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel-form">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">All Pages</h2>
            {pagesData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No pages yet. Create your first page!
              </div>
            ) : (
              <div className="space-y-4">
                {pagesData.map((page: Page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    data-testid={`page-${page.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <h3 className="font-semibold text-lg">{page.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {page.excerpt || page.content.substring(0, 100) + "..."}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded ${
                          page.status === 'published' ? 'bg-green-100 text-green-800' :
                          page.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {page.status}
                        </span>
                        <span>{new Date(page.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(page)}
                        data-testid={`button-edit-${page.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePage.mutate(page.id)}
                        className="text-red-600 hover:text-red-700"
                        data-testid={`button-delete-${page.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}