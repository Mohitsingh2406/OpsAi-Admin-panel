'use client';

import { useTransition, useState } from 'react';
import { login } from '../actions';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await login(formData);
      } catch (err: any) {
        setError(err.message || 'Login failed');
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-foreground mb-6">OpsAI Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400 border border-red-900/50">
              {error}
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-muted" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="admin@opsai.com"
              className="w-full rounded-md border border-border bg-surface-2 p-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-muted" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              defaultValue="admin"
              className="w-full rounded-md border border-border bg-surface-2 p-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full mt-4" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Sign In'}
          </Button>
          <p className="text-center text-xs text-muted-2 mt-4">
            Use admin@opsai.com / admin
          </p>
        </form>
      </div>
    </div>
  );
}
