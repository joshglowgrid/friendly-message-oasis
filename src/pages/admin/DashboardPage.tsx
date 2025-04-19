
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    posts: 0,
    pages: 0,
    publishedPosts: 0,
    publishedPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch post stats
        const { count: postsCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true });
        
        const { count: publishedPostsCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);
        
        // Fetch page stats
        const { count: pagesCount } = await supabase
          .from('pages')
          .select('*', { count: 'exact', head: true });
        
        const { count: publishedPagesCount } = await supabase
          .from('pages')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);
        
        // Fetch recent posts
        const { data: recent } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        setStats({
          posts: postsCount || 0,
          publishedPosts: publishedPostsCount || 0,
          pages: pagesCount || 0,
          publishedPages: publishedPagesCount || 0
        });
        
        setRecentPosts(recent || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Posts</CardTitle>
            <CardDescription>All blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.posts}</p>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-gray-500">
              {stats.publishedPosts} published
            </p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Pages</CardTitle>
            <CardDescription>All site pages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pages}</p>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-gray-500">
              {stats.publishedPages} published
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              {recentPosts.length > 0 ? (
                <div className="space-y-2">
                  {recentPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                    >
                      <div>
                        <Link 
                          to={`/admin/posts/${post.id}`}
                          className="font-medium hover:text-orange-600"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-md">
                  <BookOpen className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No posts yet</p>
                  <Button className="mt-4" asChild>
                    <Link to="/admin/posts/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Create your first post
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/admin/posts/new">
                <BookOpen className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/admin/pages/new">
                <FileText className="h-4 w-4 mr-2" />
                New Page
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-orange-50 rounded-md border border-orange-100">
            <h3 className="font-medium mb-2">Welcome, {user?.email}</h3>
            <p className="text-sm text-gray-600">
              This is your GlowGrid CMS admin dashboard. From here, you can manage all your website content.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
