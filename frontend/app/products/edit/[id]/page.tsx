"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/auth-context';
import { Sidebar } from '../../../../components/sidebar';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Package, 
  Tag, 
  Hash, 
  DollarSign,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      category
      quantity
      unitPrice
      status
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: String!, $name: String, $category: String, $quantity: Int, $unitPrice: Float, $status: String) {
    updateProduct(id: $id, name: $name, category: $category, quantity: $quantity, unitPrice: $unitPrice, status: $status) {
      id
      name
    }
  }
`;

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  
  const { data, loading: queryLoading } = useQuery(GET_PRODUCT, {
    variables: { id },
    skip: !id,
  });

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    unitPrice: 0.0,
    status: 'In Stock'
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data?.product) {
      setFormData({
        name: data.product.name,
        category: data.product.category,
        quantity: data.product.quantity,
        unitPrice: data.product.unitPrice,
        status: data.product.status,
      });
    }
  }, [data]);

  const [updateProduct, { loading: mutationLoading, error }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push('/products');
      }, 1500);
    }
  });

  if (authLoading || queryLoading) return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <Loader2 className="animate-spin text-white" size={32} />
    </div>
  );

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct({ 
      variables: { 
        id, 
        ...formData,
        quantity: parseInt(formData.quantity.toString()),
        unitPrice: parseFloat(formData.unitPrice.toString())
      } 
    });
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <Link href="/products" className="mb-4 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <ArrowLeft size={16} />
            Back to Inventory
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Edit Product</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">Modify commodity details in the global tracking system.</p>
        </header>

        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Name</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                      <Package size={18} />
                    </div>
                    <input
                      required
                      type="text"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                      <Tag size={18} />
                    </div>
                    <select
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Energy">Energy</option>
                      <option value="Metals">Metals</option>
                      <option value="Materials">Materials</option>
                      <option value="Agricultural">Agricultural</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</label>
                  <select
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Quantity</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                      <Hash size={18} />
                    </div>
                    <input
                      required
                      type="number"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Unit Price ($)</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                      <DollarSign size={18} />
                    </div>
                    <input
                      required
                      type="number"
                      step="0.01"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
                      value={formData.unitPrice}
                      onChange={(e) => setFormData({...formData, unitPrice: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              {success && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                >
                  <CheckCircle2 size={20} />
                  Product updated successfully! Redirecting...
                </motion.div>
              )}

              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-sm">
                  {error.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Link href="/products" className="rounded-lg border border-zinc-200 px-6 py-2.5 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={mutationLoading}
                  className="flex items-center gap-2 rounded-lg bg-zinc-900 px-8 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50"
                >
                  <Save size={18} />
                  {mutationLoading ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
