
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Upload, 
  LogOut,
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? 'bg-orange-100 text-orange-800' : 'hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/admin" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-orange-600">GlowGrid</span>
                <span className="ml-2 text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">Admin</span>
              </Link>
            </div>
            
            <div className="flex items-center">
              {user && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">
                    {user.email}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => signOut()}
                    className="flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <nav className="space-y-1 bg-white p-3 rounded-lg shadow">
              <Link 
                to="/admin" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/admin')}`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>

              <Link 
                to="/admin/posts" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/admin/posts')}`}
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Manage Posts
              </Link>

              <Link 
                to="/admin/pages" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/admin/pages')}`}
              >
                <FileText className="mr-3 h-5 w-5" />
                Manage Pages
              </Link>
              
              <Link 
                to="/admin/media" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/admin/media')}`}
              >
                <Upload className="mr-3 h-5 w-5" />
                Media Library
              </Link>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="mb-6 border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Link to="/admin" className="hover:text-orange-600">Dashboard</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-gray-900 font-medium">{title}</span>
                  </div>
                </div>
              </div>
              
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
