import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const mockContacts = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', subject: 'Enterprise License', date: '2026-10-06', status: 'New' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', subject: 'Integration Question', date: '2026-10-05', status: 'Responded' },
];

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Contact Submissions" />
      </div>

      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2 border-b border-border text-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Name / Email</th>
              <th className="px-6 py-3 font-medium">Subject</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-surface-2/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{contact.name}</div>
                  <div className="text-xs text-muted-2">{contact.email}</div>
                </td>
                <td className="px-6 py-4 text-muted">{contact.subject}</td>
                <td className="px-6 py-4 text-muted">{contact.date}</td>
                <td className="px-6 py-4">
                  <Badge variant={contact.status === 'New' ? 'warning' : 'default'}>
                    {contact.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="secondary" size="sm">View</Button>
                  <Button variant="danger" size="sm">Archive</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
