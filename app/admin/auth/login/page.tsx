'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../contexts/AuthContext';
import Image from 'next/image';
import supabase from '../../../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const router = useRouter();
  const { signIn } = useAuth();

  // Test Supabase connection on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        // First try to get auth status - this should always work if Supabase is reachable
        const { data, error } = await supabase.auth.getSession();
        
        // If we get here, we can connect to Supabase
        setSupabaseStatus('connected');
      } catch (err) {
        console.error('Failed to connect to Supabase:', err);
        setSupabaseStatus('error');
      }
    };
    
    testConnection();
  }, []);

  useEffect(() => {
    // Check if the URL contains a demo parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true') {
      setShowDemo(true);
      setEmail('demo@debugshala.com');
      setPassword('DebugDemo@2025');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Demo mode - simulate successful login for demo credentials
      if (email === 'demo@debugshala.com' && password === 'DebugDemo@2025') {
        // Brief delay to simulate authentication
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show demo mode message
        setShowDemo(true);
        
        // Set a demo cookie to allow access to admin routes in middleware
        document.cookie = 'debugshala-demo-mode=true; path=/; max-age=86400'; // 24 hours
        
        // Get redirect URL from query params or default to dashboard
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirect') || '/admin/dashboard';
        
        // Wait a bit to show the demo message before redirecting
        setTimeout(() => {
          router.push(redirectTo);
        }, 1500);
        
        return;
      }
      
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message || 'Authentication failed');
        setIsLoading(false);
        return;
      }
      
      // Get redirect URL from query params or default to dashboard
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirect') || '/admin/dashboard';
      
      // Redirect to dashboard on successful login
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@debugshala.com');
    setPassword('DebugDemo@2025');
    setShowDemo(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center p-4">
      {/* Connection status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
        <div className={`w-3 h-3 rounded-full animate-pulse ${
          supabaseStatus === 'connected' ? 'bg-green-400' :
          supabaseStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400'
        }`} />
        <span className="text-white text-xs">
          {supabaseStatus === 'connected' ? 'Connected' : 
           supabaseStatus === 'error' ? 'Connection Error' : 'Checking Connection...'}
        </span>
      </div>
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  DS
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">DebugShala Admin</h1>
            <p className="text-gray-600 mt-2">Sign in to your dashboard</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {showDemo && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg mb-6 text-sm">
              You're using demo credentials. In a real environment, these would be your authorized admin credentials.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300"
                placeholder="admin@debugshala.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="#" className="text-sm text-[var(--primary)] hover:text-[var(--secondary)]">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || supabaseStatus !== 'connected'}
                className="w-full py-3 px-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-medium rounded-lg shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : supabaseStatus !== 'connected' ? (
                  'Waiting for connection...'
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have admin credentials?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleDemoLogin}
                className="w-full flex justify-center py-3 px-4 border border-[var(--primary)] text-[var(--primary)] font-medium rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
              >
                Use Demo Credentials
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-center text-sm text-gray-600">
            DebugShala Admin Dashboard
            <span className="block mt-1 text-xs"> 2025 DebugShala. All rights reserved.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
