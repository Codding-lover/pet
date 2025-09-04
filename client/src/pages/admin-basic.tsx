import AdminLayout from '@/components/admin/layout';

export default function AdminBasic() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dynamic Content Management</h1>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Navigation Management</h3>
            <p className="text-sm text-gray-600 mt-2">Manage header and footer navigation</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Elements Designer</h3>
            <p className="text-sm text-gray-600 mt-2">Create custom headers, footers, and sections</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Dynamic Pages</h3>
            <p className="text-sm text-gray-600 mt-2">Build and manage dynamic content pages</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}