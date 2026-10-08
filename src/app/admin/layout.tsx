import type { ReactNode } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { logout } from './actions';

const navItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Careers', href: '/admin/careers' },
  { name: 'Blogs', href: '/admin/blogs' },
  { name: 'Pricing', href: '/admin/pricing' },
  { name: 'Contact', href: '/admin/contact' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="text-xl font-bold text-foreground flex items-center">
            OpsAI <span className="text-accent-2 ml-1">_</span>
          </Link>
          <div className="mt-2 text-xs text-muted-2">
            Role: Super Admin
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-accent-2 hover:translate-x-1 transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <form action={logout}>
            <Button type="submit" variant="secondary" className="w-full">
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}

