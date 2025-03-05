'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Site Settings', href: '/admin/settings' },
    { name: 'Placements', href: '/admin/placements' },
    { name: 'Expert Sessions', href: '/admin/expert-sessions' },
    { name: 'Workshops', href: '/admin/workshops' },
    { name: 'Behind the Scenes', href: '/admin/behind-scenes' },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-white font-bold text-lg">DebugShala Admin</span>
                </div>
              </div>
              {user && (
                <div className="flex items-center">
                  <span className="text-white mr-4">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow h-screen">
            <nav className="mt-5 px-2">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? 'bg-gray-100 text-[var(--primary)]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--primary)]'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-8 overflow-auto">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
