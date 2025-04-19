
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { 
  Button,
  Input,
  Label,
  Textarea,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { Save, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { generateSlug } from '@/utils/stringUtils';

// Form schema
const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().optional(),
  published: z.boolean().default(false),
});

type PageFormValues = z.infer<typeof pageSchema>;

export default function PageEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isNewPage = id === 'new';
  const [loading, setLoading] = useState(!isNewPage);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      published: false,
    },
  });
  
  // Fetch page data if editing
  useEffect(() => {
    const fetchPage = async () => {
      if (isNewPage) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          // Set form values
          form.reset({
            title: data.title || '',
            slug: data.slug || '',
            content: data.content || '',
            published: data.published || false,
          });
        }
      } catch (error) {
        console.error('Error fetching page:', error);
        toast({
          title: 'Error',
          description: 'Failed to load page data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPage();
  }, [id, isNewPage, form]);
  
  // Handle title change to generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    
    // Only auto-generate slug if it's empty or a new page
    if (isNewPage || !form.getValues('slug')) {
      const slug = generateSlug(title);
      form.setValue('slug', slug);
    }
  };
  
  // Save page
  const onSubmit = async (data: PageFormValues) => {
    setSaving(true);
    
    try {
      const pageData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        published: data.published,
      };
      
      if (isNewPage) {
        // Create new page
        const { data: newPage, error } = await supabase
          .from('pages')
          .insert([pageData])
          .select();
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Page created successfully',
        });
        
        // Navigate to the edit page for the new page
        if (newPage && newPage.length > 0) {
          navigate(`/admin/pages/${newPage[0].id}`);
        } else {
          navigate('/admin/pages');
        }
      } else {
        // Update existing page
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Page updated successfully',
        });
      }
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: 'Error',
        description: 'Failed to save page',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <AdminLayout title="Loading Page...">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title={isNewPage ? 'Create New Page' : 'Edit Page'}>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/pages')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pages
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Page title" 
                        {...field} 
                        onChange={handleTitleChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="page-url-slug" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      URL-friendly version of the title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Page content..." 
                        className="min-h-[400px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-6">
              {/* Publish Settings */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-4">Publish Settings</h3>
                
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0 mb-4">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Published</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col gap-2 mt-4">
                  <Button type="submit" disabled={saving} className="w-full">
                    {saving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Page
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
