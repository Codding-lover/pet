import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Code, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { VisualEditor } from '@/components/builder/VisualEditor';
import type { Element } from '@shared/schema';

export default function AdminElements() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'header',
    slug: '',
    isActive: true,
    order: 0
  });

  const queryClient = useQueryClient();

  const { data: elements, isLoading } = useQuery<Element[]>({
    queryKey: ['/api/admin/elements'],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/admin/elements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create element');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/elements'] });
      toast({ title: 'Element created successfully' });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: 'Error creating element', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/admin/elements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update element');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/elements'] });
      toast({ title: 'Element updated successfully' });
      setSelectedElement(null);
      setIsBuilderOpen(false);
    },
    onError: (error: any) => {
      toast({ title: 'Error updating element', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/elements/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete element');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/elements'] });
      toast({ title: 'Element deleted successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Error deleting element', description: error.message, variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'header',
      slug: '',
      isActive: true,
      order: 0
    });
    setSelectedElement(null);
  };

  const handleEdit = (element: Element) => {
    setSelectedElement(element);
    setFormData({
      name: element.name,
      type: element.type,
      slug: element.slug,
      isActive: element.isActive,
      order: element.order
    });
  };

  const handleSave = (elementData: any) => {
    if (selectedElement) {
      updateMutation.mutate({ 
        id: selectedElement.id, 
        data: { ...elementData, content: formData }
      });
    } else {
      createMutation.mutate({ 
        ...elementData, 
        content: formData
      });
    }
  };

  const openBuilder = (element?: Element) => {
    if (element) {
      setSelectedElement(element);
      setFormData({
        name: element.name,
        type: element.type,
        slug: element.slug,
        isActive: element.isActive,
        order: element.order
      });
    }
    setIsBuilderOpen(true);
  };

  const handleBuilderSave = (builderData: string) => {
    const elementData = {
      ...formData,
      content: JSON.parse(builderData)
    };

    if (selectedElement) {
      updateMutation.mutate({ 
        id: selectedElement.id, 
        data: elementData
      });
    } else {
      createMutation.mutate(elementData);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  useEffect(() => {
    if (formData.name) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.name) }));
    }
  }, [formData.name]);

  if (isLoading) {
    return <div className="p-6">Loading elements...</div>;
  }

  return (
    <div className="p-6" data-testid="admin-elements">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Website Elements</h1>
          <p className="text-muted-foreground">
            Manage your website headers, footers, and other elements
          </p>
        </div>
        <Button onClick={() => openBuilder()} data-testid="button-create-element">
          <Plus className="w-4 h-4 mr-2" />
          Create Element
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">All Elements</TabsTrigger>
          <TabsTrigger value="header" data-testid="tab-header">Headers</TabsTrigger>
          <TabsTrigger value="footer" data-testid="tab-footer">Footers</TabsTrigger>
          <TabsTrigger value="section" data-testid="tab-section">Sections</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ElementsList elements={elements} onEdit={handleEdit} onDelete={deleteMutation.mutate} onBuilder={openBuilder} />
        </TabsContent>

        <TabsContent value="header" className="space-y-4">
          <ElementsList 
            elements={elements?.filter(e => e.type === 'header')} 
            onEdit={handleEdit} 
            onDelete={deleteMutation.mutate} 
            onBuilder={openBuilder}
          />
        </TabsContent>

        <TabsContent value="footer" className="space-y-4">
          <ElementsList 
            elements={elements?.filter(e => e.type === 'footer')} 
            onEdit={handleEdit} 
            onDelete={deleteMutation.mutate} 
            onBuilder={openBuilder}
          />
        </TabsContent>

        <TabsContent value="section" className="space-y-4">
          <ElementsList 
            elements={elements?.filter(e => e.type === 'section')} 
            onEdit={handleEdit} 
            onDelete={deleteMutation.mutate} 
            onBuilder={openBuilder}
          />
        </TabsContent>
      </Tabs>

      {/* Visual Builder Dialog */}
      <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>
              {selectedElement ? 'Edit Element' : 'Create Element'}
            </DialogTitle>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <Label htmlFor="element-name">Name</Label>
                <Input
                  id="element-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Element name"
                  data-testid="input-element-name"
                />
              </div>
              
              <div>
                <Label htmlFor="element-type">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger data-testid="select-element-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                    <SelectItem value="section">Section</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="element-order">Order</Label>
                <Input
                  id="element-order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                  data-testid="input-element-order"
                />
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <VisualEditor
              title={`${selectedElement ? 'Edit' : 'Create'} ${formData.name || 'Element'}`}
              initialData={selectedElement?.content ? JSON.stringify(selectedElement.content) : undefined}
              onSave={handleBuilderSave}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ElementsListProps {
  elements?: Element[];
  onEdit: (element: Element) => void;
  onDelete: (id: number) => void;
  onBuilder: (element?: Element) => void;
}

function ElementsList({ elements, onEdit, onDelete, onBuilder }: ElementsListProps) {
  if (!elements?.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No elements found</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {elements.map((element) => (
        <Card key={element.id} className="relative" data-testid={`element-card-${element.id}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{element.name}</CardTitle>
              <div className="flex items-center space-x-1">
                <Badge variant={element.type === 'header' ? 'default' : element.type === 'footer' ? 'secondary' : 'outline'}>
                  {element.type}
                </Badge>
                {element.isActive && <Badge variant="outline" className="text-green-600">Active</Badge>}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Slug: <code className="bg-muted px-1 rounded">{element.slug}</code>
              </div>
              <div className="text-sm text-muted-foreground">
                Order: {element.order}
              </div>
              <div className="text-sm text-muted-foreground">
                Created: {new Date(element.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBuilder(element)}
                data-testid={`button-edit-element-${element.id}`}
              >
                <Edit className="w-4 h-4 mr-2" />
                Design
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" data-testid={`button-delete-element-${element.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Element</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{element.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(element.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}