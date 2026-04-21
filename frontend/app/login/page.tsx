"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: any) => {
      login(data.login.accessToken, data.login.user);
    },
    onError: (err) => {
      setError(err.message || 'Invalid credentials');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation({ variables: { email, password } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 font-sans dark:bg-zinc-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            <LogIn size={32} />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Slooze Commodities
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Enter your credentials to access the command center
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Mail size={18} />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="block w-full rounded-lg border border-zinc-300 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 placeholder-zinc-500 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:border-white dark:focus:ring-white sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" name="password" className="sr-only">Password</label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Lock size={18} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-lg border border-zinc-300 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 placeholder-zinc-500 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:border-white dark:focus:ring-white sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {loading ? 'Authenticating...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
            Manager: manager@slooze.com / password123<br />
            Keeper: keeper@slooze.com / password123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
