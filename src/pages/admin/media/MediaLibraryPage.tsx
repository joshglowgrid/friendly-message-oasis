
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { 
  Button,
  Card,
  CardContent,
} from '@/components/ui';
import { Upload, Image as ImageIcon, File as FileIcon, Trash2, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteFile, setDeleteFile] = useState<string | null>(null);
  
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .storage
        .from('uploads')
        .list();
      
      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: 'Error',
        description: 'Failed to load media files',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFiles();
  }, []);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      // Generate a unique file name
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${file.name}`;
      
      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
      
      // Refresh file list
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleDeleteFile = async () => {
    if (!deleteFile) return;
    
    try {
      const { error } = await supabase.storage
        .from('uploads')
        .remove([deleteFile]);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'File deleted successfully',
      });
      
      // Refresh file list
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete file',
        variant: 'destructive',
      });
    } finally {
      setDeleteFile(null);
    }
  };
  
  const renderFilePreview = (file: any) => {
    const fileUrl = supabase.storage.from('uploads').getPublicUrl(file.name).data.publicUrl;
    
    // Check if it's an image file
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
    
    return (
      <Card key={file.name} className="relative group">
        <CardContent className="p-0 overflow-hidden">
          {isImage ? (
            <img 
              src={fileUrl} 
              alt={file.name} 
              className="w-full h-40 object-cover object-center"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
              <FileIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          <div className="hidden group-hover:flex absolute inset-0 bg-black/50 items-center justify-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white"
              onClick={() => navigator.clipboard.writeText(fileUrl)}
            >
              Copy URL
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setDeleteFile(file.name)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-3">
            <p className="text-sm truncate" title={file.name}>
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {Math.round(file.metadata.size / 1024)} KB
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <AdminLayout title="Media Library">
      <div className="mb-6 flex justify-end">
        <label className="inline-block">
          <span className="sr-only">Upload file</span>
          <input 
            type="file" 
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <Button 
            type="button" 
            disabled={uploading}
          >
            {uploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload New File
              </>
            )}
          </Button>
        </label>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <>
          {files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map(file => renderFilePreview(file))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-md">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No media files uploaded yet</p>
              <label className="inline-block">
                <span className="sr-only">Upload file</span>
                <input 
                  type="file" 
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                <Button 
                  type="button" 
                  disabled={uploading}
                >
                  {uploading ? (
                    <>Uploading...</>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Your First File
                    </>
                  )}
                </Button>
              </label>
            </div>
          )}
        </>
      )}
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteFile} onOpenChange={(open) => !open && setDeleteFile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteFile}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
