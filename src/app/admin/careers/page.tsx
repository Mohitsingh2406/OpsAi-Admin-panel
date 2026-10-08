import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const mockCareers = [
  { id: 1, title: 'Senior AI Engineer', department: 'Engineering', location: 'Remote', status: 'Active' },
  { id: 2, title: 'Product Manager', department: 'Product', location: 'San Francisco, CA', status: 'Active' },
  { id: 3, title: 'Marketing Specialist', department: 'Marketing', location: 'New York, NY', status: 'Closed' },
];

export default function CareersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Careers Management" />
        <Button variant="primary">Add Job Posting</Button>
      </div>

      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2 border-b border-border text-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Job Title</th>
              <th className="px-6 py-3 font-medium">Department</th>
              <th className="px-6 py-3 font-medium">Location</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockCareers.map((job) => (
              <tr key={job.id} className="hover:bg-surface-2/50 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{job.title}</td>
                <td className="px-6 py-4 text-muted">{job.department}</td>
                <td className="px-6 py-4 text-muted">{job.location}</td>
                <td className="px-6 py-4">
                  <Badge variant={job.status === 'Active' ? 'success' : 'default'}>
                    {job.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="secondary" size="sm">Edit</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
