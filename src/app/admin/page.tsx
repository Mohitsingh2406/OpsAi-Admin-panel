import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import { Briefcase, FileText, CreditCard, MessageSquare } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Dashboard" 
        description="Welcome to the OpsAI Admin Panel. This is Phase 1 of the administrative interface." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Careers" value={12} icon={Briefcase} />
        <StatCard label="Published Blogs" value={24} icon={FileText} />
        <StatCard label="Active Pricing Plans" value={3} icon={CreditCard} />
        <StatCard label="New Contact Messages" value={5} icon={MessageSquare} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-foreground font-semibold">Recent Activity</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4 text-sm text-muted">
              <li className="flex justify-between border-b border-border pb-3">
                <span>New contact message from john@example.com</span>
                <span className="text-muted-2">2 hrs ago</span>
              </li>
              <li className="flex justify-between border-b border-border pb-3">
                <span>Updated 'Senior Engineer' job posting</span>
                <span className="text-muted-2">5 hrs ago</span>
              </li>
              <li className="flex justify-between pb-1">
                <span>Published 'The Future of AI Operations' blog</span>
                <span className="text-muted-2">1 day ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
