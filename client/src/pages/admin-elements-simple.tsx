import React from 'react';
import AdminLayout from '@/components/admin/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminElementsSimple() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Elements Management</h1>
          <Button data-testid="button-add-element">Add Element</Button>
        </div>
        
        <Tabs defaultValue="headers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="footers">Footers</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="headers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Main Header</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Primary site header with navigation and branding
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Preview</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="footers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Main Footer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Site footer with links and copyright information
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Preview</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sections" className="space-y-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No sections created yet</p>
              <Button className="mt-4">Create First Section</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}