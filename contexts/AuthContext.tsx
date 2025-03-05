'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import supabase from '../lib/supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: { user: User | null; session: Session | null } | null;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: any | null;
    data: { user: User | null; session: Session | null } | null;
  }>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active sessions on mount
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
          setUser(session?.user || null);
          setIsLoading(false);
        }
      );
      
      setIsLoading(false);
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);
  
  // Authentication functions
  const signIn = async (email: string, password: string) => {
    try {
      // Demo mode - simulate successful login for demo credentials
      if (email === 'demo@debugshala.com' && password === 'DebugDemo@2025') {
        console.log('Using demo credentials');
        // Create a fake session for demo purposes
        return { 
          data: { 
            user: { 
              id: 'demo-user-id', 
              email: 'demo@debugshala.com', 
              user_metadata: { role: 'demo' } 
            }, 
            session: { 
              expires_at: new Date().getTime() + (24 * 60 * 60 * 1000) 
            } 
          }, 
          error: null 
        };
      }
      
      // Real authentication with Supabase
      const response = await supabase.auth.signInWithPassword({ email, password });
      
      // In development mode, consider all authenticated users as admins
      // REMOVE THIS IN PRODUCTION
      if (response.data?.user) {
        console.log('Development mode: Auto-granting admin access');
        
        // Add admin role to user metadata for development
        const updatedUser = {
          ...response.data.user,
          user_metadata: {
            ...response.data.user.user_metadata,
            role: 'admin'
          }
        };
        
        return {
          data: {
            user: updatedUser,
            session: response.data.session
          },
          error: null
        };
      }
      
      return response;
    } catch (error) {
      return { error, data: null };
    }
  };
  
  const signUp = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signUp({ email, password });
      return response;
    } catch (error) {
      return { error, data: null };
    }
  };
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  
  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
