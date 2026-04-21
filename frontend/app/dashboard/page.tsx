"use client";

import React from 'react';
import { useAuth } from '../../context/auth-context';
import { Sidebar } from '../../components/sidebar';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  AlertTriangle,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
    <div className="flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Icon size={24} className="text-zinc-600 dark:text-zinc-400" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}%
        </div>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
      <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'MANAGER') {
    return (
      <div className="flex h-screen items-center justify-center p-4 text-center">
        <div>
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mt-2 text-zinc-500">Only Managers can access the dashboard.</p>
          <button onClick={() => window.location.href = '/products'} className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-white dark:bg-white dark:text-zinc-900">
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Command Center</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">Overview of global commodity operations and inventory health.</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Inventory Value"
            value="$2,450,000"
            icon={DollarSign}
            trend="up"
            trendValue="12.5"
          />
          <StatCard
            title="Active Products"
            value="154"
            icon={Package}
          />
          <StatCard
            title="Market Trend"
            value="+4.2%"
            icon={TrendingUp}
            trend="up"
            trendValue="0.8"
          />
          <StatCard
            title="Low Stock Alerts"
            value="12"
            icon={AlertTriangle}
            trend="down"
            trendValue="3"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-bold">Inventory Composition</h3>
            <div className="flex h-64 flex-col items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-zinc-100 dark:border-zinc-800">
                {/* Simple CSS Overlay for Progress */}
                <div 
                  className="absolute inset-0 rounded-full border-[12px] border-zinc-900 border-t-transparent border-r-transparent dark:border-white"
                  style={{ transform: 'rotate(-45deg)' }}
                ></div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">45%</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Energy</span>
                </div>
              </div>
              <div className="mt-8 flex gap-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-white"></div> In Stock</div>
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-800"></div> Low Stock</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-bold">Recent Movements</h3>
            <div className="space-y-4">
              {[
                { action: 'Restock', product: 'Crude Oil', qty: '+500bbl', time: '2h ago' },
                { action: 'Sale', product: 'Gold Bullion', qty: '-12oz', time: '5h ago' },
                { action: 'Update', product: 'Steel Sheets', qty: 'Price Adj', time: '1d ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-zinc-100 pb-3 last:border-0 dark:border-zinc-800">
                  <div>
                    <p className="text-sm font-medium">{item.product}</p>
                    <p className="text-xs text-zinc-500">{item.action}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-mono font-bold ${item.qty.startsWith('+') ? 'text-emerald-500' : 'text-zinc-900 dark:text-white'}`}>
                      {item.qty}
                    </p>
                    <p className="text-[10px] text-zinc-400 uppercase">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
