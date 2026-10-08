import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const mockBlogs = [
  { id: 1, title: 'The Future of AI Operations', author: 'Jane Doe', date: '2026-10-01', status: 'Published' },
  { id: 2, title: 'Understanding Agentic Workflows', author: 'John Smith', date: '2026-10-05', status: 'Draft' },
];

export default function BlogsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Blogs Management" />
        <Button variant="primary">Create Blog Post</Button>
      </div>

      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2 border-b border-border text-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Author</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockBlogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-surface-2/50 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{blog.title}</td>
                <td className="px-6 py-4 text-muted">{blog.author}</td>
                <td className="px-6 py-4 text-muted">{blog.date}</td>
                <td className="px-6 py-4">
                  <Badge variant={blog.status === 'Published' ? 'success' : 'default'}>
                    {blog.status}
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
