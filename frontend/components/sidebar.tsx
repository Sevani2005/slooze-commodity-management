"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/auth-context';
import { useTheme } from '../context/theme-context';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  LogOut, 
  Sun, 
  Moon,
  Shield,
  User as UserIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard, 
      roles: ['MANAGER'] 
    },
    { 
      name: 'View Products', 
      href: '/products', 
      icon: Package, 
      roles: ['MANAGER', 'STORE_KEEPER'] 
    },
    { 
      name: 'Add Product', 
      href: '/products/add', 
      icon: PlusCircle, 
      roles: ['MANAGER', 'STORE_KEEPER'] 
    },
  ];

  const filteredMenu = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-20 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            <Shield size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">SLOOZE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white' 
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <UserIcon size={18} className="text-zinc-500 dark:text-zinc-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user?.name}</span>
            <span className="text-xs text-zinc-500">{user?.role}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          
          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
