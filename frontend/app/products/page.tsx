"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { Sidebar } from '../../components/sidebar';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Edit3,
  Trash2,
  MoreVertical,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      category
      quantity
      unitPrice
      status
      lastUpdated
    }
  }
`;

const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: String!) {
    removeProduct(id: $id) {
      id
    }
  }
`;

export default function ProductsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [removeProduct] = useMutation(REMOVE_PRODUCT, {
    onCompleted: () => refetch(),
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this commodity?')) {
      removeProduct({ variables: { id } });
    }
  };

  if (authLoading) return null;
  if (!user) {
    window.location.href = '/login';
    return null;
  }

  const products = (data as any)?.products || [];
  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Inventory</h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">Monitor and manage all commodity stock levels.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-white dark:focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Filter size={16} />
              </div>
              <select 
                className="appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-8 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-white dark:focus:ring-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Energy">Energy</option>
                <option value="Metals">Metals</option>
                <option value="Materials">Materials</option>
                <option value="Agricultural">Agricultural</option>
              </select>
            </div>
          </div>
        </header>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-100 bg-zinc-50 text-xs font-semibold uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">Loading inventory...</td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">No products found.</td>
                    </tr>
                  ) : (
                    filteredProducts.map((product: any) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      >
                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">{product.name}</td>
                        <td className="px-6 py-4 text-zinc-500">{product.category}</td>
                        <td className="px-6 py-4 font-mono">{product.quantity}</td>
                        <td className="px-6 py-4 font-mono">${product.unitPrice.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${product.status === 'In Stock'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                              : product.status === 'Low Stock'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                            }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-500">
                          {new Date(product.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/products/edit/${product.id}`} className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white">
                              <Edit3 size={16} />
                            </Link>
                            {user.role === 'MANAGER' && (
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
            <span className="text-xs text-zinc-500">Showing {filteredProducts.length} products</span>
            <div className="flex gap-2">
              <button disabled className="rounded border border-zinc-200 p-1 text-zinc-400 disabled:opacity-30 dark:border-zinc-800">
                <ChevronLeft size={16} />
              </button>
              <button disabled className="rounded border border-zinc-200 p-1 text-zinc-400 disabled:opacity-30 dark:border-zinc-800">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
