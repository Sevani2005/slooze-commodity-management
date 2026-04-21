"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-context';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (user.role === 'MANAGER') {
          router.push('/dashboard');
        } else {
          router.push('/products');
        }
      } else {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-800 border-t-white"></div>
        <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Initializing Command Center...</p>
      </div>
    </div>
  );
}
