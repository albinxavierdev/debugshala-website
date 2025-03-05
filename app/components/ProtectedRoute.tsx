'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip authentication check for auth pages
    if (pathname?.includes('/admin/auth')) {
      setIsAuthorized(true);
      return;
    }
    
    // Check if this is a demo session
    const isDemoUser = user?.email === 'demo@debugshala.com' || 
                       user?.user_metadata?.role === 'demo';
    
    // Check for demo cookie as backup for client-side rendering
    const isDemoCookie = document.cookie.includes('debugshala-demo-mode=true');
    
    // If not loading and no user is found (or user isn't an admin), redirect to login
    if (!isLoading) {
      if (user && (isDemoUser || isDemoCookie || user?.user_metadata?.role === 'admin')) {
        // User is authenticated and has proper permissions
        setIsAuthorized(true);
      } else {
        // User is not authenticated or doesn't have proper permissions
        router.push(`/admin/auth/login?redirect=${encodeURIComponent(pathname || '/admin/dashboard')}`);
      }
    }
  }, [user, isLoading, router, pathname]);

  // Show loading indicator while checking authentication status
  if (isLoading || (!isAuthorized && !pathname?.includes('/admin/auth'))) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  // If user is authenticated or on auth page, render children
  return <>{children}</>;
}
