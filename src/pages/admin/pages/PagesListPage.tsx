
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  MoreVertical,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
import { toast } from '@/components/ui/use-toast';

export default function PagesListPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deletePageId, setDeletePageId] = useState<string | null>(null);
  
  const fetchPages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: sortOrder === 'asc' });
      
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load pages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPages();
  }, [sortOrder]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPages();
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const togglePublishedStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('pages')
        .update({ published: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the local state
      setPages(pages.map(page => 
        page.id === id ? { ...page, published: !currentStatus } : page
      ));
      
      toast({
        title: 'Status updated',
        description: `Page is now ${!currentStatus ? 'published' : 'unpublished'}`,
      });
    } catch (error) {
      console.error('Error toggling status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update page status',
        variant: 'destructive',
      });
    }
  };
  
  const deletePage = async () => {
    if (!deletePageId) return;
    
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', deletePageId);
      
      if (error) throw error;
      
      // Update the local state
      setPages(pages.filter(page => page.id !== deletePageId));
      
      toast({
        title: 'Page deleted',
        description: 'The page has been permanently deleted',
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete page',
        variant: 'destructive',
      });
    } finally {
      setDeletePageId(null);
    }
  };
  
  return (
    <AdminLayout title="Manage Pages">
      <div className="mb-6 flex items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-64">
          <Input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-8"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
        
        <Button asChild>
          <Link to="/admin/pages/new">
            <Plus className="h-4 w-4 mr-2" />
            New Page
          </Link>
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <>
          {pages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">
                    <button 
                      onClick={toggleSortOrder}
                      className="flex items-center hover:text-orange-600"
                    >
                      Title
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">
                      <Link 
                        to={`/admin/pages/${page.id}`}
                        className="hover:text-orange-600"
                      >
                        {page.title}
                      </Link>
                    </TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded ${
                        page.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {page.published ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(page.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/pages/${page.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => togglePublishedStatus(page.id, page.published)}
                          >
                            {page.published ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Publish
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => setDeletePageId(page.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-md">
              <p className="text-gray-500">No pages found</p>
              <Button className="mt-4" asChild>
                <Link to="/admin/pages/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first page
                </Link>
              </Button>
            </div>
          )}
        </>
      )}
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deletePageId} onOpenChange={(open) => !open && setDeletePageId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page 
              and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deletePage}
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
