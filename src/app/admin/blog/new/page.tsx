import BlogForm from "@/components/BlogForm";
import PageHeader from "@/components/ui/PageHeader";

export default function NewBlogPostPage() {
  return (
    <div>
      <PageHeader title="New blog post" subtitle="Draft a new post for the blog." />
      <BlogForm />
    </div>
  );
}
