import { useState } from "react";
import AdminLayout from "@/components/admin/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  dogName: string;
  dogAge: string;
  status: string;
  statusColor: string;
  image: string;
  quote: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminTestimonials() {
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    dogName: "",
    dogAge: "",
    status: "",
    statusColor: "text-green-600",
    image: "",
    quote: "",
    isActive: true,
    order: 0,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/admin/testimonials"],
  });

  const createTestimonial = useMutation({
    mutationFn: async (testimonialData: any) => {
      return apiRequest("/api/admin/testimonials", {
        method: "POST",
        body: JSON.stringify(testimonialData),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      resetForm();
      toast({ title: "Success", description: "Testimonial created successfully" });
    },
  });

  const updateTestimonial = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiRequest(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      resetForm();
      toast({ title: "Success", description: "Testimonial updated successfully" });
    },
  });

  const deleteTestimonial = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: "Success", description: "Testimonial deleted successfully" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTestimonial) {
      updateTestimonial.mutate({ id: editingTestimonial.id, data: formData });
    } else {
      createTestimonial.mutate(formData);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      dogName: testimonial.dogName,
      dogAge: testimonial.dogAge,
      status: testimonial.status,
      statusColor: testimonial.statusColor,
      image: testimonial.image,
      quote: testimonial.quote,
      isActive: testimonial.isActive,
      order: testimonial.order,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingTestimonial(null);
    setFormData({
      name: "",
      dogName: "",
      dogAge: "",
      status: "",
      statusColor: "text-green-600",
      image: "",
      quote: "",
      isActive: true,
      order: 0,
    });
  };

  const statusOptions = [
    { value: "Excited for Growth", color: "text-green-600" },
    { value: "Worried about Aging", color: "text-amber-600" },
    { value: "Cherished Memories", color: "text-purple-600" },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading testimonials...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="text-testimonials-title">
              Testimonials
            </h1>
            <p className="text-gray-600">Manage user testimonials and reviews</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2"
            data-testid="button-new-testimonial"
          >
            <Plus className="w-4 h-4" />
            <span>New Testimonial</span>
          </Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingTestimonial ? "Edit Testimonial" : "Create New Testimonial"}
              </h2>
              <Button variant="outline" onClick={resetForm} data-testid="button-cancel">
                Cancel
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dogName">Dog Name</Label>
                  <Input
                    id="dogName"
                    value={formData.dogName}
                    onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                    required
                    data-testid="input-dog-name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dogAge">Dog Age</Label>
                  <Input
                    id="dogAge"
                    value={formData.dogAge}
                    onChange={(e) => setFormData({ ...formData, dogAge: e.target.value })}
                    placeholder="e.g., 3 years, 6 months, Passed away"
                    required
                    data-testid="input-dog-age"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => {
                      const selectedOption = statusOptions.find(opt => opt.value === e.target.value);
                      setFormData({ 
                        ...formData, 
                        status: e.target.value,
                        statusColor: selectedOption?.color || "text-green-600"
                      });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                    data-testid="select-status"
                  >
                    <option value="">Select status</option>
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  required
                  data-testid="input-image"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Testimonial Quote</Label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  rows={4}
                  required
                  data-testid="textarea-quote"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    data-testid="switch-active"
                  />
                  <Label htmlFor="isActive">Active (visible on website)</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    min="0"
                    data-testid="input-order"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={createTestimonial.isPending || updateTestimonial.isPending} data-testid="button-save">
                  {editingTestimonial ? "Update Testimonial" : "Create Testimonial"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel-form">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Testimonials List */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">All Testimonials</h2>
            {testimonials?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No testimonials yet. Create your first testimonial!
              </div>
            ) : (
              <div className="space-y-4">
                {testimonials?.map((testimonial: Testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                    data-testid={`testimonial-${testimonial.id}`}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <span className="text-sm text-gray-500">
                          Dog: {testimonial.dogName} · {testimonial.dogAge}
                        </span>
                        <span className={`text-sm ${testimonial.statusColor}`}>
                          {testimonial.status}
                        </span>
                        {testimonial.isActive && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm">
                        "{testimonial.quote}"
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Order: {testimonial.order} · Created: {new Date(testimonial.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(testimonial)}
                        data-testid={`button-edit-${testimonial.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTestimonial.mutate(testimonial.id)}
                        className="text-red-600 hover:text-red-700"
                        data-testid={`button-delete-${testimonial.id}`}
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