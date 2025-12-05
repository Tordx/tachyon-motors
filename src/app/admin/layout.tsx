import { AdminAuthProvider } from '@/context/admin-auth-context';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#171717]">
        {children}
      </main>
    </AdminAuthProvider>
  );
}
