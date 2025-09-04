import { useState } from "react";
import AdminLayout from "@/components/admin/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Image as ImageIcon, File } from "lucide-react";

interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  uploadedBy: string;
  createdAt: string;
}

export default function AdminMedia() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: mediaFiles, isLoading } = useQuery({
    queryKey: ["/api/admin/media"],
  });

  const uploadMedia = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/media"] });
      setShowUploadForm(false);
      setSelectedFile(null);
      setAltText("");
      toast({ title: "Success", description: "File uploaded successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Upload failed", 
        description: error.message || "Failed to upload file",
        variant: "destructive"
      });
    },
  });

  const deleteMedia = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/media/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/media"] });
      toast({ title: "Success", description: "File deleted successfully" });
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("alt", altText);

    uploadMedia.mutate(formData);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImage = (mimeType: string): boolean => {
    return mimeType.startsWith("image/");
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading media files...</p>
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
            <h1 className="text-3xl font-bold text-gray-900" data-testid="text-media-title">Media Library</h1>
            <p className="text-gray-600">Manage your uploaded files and images</p>
          </div>
          <Button
            onClick={() => setShowUploadForm(true)}
            className="flex items-center space-x-2"
            data-testid="button-upload-media"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Media</span>
          </Button>
        </div>

        {showUploadForm && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Upload New File</h2>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowUploadForm(false);
                  setSelectedFile(null);
                  setAltText("");
                }} 
                data-testid="button-cancel-upload"
              >
                Cancel
              </Button>
            </div>

            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">Choose File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*"
                  required
                  data-testid="input-file"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600">
                    Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text (for images)</Label>
                <Input
                  id="alt"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Descriptive text for accessibility"
                  data-testid="input-alt-text"
                />
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="submit" 
                  disabled={!selectedFile || uploadMedia.isPending} 
                  data-testid="button-upload"
                >
                  {uploadMedia.isPending ? "Uploading..." : "Upload File"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowUploadForm(false);
                    setSelectedFile(null);
                    setAltText("");
                  }}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Media Files</h2>
            {!mediaFiles || mediaFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No media files yet. Upload your first file!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mediaFiles.map((file: MediaFile) => (
                  <div
                    key={file.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    data-testid={`media-${file.id}`}
                  >
                    <div className="aspect-square mb-3 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {isImage(file.mimeType) ? (
                        <img
                          src={file.url}
                          alt={file.alt || file.originalName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <File className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm truncate" title={file.originalName}>
                        {file.originalName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {file.mimeType}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(file.createdAt).toLocaleDateString()}
                      </p>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(file.url)}
                          className="flex-1 text-xs"
                          data-testid={`button-copy-${file.id}`}
                        >
                          Copy URL
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMedia.mutate(file.id)}
                          className="text-red-600 hover:text-red-700"
                          data-testid={`button-delete-${file.id}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
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