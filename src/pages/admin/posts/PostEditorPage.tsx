
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
import { Save, ArrowLeft, Image as ImageIcon, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { generateSlug } from '@/utils/stringUtils';

// Form schema
const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  published: z.boolean().default(false),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function PostEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isNewPost = id === 'new';
  const [loading, setLoading] = useState(!isNewPost);
  const [saving, setSaving] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      published: false,
      meta_title: '',
      meta_description: '',
    },
  });
  
  // Fetch post data if editing
  useEffect(() => {
    const fetchPost = async () => {
      if (isNewPost) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          // Set form values - handle the meta fields safely
          form.reset({
            title: data.title || '',
            slug: data.slug || '',
            excerpt: data.excerpt || '',
            content: data.content || '',
            category: data.category || '',
            tags: Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags || ''),
            published: data.published || false,
            meta_title: data.meta_title || '',  // Safely access possibly undefined field
            meta_description: data.meta_description || '',  // Safely access possibly undefined field
          });
          
          // Set featured image
          setFeaturedImage(data.featured_image || null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast({
          title: 'Error',
          description: 'Failed to load post data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id, isNewPost, form]);
  
  // Handle title change to generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    
    // Only auto-generate slug if it's empty or a new post
    if (isNewPost || !form.getValues('slug')) {
      const slug = generateSlug(title);
      form.setValue('slug', slug);
    }
  };
  
  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadLoading(true);
    
    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `post-images/${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);
      
      setFeaturedImage(data.publicUrl);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploadLoading(false);
    }
  };
  
  // Save post
  const onSubmit = async (data: PostFormValues) => {
    setSaving(true);
    
    try {
      // Prepare tags array
      const tagsArray = data.tags
        ? data.tags.split(',').map(tag => tag.trim())
        : [];
      
      const postData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: tagsArray,
        published: data.published,
        featured_image: featuredImage,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
      };
      
      if (isNewPost) {
        // Create new post
        const { data: newPost, error } = await supabase
          .from('posts')
          .insert([postData])
          .select();
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Post created successfully',
        });
        
        // Navigate to the edit page for the new post
        if (newPost && newPost.length > 0) {
          navigate(`/admin/posts/${newPost[0].id}`);
        } else {
          navigate('/admin/posts');
        }
      } else {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Post updated successfully',
        });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save post',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <AdminLayout title="Loading Post...">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title={isNewPost ? 'Create New Post' : 'Edit Post'}>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/posts')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Posts
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
                        placeholder="Post title" 
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
                        placeholder="post-url-slug" 
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
              
              {/* Excerpt */}
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief summary of the post" 
                        className="h-20"
                        {...field} 
                      />
                    </FormControl>
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
                        placeholder="Post content..." 
                        className="min-h-[300px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* SEO Fields */}
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <h3 className="font-medium">SEO Settings</h3>
                
                <FormField
                  control={form.control}
                  name="meta_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="SEO title (leave blank to use post title)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="meta_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="SEO description (leave blank to use excerpt)" 
                          className="h-20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        Save Post
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Featured Image */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-4">Featured Image</h3>
                
                {featuredImage ? (
                  <div className="space-y-4">
                    <div className="border rounded-md overflow-hidden">
                      <img 
                        src={featuredImage} 
                        alt="Featured" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setFeaturedImage(null)}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <ImageIcon className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">No image selected</p>
                    <div className="mt-4">
                      <label className="inline-block">
                        <span className="sr-only">Choose file</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={uploadLoading}
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          className="w-full"
                          disabled={uploadLoading}
                        >
                          {uploadLoading ? (
                            <>Uploading...</>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </>
                          )}
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Category & Tags */}
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Marketing" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="tag1, tag2, tag3" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Separate tags with commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
